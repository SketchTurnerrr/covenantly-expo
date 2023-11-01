import React from 'react';
import { Alert, Text, View } from 'react-native';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import tw from '@/lib/tailwind';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Alert as CustomAlert } from '@/components/ui/Alert';
import { Error } from '@/types/error';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { supabase } from '@/supabase';
import * as QueryParams from 'expo-auth-session/build/QueryParams';
import { makeRedirectUri } from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';

const redirectTo = makeRedirectUri();
console.log('redirectTo :', redirectTo);

const FormSchema = z.object({
  email: z.string().email('Please enter a valid email address.'),
  password: z
    .string()
    .min(8, 'Please enter at least 8 characters.')
    .max(64, 'Please enter fewer than 64 characters.'),
});

GoogleSignin.configure({
  webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
  iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
});

export default function Login() {
  const [loading, setLoading] = React.useState(false);

  const createSessionFromUrl = async (url: string) => {
    const { params, errorCode } = QueryParams.getQueryParams(url);

    if (errorCode) throw new Error(errorCode);
    const { access_token, refresh_token } = params;

    if (!access_token) return;

    const { data, error } = await supabase.auth.setSession({
      access_token,
      refresh_token,
    });
    if (error) throw error;

    return data.session;
  };

  const performOAuth = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo,
        skipBrowserRedirect: true,
      },
    });
    if (error) throw error;

    const res = await WebBrowser.openAuthSessionAsync(
      data?.url ?? '',
      redirectTo
    );

    console.log('res :', res);
    if (res.type === 'success') {
      const { url } = res;
      // console.log('success  url  --------------------:', url);
      await createSessionFromUrl(url);
    }
  };

  const router = useRouter();
  const alertRef = React.useRef<any>(null);

  // const signInWithGoogle = async () => {
  //   setLoading(true);
  //   try {
  //     await GoogleSignin.hasPlayServices();
  //     const userInfo = await GoogleSignin.signIn();
  //     console.log('userInfo :', userInfo);
  //     if (userInfo.idToken) {
  //       console.log('fired :');
  //       const { data, error } = await supabase.auth.signInWithIdToken({
  //         provider: 'google',
  //         token: userInfo.idToken,
  //       });
  //       console.log('data :', data);
  //       console.log('error :', error);
  //     } else {
  //       throw new Error('no idToken');
  //     }
  //   } catch (error: any) {
  //     if (error.code === statusCodes.SIGN_IN_CANCELLED) {
  //       // user cancelled the login flow
  //     } else if (error.code === statusCodes.IN_PROGRESS) {
  //       // operation (e.g. sign in) is in progress already
  //     } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
  //       // play services not available or outdated
  //     } else {
  //       // some other error happened
  //     }
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const sendMagicLink = async () => {
    const { error } = await supabase.auth.signInWithOtp({
      email: 'narekdevua@gmail.com',
      options: {
        emailRedirectTo: redirectTo,
      },
    });

    if (error) throw error;
    console.log('error :', error);
    // Email sent.
  };

  const {
    control,
    handleSubmit,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    //  const sendMagicLink = async () => {

    console.log('fired :');
    const { error } = await supabase.auth.signInWithOtp({
      email: data.email,
      options: {
        emailRedirectTo: redirectTo,
      },
    });

    if (error) throw error;
    // Email sent.
    Alert.alert('email sent');
  }

  const url = Linking.useURL();
  // console.log('url :', url);
  if (url) createSessionFromUrl(url);

  return (
    <SafeAreaView
      style={tw`items-center flex-1 p-4 bg-background dark:bg-dark-background`}
    >
      <CustomAlert ref={alertRef} />
      <Text
        style={tw`self-start mb-5 h1 text-foreground dark:text-dark-foreground`}
      >
        Login
      </Text>
      <View style={tw`w-full gap-y-4`}>
        <Controller
          control={control}
          name='email'
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label='Email'
              placeholder='Email'
              value={value}
              onChangeText={onChange}
              onBlur={() => {
                trigger('email');
                onBlur();
              }}
              errors={errors.email?.message}
              autoCapitalize='none'
              autoComplete='email'
              autoCorrect={false}
              keyboardType='email-address'
            />
          )}
        />
      </View>
      <View style={tw`w-full gap-y-4 absolute bottom-[50px]`}>
        <Button
          label='Увійти'
          onPress={sendMagicLink}
          isLoading={isSubmitting}
        />
        <View style={tw`py-1`}>
          <Text style={tw`text-center muted`}>або</Text>
        </View>
        {/* <Button
          label='Продовжити з Google'
          onPress={signInWithGoogle}
          isLoading={isSubmitting}
        /> */}

        <Button
          label='Продовжити з Google'
          onPress={performOAuth}
          isLoading={isSubmitting}
        />

        <Text
          style={tw`text-center muted`}
          onPress={() => {
            router.back();
          }}
        >
          Don't have an account?
        </Text>
      </View>
    </SafeAreaView>
  );
}
