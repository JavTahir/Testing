import { supabase } from './supabase';
import toast from 'react-hot-toast';

export const signIn = async (email: string, password: string) => {
  try {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    toast.success('Successfully logged in!');
    return { error: null };
  } catch (error: any) {
    toast.error(error.message);
    return { error };
  }
};

export const signUp = async (email: string, password: string) => {
  try {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) throw error;
    toast.success('Registration successful! You can now login.');
    return { error: null };
  } catch (error: any) {
    toast.error(error.message);
    return { error };
  }
};

export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    toast.success('Successfully logged out!');
    return { error: null };
  } catch (error: any) {
    toast.error(error.message);
    return { error };
  }
};