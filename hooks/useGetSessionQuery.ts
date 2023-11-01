import { supabase } from '@/supabase';
import { useQuery } from '@tanstack/react-query';

export function useGetSession() {
  return useQuery({
    queryKey: ['session'],
    queryFn: async () => {
      const { data } = await supabase.auth.getSession();
      return data;
    },
  });
}
