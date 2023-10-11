import EditScreenInfo from '@/components/ui/EditScreenInfo';
import { StyleSheet, View, Text } from 'react-native';

export default function LikesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Вподобання</Text>
      <View style={styles.separator} />
      <EditScreenInfo path='app/(tabs)/two.tsx' />
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
