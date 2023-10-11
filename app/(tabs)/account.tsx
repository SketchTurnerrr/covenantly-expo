import { Button } from '@/components/ui/Button';
import EditScreenInfo from '@/components/ui/EditScreenInfo';
import { StyleSheet, View, Text } from 'react-native';

export default function AccountScreen() {
  // const { signOut } = useSupabase();
  // console.log('user :', user);
  //     useEffect(() => {

  //   async function getProfile() {
  //     try {
  //       setLoading(true)
  //       if (!session?.user) throw new Error('No user on the session!')

  //       let { data, error, status } = await supabase
  //         .from('profiles')
  //         .select(`username, website, avatar_url`)
  //         .eq('id', session?.user.id)
  //         .single()
  //       if (error && status !== 406) {
  //         throw error
  //       }

  //       if (data) {
  //         setUsername(data.username)
  //         setWebsite(data.website)
  //         setAvatarUrl(data.avatar_url)
  //       }
  //     } catch (error) {
  //       if (error instanceof Error) {
  //         Alert.alert(error.message)
  //       }
  //     } finally {
  //       setLoading(false)
  //     }
  //   }
  // }, [session])
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Профіль</Text>
      <View style={styles.separator} />
      <EditScreenInfo path='app/(tabs)/two.tsx' />
      {/* <Button label='Вийти' onPress={signOut} /> */}
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
