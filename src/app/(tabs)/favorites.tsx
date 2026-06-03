import { COLORS } from "@/constants/theme";
import { StyleSheet, Text, View } from "react-native";

export default function FavoritesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Halaman Favorit</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.background,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.text,
  },
});
