import { Slot, SplashScreen, Stack, router, useRouter } from 'expo-router';
import { useDeviceContext } from 'twrnc';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import tw from '@/lib/tailwind';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  useFonts,
  NotoSans_400Regular,
  NotoSans_600SemiBold,
  NotoSans_700Bold,
} from '@expo-google-fonts/noto-sans';

import { useEffect, useState } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

SplashScreen.preventAutoHideAsync();

export default function Root() {
  useDeviceContext(tw);
  let [fontsLoaded, fontError] = useFonts({
    NotoSans_400Regular,
    NotoSans_600SemiBold,
    NotoSans_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return <RootLayout />;
}

function RootLayout() {
  const colorScheme = useColorScheme();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      console.log('error :', error);
      if (session) {
        console.log('session :', session);
        router.replace('/(tabs)/');
      } else {
        console.log('no user');
      }
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        router.replace('/(tabs)/');
      } else {
        console.log('session :', session);
        console.log('no user');
        router.replace('/(auth)/login');
      }
    });
  }, []);

  return (
    <GestureHandlerRootView style={tw`flex-1`}>
      <SafeAreaProvider>
        <ThemeProvider
          value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
        >
          <Stack>
            <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
            <Stack.Screen
              name='modal'
              options={{ presentation: 'transparentModal' }}
            />
          </Stack>
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
