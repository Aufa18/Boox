import { router, useLocalSearchParams } from "expo-router";
import { ChevronLeft, Minus, Plus, ShoppingCart } from "lucide-react-native";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, products } from "../../constants/products";

export default function DetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const product = products.find((p) => p.id === id) || products[0];

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.topSection} edges={["top"]}>
        <View style={styles.header}>
          <Pressable style={styles.iconBtn} onPress={() => router.back()}>
            <ChevronLeft size={24} color={COLORS.text} />
          </Pressable>
          <Text style={styles.headerTitle}>Details</Text>
          <Pressable style={styles.iconBtn}>
            <ShoppingCart size={20} color={COLORS.text} />
          </Pressable>
        </View>

        <View style={styles.imageWrapper}>
          <Image source={{ uri: product.image }} style={styles.productImage} />
        </View>
      </SafeAreaView>

      <View style={styles.bottomSheet}>
        <View style={styles.sheetHeader}>
          <View>
            <Text style={styles.title}>{product.name}</Text>
            <Text style={styles.subtitle}>200 gm</Text>
          </View>
        </View>

        <View style={styles.priceRow}>
          <Text style={styles.price}>${product.price.toFixed(2)}</Text>
          <View style={styles.quantitySelector}>
            <Pressable style={styles.qtyBtn}>
              <Minus size={16} color={COLORS.text} />
            </Pressable>
            <Text style={styles.qtyText}>2</Text>
            <Pressable style={styles.qtyBtn}>
              <Plus size={16} color={COLORS.text} />
            </Pressable>
          </View>
        </View>

        <Pressable style={styles.buyBtn}>
          <Text style={styles.buyBtnText}>Buy Now</Text>
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
  topSection: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 10,
  },
  iconBtn: {
    backgroundColor: COLORS.card,
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.text,
  },
  imageWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  productImage: {
    width: "90%",
    height: "90%",
    resizeMode: "contain",
  },
  bottomSheet: {
    backgroundColor: COLORS.card,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 30,
    paddingBottom: 40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.03,
    shadowRadius: 20,
    elevation: 10,
  },
  sheetHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: COLORS.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.subtitle,
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 40,
  },
  price: {
    fontSize: 32,
    fontWeight: "900",
    color: COLORS.text,
  },
  quantitySelector: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.background,
    borderRadius: 30,
    padding: 4,
  },
  qtyBtn: {
    backgroundColor: COLORS.primary,
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  qtyText: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.text,
    marginHorizontal: 16,
  },
  buyBtn: {
    backgroundColor: COLORS.primary,
    paddingVertical: 20,
    borderRadius: 30,
    alignItems: "center",
  },
  buyBtnText: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.text,
  },
});
