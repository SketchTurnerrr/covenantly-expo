import { EmailOtpType } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

const signUp = async (email: string, password: string) => {
  const { error } = await supabase.auth.signUp({
    email,
    password,
  });
  if (error) throw error;
};

const verifyOtp = async (email: string, token: string, type: EmailOtpType) => {
  const { error } = await supabase.auth.verifyOtp({
    email,
    token,
    type,
  });
  if (error) throw error;
};

const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;

  console.log('error :', error);
};

const getSession = async () => {
  const result = await supabase.auth.getSession();
};
