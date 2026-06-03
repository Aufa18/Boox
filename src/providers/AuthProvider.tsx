import { supabase } from "@/lib/supabase";
import { Session, User } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState } from "react";

type AuthData = {
  session: Session | null;
  user: User | null;
  isInitialized: boolean; // Menandakan apakah Supabase sudah selesai mengecek memori
};

const AuthContext = createContext<AuthData>({
  session: null,
  user: null,
  isInitialized: false,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Cek sesi saat aplikasi pertama kali dibuka
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsInitialized(true);
    });

    // Dengarkan perubahan (misal: saat user login/logout)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{ session, user: session?.user || null, isInitialized }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook untuk mempermudah pemanggilan di file lain
export const useAuth = () => useContext(AuthContext);
