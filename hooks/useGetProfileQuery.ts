import { supabase } from '@/supabase';
import { useQuery } from '@tanstack/react-query';

export function useGetProfileQuery(gender: string) {
  return useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const { data } = await supabase
        .from('random_profiles')
        .select('*, prompts(*), photos(src,id)')
        .order('updated_at', { foreignTable: 'photos', ascending: false })
        .eq('gender', gender)
        .neq('onboarded', false)
        .returns<FullProfile[]>()
        .limit(1);
      // .single();
      return data;
    },
    // enabled: !!id,
  });
}
