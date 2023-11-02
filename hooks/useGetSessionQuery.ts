import { supabase } from '@/supabase';
import { Session } from '@supabase/supabase-js';
import { useQuery } from '@tanstack/react-query';

export function useGetSession() {
  return useQuery({
    queryKey: ['session'],
    queryFn: async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        return {} as Session;
      }
      return data.session;
    },
  });
}
