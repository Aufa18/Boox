import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { COLORS } from "../constants/products";

export default function OnboardingScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1559525839-b184a4d698c7?auto=format&fit=crop&w=800&q=80",
          }}
          style={styles.heroImage}
        />
        <LinearGradient
          // Mulai dari transparan (atas) menuju warna background (bawah)
          colors={["transparent", COLORS.background]}
          style={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            height: 120,
          }}
        />
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.title}>Coffee{"\n"}Made Easy</Text>
        <Text style={styles.subtitle}>
          Order your favorite coffee in seconds{"\n"}with our speed and
          simplicity.
        </Text>

        <Pressable style={styles.button} onPress={() => router.push("/home")}>
          <Text style={styles.buttonText}>Get Started</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  imageContainer: {
    flex: 1.5,
    justifyContent: "center",
    alignItems: "center",
  },
  heroImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 30,
    paddingBottom: 40,
    justifyContent: "flex-end",
  },
  title: {
    fontSize: 48,
    fontWeight: "900",
    color: COLORS.text,
    lineHeight: 52,
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.subtitle,
    lineHeight: 24,
    marginBottom: 40,
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 20,
    borderRadius: 30,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.text,
  },
});
