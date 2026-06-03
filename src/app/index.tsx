import { COLORS } from "@/constants/theme";
import { router } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OnboardingScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.brand}>Boox</Text>
      <View style={styles.imageContainer}>
        <Image
          source={require("../../assets/images/welcome.png")}
          style={styles.heroImage}
        />
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.title}>Coffee{"\n"}Made Easy</Text>
        <Text style={styles.subtitle}>
          Order your favorite coffee in seconds{"\n"}with our speed and
          simplicity.
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/(tabs)/home")}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  brand: {
    color: "brown",
    paddingHorizontal: 30,
    fontSize: 48,
    fontWeight: "900",
    lineHeight: 52,
  },
  imageContainer: {
    flex: 1.5,
    justifyContent: "center",
    alignItems: "center",
    // paddingTop: 40,
  },
  heroImage: {
    width: "110%",
    height: "110%",
    resizeMode: "contain",
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
