import React from 'react';
import { Text, View } from 'react-native';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import tw from '@/lib/tailwind';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Alert } from '@/components/ui/Alert';
import { Error } from '@/types/error';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { supabase } from '@/lib/supabase';

const FormSchema = z.object({
  email: z.string().email('Please enter a valid email address.'),
  password: z
    .string()
    .min(8, 'Please enter at least 8 characters.')
    .max(64, 'Please enter fewer than 64 characters.'),
});

GoogleSignin.configure({
  webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
});

export default function Login() {
  const [loading, setLoading] = React.useState(false);

  const router = useRouter();
  const alertRef = React.useRef<any>(null);

  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      if (userInfo.idToken) {
        const { data, error } = await supabase.auth.signInWithIdToken({
          provider: 'google',
          token: userInfo.idToken,
        });
        console.log('error :', error);
      } else {
        throw new Error('no idToken');
      }
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    } finally {
      setLoading(false);
    }
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
    // try {
    //   await signInWithPassword(data.email, data.password);
    // } catch (error: Error | any) {
    //   alertRef.current?.showAlert({
    //     variant: 'destructive',
    //     title: 'Error',
    //     message: error.message,
    //   });
    // }
  }

  return (
    <SafeAreaView
      style={tw`items-center flex-1 p-4 bg-background dark:bg-dark-background`}
    >
      <Alert ref={alertRef} />
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
          onPress={handleSubmit(onSubmit)}
          isLoading={isSubmitting}
        />
        <View style={tw`py-1`}>
          <Text style={tw`text-center muted`}>або</Text>
        </View>
        <Button
          label='Продовжити з Google'
          onPress={signInWithGoogle}
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
