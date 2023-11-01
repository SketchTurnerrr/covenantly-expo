import { View } from './Themed';
import tw from 'twrnc';

export function Separator() {
  return <View style={tw`w-full h-[2px] bg-gray-200`}></View>;
}
