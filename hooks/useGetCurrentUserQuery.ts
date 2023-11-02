import { supabase } from '@/supabase';
import { useQuery } from '@tanstack/react-query';
import { useGetSession } from './useGetSessionQuery';

interface ICurrentUser {
  first_name: string;
  id: string;
  photos: {
    id: string;
    src: string;
  }[];
}

export function useGetCurrentUserQuery() {
  const { data } = useGetSession();
  return useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      if (data) {
        const { data: profile } = await supabase
          .from('profiles')
          .select(`first_name, id, photos(id,src)`)
          .eq('id', data.user.id)
          // .returns<FullProfile>()
          .single();
        return profile as ICurrentUser;
      } else {
        return {} as ICurrentUser;
      }
    },

    enabled: !!data,
  });
}
