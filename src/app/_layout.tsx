import { AuthProvider, useAuth } from "@/providers/AuthProvider";
import { Stack, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";

// Kita pisahkan logika navigasinya ke komponen terpisah agar bisa menggunakan useAuth
function RootLayoutNav() {
  const { session, isInitialized } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (!isInitialized) return;

    // Cek pengguna sedang berada di grup folder mana
    const inAuthGroup = (segments[0] as string) === "(auth)";

    // Cek apakah pengguna berada di halaman awal (Onboarding / index.tsx)
    const isRootIndex = !segments[0];

    if (!session) {
      // 1. JIKA BELUM LOGIN:
      // Bolehkan mereka berada di halaman (auth) ATAU di halaman awal (Onboarding).
      // Tendang ke login HANYA JIKA mereka mencoba mengintip halaman dalam seperti (tabs).
      if (!inAuthGroup && !isRootIndex) {
        router.replace("/(auth)/login");
      }
    } else {
      // 2. JIKA SUDAH LOGIN:
      // Jika mereka nyasar kembali ke halaman (auth) atau halaman awal (Onboarding),
      // langsung terbangkan (skip) ke halaman utama aplikasi.
      if (inAuthGroup || isRootIndex) {
        router.replace("/(tabs)/home");
      }
    }
  }, [session, isInitialized, segments]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="detail/[id]" />
    </Stack>
  );
}

// Bungkus aplikasi dengan AuthProvider
export default function RootLayout() {
  return (
    <AuthProvider>
      <StatusBar style="dark" />
      <RootLayoutNav />
    </AuthProvider>
  );
}
