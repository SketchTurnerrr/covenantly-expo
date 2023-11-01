import tw from '@/lib/tailwind';
import { Text, View } from './Themed';

interface IPrompt {
  question: string;
  answer: string;
  id: string;
}

export function Prompt({ question, answer, id }: IPrompt) {
  return (
    <View
      style={tw`flex-1 bg-gray-100 px-4 py-8 rounded-lg justify-center gap-4`}
    >
      <Text style={tw``}>{question}</Text>
      <Text style={tw`text-2xl font-semibold`}>{answer}</Text>
    </View>
  );
}
