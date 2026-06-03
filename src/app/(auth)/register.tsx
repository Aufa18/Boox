// File: src/app/(auth)/register.tsx
import { COLORS } from "@/constants/theme";
import { signUpWithEmail } from "@/services/auth"; // Import service
import { router } from "expo-router";
import { useState } from "react";
import {
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RegisterScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!email || !password) {
      Alert.alert("Perhatian", "Mohon lengkapi email dan password.");
      return;
    }
    if (password.length < 6) {
      Alert.alert("Perhatian", "Password harus minimal 6 karakter.");
      return;
    }

    setLoading(true);
    const { error } = await signUpWithEmail(email, password);

    if (error) {
      Alert.alert("Pendaftaran Gagal", error.message);
    } else {
      Alert.alert("Berhasil!", "Akun Anda telah dibuat. Silakan login.", [
        { text: "OK", onPress: () => router.replace("/(auth)/login") },
      ]);
    }
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.content}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Join Boox</Text>
          <Text style={styles.subtitle}>
            Start your premium coffee journey today.
          </Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter a valid email"
            placeholderTextColor={COLORS.subtitle}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Create a strong password"
            placeholderTextColor={COLORS.subtitle}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableOpacity
            style={styles.primaryButton}
            onPress={handleRegister}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color={COLORS.card} />
            ) : (
              <Text style={styles.buttonText}>Create Account</Text>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.footerLink}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // Desain konsisten persis dengan layar Login
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { flex: 1, padding: 24, justifyContent: "center" },
  header: { marginBottom: 40 },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: 8,
  },
  subtitle: { fontSize: 16, color: COLORS.subtitle },
  form: { gap: 16 },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: -8,
    marginLeft: 4,
  },
  input: {
    backgroundColor: COLORS.card,
    height: 56,
    borderRadius: 16,
    paddingHorizontal: 16,
    fontSize: 16,
    color: COLORS.text,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.05)",
  },
  primaryButton: {
    backgroundColor: COLORS.text,
    height: 56,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12,
  }, // Warna button beda sedikit (Dark) untuk pembeda visual
  buttonText: { color: COLORS.card, fontSize: 16, fontWeight: "bold" },
  footer: { flexDirection: "row", justifyContent: "center", marginTop: 32 },
  footerText: { color: COLORS.subtitle, fontSize: 14 },
  footerLink: { color: COLORS.accent, fontSize: 14, fontWeight: "bold" },
});
