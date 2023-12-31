import { Image } from 'expo-image';
import { StyleSheet } from 'react-native';

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

export default function AvatarImage({ src }: { src: string }) {
  return (
    <Image
      style={styles.image}
      source={src}
      placeholder={blurhash}
      //   contentFit='cover'
      transition={1000}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    borderRadius: 999,
    aspectRatio: 1 / 1,
    backgroundColor: '#0553',
  },
});
