import { Profile } from '@/components/ui/Profile';
import { SkipProfileBtn } from '@/components/ui/SkipProfileBtn';
import { useGetProfileQuery } from '@/hooks/useGetProfileQuery';
import { StyleSheet, View, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export default function DiscoverScreen() {
  const { data: profile } = useGetProfileQuery('female');
  // console.log('data :', data);

  return (
    <ScrollView style={styles.container}>
      <SkipProfileBtn />
      <Profile />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 16,
    // alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: 'white',
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
