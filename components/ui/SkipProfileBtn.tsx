import { TouchableOpacity } from 'react-native-gesture-handler';
import { ArrowRight } from 'lucide-react-native';
import tw from '@/lib/tailwind';
import { View } from './Themed';
import Svg, { Circle } from 'react-native-svg';

export function SkipProfileBtn() {
  return (
    <View style={tw`absolute z-1 left-[4] bottom-[16] bg-transparent`}>
      <TouchableOpacity style={tw`p-2 bg-white rounded-full shadow-sm`}>
        <ArrowRight size={24} color='black' />
      </TouchableOpacity>
    </View>
  );
}
