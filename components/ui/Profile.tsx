import { StyleSheet, View, Text } from 'react-native';
import { useGetProfileQuery } from '@/hooks/useGetProfileQuery';
import DiscoverPageImage from './DiscoverPageImage';
import tw from '@/lib/tailwind';
import { Prompt } from './Prompt';
import { Cake, Cross, MapPin } from 'lucide-react-native';
import { ScrollView } from 'react-native';
export function Profile() {
  const { data: profile } = useGetProfileQuery('female');
  // console.log('data :', data);

  if (!profile) {
    return null;
  }

  return (
    <View style={tw`flex-1 gap-4 p-4 `}>
      {/* <View style={{ position: 'absolute', zIndex: 10, bottom: 50, right: 30 }}> */}
      {/* </View> */}
      <Text style={tw`text-4xl font-bold`}>{profile?.[0]?.first_name}</Text>

      <DiscoverPageImage src={profile[0]?.photos[0]?.src} />
      <Prompt
        question={profile[0]?.prompts[0]?.question}
        answer={profile[0]?.prompts[0]?.answer}
        id={profile[0]?.prompts[0]?.id}
      />
      <View
        style={tw`flex flex-row justify-between gap-4 p-4 bg-gray-100 rounded-lg`}
      >
        <View style={tw`flex flex-row gap-4`}>
          <Cake size={24} color={'black'} />
          <Text style={tw`flex flex-row text-base font-bold`}>
            {profile?.[0]?.age}
          </Text>
        </View>
        <View style={tw`flex flex-row gap-4`}>
          <Cross size={24} color='black' />
          <Text style={tw`flex flex-row text-base font-bold`}>
            {profile?.[0]?.denomination}
          </Text>
        </View>
        <View style={tw`flex flex-row gap-4`}>
          <MapPin size={24} color='black' />
          <Text style={tw`flex flex-row text-base font-bold`}>
            {profile?.[0]?.toponym}
          </Text>
        </View>
      </View>

      <DiscoverPageImage src={profile[0]?.photos[1]?.src} />
      <DiscoverPageImage src={profile[0]?.photos[2]?.src} />
      <Prompt
        question={profile[0]?.prompts[1]?.question}
        answer={profile[0]?.prompts[1]?.answer}
        id={profile[0]?.prompts[1]?.id}
      />
      <DiscoverPageImage src={profile[0]?.photos[3]?.src} />
      <Prompt
        question={profile[0]?.prompts[2]?.question}
        answer={profile[0]?.prompts[2]?.answer}
        id={profile[0]?.prompts[2]?.id}
      />

      <DiscoverPageImage src={profile[0]?.photos[4]?.src} />
      <DiscoverPageImage src={profile[0]?.photos[5]?.src} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    // alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
