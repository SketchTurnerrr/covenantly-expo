import { Text, View } from 'react-native';

import tw from '@/lib/tailwind';
import { useSupabase } from '@/context/useSupabase';

export default function Index() {
  const { signOut, isLoggedIn } = useSupabase();
  //   console.log('isLoggedIn :', isLoggedIn);

  return (
    <View
      style={tw`items-center justify-center flex-1 bg-background dark:bg-dark-background`}
    >
      <Text
        style={tw`h1 text-foreground dark:text-dark-foreground`}
        onPress={() => signOut()}
      >
        Sign Out
      </Text>
      <Text>{isLoggedIn.toString()}</Text>
    </View>
  );
}
