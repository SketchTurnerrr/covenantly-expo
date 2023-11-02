import { Button } from '@/components/ui/Button';
import ExpoImage from '@/components/ui/AvatarImage';
import { Separator } from '@/components/ui/Separator';
import { useGetCurrentUserQuery } from '@/hooks/useGetCurrentUserQuery';
import { useGetSession } from '@/hooks/useGetSessionQuery';
import { supabase } from '@/supabase';
import { useEffect } from 'react';
import {
  Edit,
  Settings2,
  SettingsIcon,
  Sun,
  RefreshCcw,
} from 'lucide-react-native';
import ContentLoader, { Circle, Rect } from 'react-content-loader/native';
import { StyleSheet, View, Text, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import tw from 'twrnc';
import { useStore } from '@/store/discoverProfileStore';

export default function AccountScreen() {
  async function signOut() {
    await supabase.auth.signOut();
  }
  // console.log('user :', user);
  // const { data } = useGetSession();
  const { setCurrentUser } = useStore();
  const { data: profile, isLoading, isSuccess } = useGetCurrentUserQuery();
  console.log('isSuccess :', isSuccess);

  // console.log('useeffect :', profile);
  useEffect(() => {
    if (isSuccess) {
      setCurrentUser(profile);
    }
  }, []);

  if (!profile) {
    return <View style={{ flex: 1 }} />;
  }

  return (
    <View style={styles.container}>
      <View style={{ width: 150, height: 150, marginBottom: 10 }}>
        {isLoading ? (
          <ContentLoader
            width={150}
            height={150}
            backgroundColor='#cfcfcf'
            foregroundColor='#ecebeb'
          >
            <Circle cx='75' cy='75' r='75' />
          </ContentLoader>
        ) : (
          <ExpoImage src={profile.photos?.[0].src} />
        )}
      </View>
      {/* <Text style={styles.title}>Профіль</Text> */}
      {isLoading ? (
        <ContentLoader
          style={{ marginVertical: 10 }}
          width={120}
          height={20}
          viewBox='0 0 120 25'
          backgroundColor='#cfcfcf'
          foregroundColor='#ecebeb'
        >
          <Rect x='0' y='0' rx='8' ry='8' width='120' height='20' />
        </ContentLoader>
      ) : (
        // <View />
        <Text style={styles.title}>{profile?.first_name}</Text>
      )}

      <View style={styles.separator} />
      <Separator />
      {/* <EditScreenInfo path='app/(tabs)/two.tsx' /> */}
      <View style={tw`w-full`}>
        <TouchableOpacity style={tw`flex flex-row justify-between p-4`}>
          <Text style={tw`text-base `}>Редагувати профіль</Text>
          <Edit color='black' size={28} />
        </TouchableOpacity>
      </View>
      <Separator />
      <View style={tw`w-full`}>
        <TouchableOpacity style={tw`flex flex-row justify-between p-4`}>
          <Text style={tw`text-base `}>Уподобання</Text>
          <Settings2 color='black' size={28} />
        </TouchableOpacity>
      </View>
      <Separator />
      <View style={tw`w-full`}>
        <TouchableOpacity style={tw`flex flex-row justify-between p-4`}>
          <Text style={tw`text-base `}>Акаунт</Text>
          <SettingsIcon color='black' size={28} />
        </TouchableOpacity>
      </View>
      <Separator />
      <View style={tw`w-full`}>
        <TouchableOpacity style={tw`flex flex-row justify-between p-4`}>
          <Text style={tw`text-base `}>Підписка</Text>
          <RefreshCcw color='black' size={28} />
        </TouchableOpacity>
      </View>
      <Separator />
      <View style={tw`w-full`}>
        <TouchableOpacity style={tw`flex flex-row justify-between p-4`}>
          <Text style={tw`text-base `}>Тема</Text>
          <Sun color='black' size={28} />
        </TouchableOpacity>
      </View>
      <Button label='Вийти' onPress={signOut} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: 'white',
  },
  title: {
    fontFamily: 'Noto',
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
