import { supabase } from "@/lib/supabase";

export async function signInWithEmail(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { data, error };
  } catch (error: any) {
    return { data: null, error };
  }
}

export async function signUpWithEmail(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    return { data, error };
  } catch (error: any) {
    return { data: null, error };
  }
}

export async function signOutUser() {
  try {
    const { error } = await supabase.auth.signOut();
    return { error };
  } catch (error: any) {
    return { error };
  }
}