import { useAuth } from "@/providers/AuthProvider";

export const useUserProfile = () => {
  // 1. Ambil user dan status inisialisasi dari Global Provider
  const { user, isInitialized } = useAuth();

  // 2. Ambil email (jangan lupa untuk di-return agar profile.tsx tidak error)
  const email = user?.email || "user@email.com";

  // 3. Ambil nama (Gunakan full_name sesuai dengan register.tsx)
  const displayName = user?.user_metadata?.full_name || email.split("@")[0] || "Boox Member";

  // 4. Logika pembuatan URL avatar dipusatkan di sini
  const avatarUrl = `https://ui-avatars.com/api/?name=${displayName}&background=E8C090&color=1C1C1C&size=200`;

  // 5. Return data yang dibutuhkan oleh komponen UI
  return { 
    displayName, 
    avatarUrl,
    email,
    isLoading: !isInitialized // Kita pinjam status loading dari AuthProvider saja
  };
};