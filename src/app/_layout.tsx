import { Stack, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { AuthProvider, useAuth } from "../providers/AuthProvider";

// Kita pisahkan logika navigasinya ke komponen terpisah agar bisa menggunakan useAuth
function RootLayoutNav() {
  const { session, isInitialized } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (!isInitialized) return;

    // Cek pengguna sedang berada di grup folder mana
    const inAuthGroup = (segments[0] as string) === "(auth)";

    if (!session) {
      if (!inAuthGroup) {
        // Jika TIDAK ADA session dan BUKAN di halaman auth, tendang ke login
        router.replace("/(auth)/login" as any);
      }
    } else {
      if (inAuthGroup || !segments[0]) {
        // Jika ADA session tapi dia nyasar ke halaman auth, tendang ke home
        router.replace("/(tabs)/home" as any);
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
