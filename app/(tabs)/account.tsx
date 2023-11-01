import { Button } from '@/components/ui/Button';
import EditScreenInfo from '@/components/ui/EditScreenInfo';
import { supabase } from '@/lib/supabase';
import { Session } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';

export default function AccountScreen() {
  // const { signOut } = useSupabase();
  const [user, setUser] = useState<ProfileType | null>(null);
  const [loading, setLoading] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  async function signOut() {
    await supabase.auth.signOut();
  }
  // console.log('user :', user);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      console.log('error :', error);
      if (session) {
        console.log('session :', session);
        setSession(session);
      } else {
        console.log('no user');
      }
    });
  }, []);

  useEffect(() => {
    async function getProfile() {
      try {
        setLoading(true);
        if (!session?.user) throw new Error('No user on the session!');

        let { data, error, status } = await supabase
          .from('profiles')
          .select(`*`)
          .eq('id', session?.user.id)
          .single();
        if (error && status !== 406) {
          throw error;
        }

        if (data) {
          console.log('data :', data);
          setUser(data);
        }
      } catch (error) {
        if (error instanceof Error) {
          Alert.alert(error.message);
        }
      } finally {
        setLoading(false);
      }
    }

    getProfile();
  }, [session]);

  console.log(' user: from profile', user);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Профіль</Text>
      <Text style={styles.title}>{user?.first_name}</Text>
      <View style={styles.separator} />
      <EditScreenInfo path='app/(tabs)/two.tsx' />
      <Button label='Вийти' onPress={signOut} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
