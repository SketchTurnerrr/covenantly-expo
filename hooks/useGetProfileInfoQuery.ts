import { supabase } from '@/supabase';
import { useQuery } from '@tanstack/react-query';

export function useGetProfileInfoQuery(id: string | undefined) {
  return useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      if (id) {
        const { data } = await supabase
          .from('profiles')
          .select(`first_name, photos(id,src)`)
          .eq('id', id)
          .returns<FullProfile>()
          .single();
        return data;
      }
    },
    enabled: !!id,
  });
}
