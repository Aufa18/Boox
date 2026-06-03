// File: src/app/(tabs)/cart.tsx (Contoh, terapkan juga ke favorites.tsx dan profile.tsx)
import { StyleSheet, Text, View } from "react-native";
import { COLORS } from "../../constants/products";

export default function CartScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Halaman Keranjang</Text>
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
