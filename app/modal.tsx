import EditScreenInfo from '@/components/ui/EditScreenInfo';
import { Text, View } from '@/components/ui/Themed';
import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';
import {
  useFonts,
  NotoSans_400Regular,
  NotoSans_600SemiBold,
  NotoSans_700Bold,
} from '@expo-google-fonts/noto-sans';
export default function ModalScreen() {
  let [fontsLoaded, fontError] = useFonts({
    NotoSans_400Regular,
    NotoSans_600SemiBold,
    NotoSans_700Bold,
  });
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kurwa?</Text>
      <Text style={{ fontFamily: 'NotoSans_700Bold', fontSize: 40 }}>
        Хіба ревуть воли як ясла повні?
      </Text>
      <View
        style={styles.separator}
        lightColor='#eee'
        darkColor='rgba(255,255,255,0.1)'
      />
      <EditScreenInfo path='app/modal.tsx' />

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
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
    fontFamily: 'NotoSans_400Regular',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
