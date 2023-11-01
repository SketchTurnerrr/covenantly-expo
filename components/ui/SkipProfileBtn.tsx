import { TouchableOpacity } from 'react-native-gesture-handler';
import { ArrowRight } from 'lucide-react-native';
import tw from '@/lib/tailwind';
import { View } from './Themed';

export function SkipProfileBtn() {
  return (
    <View style={tw`absolute z-20 right-[5] bottom-5]`}>
      <TouchableOpacity style={tw`p-2 bg-red-200 rounded-full `}>
        <ArrowRight size={24} color='black' />
      </TouchableOpacity>
    </View>
  );
}
