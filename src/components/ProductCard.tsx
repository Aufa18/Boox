import { COLORS } from "@/constants/theme";
import { Product } from "@/types/product";
import { getOptimizedImageUrl } from "@/utils/cloudinary";
import { Heart, ShoppingCart } from "lucide-react-native";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

interface ProductCardProps {
  item: Product;
  onPress: () => void;
}

export default function ProductCard({ item, onPress }: ProductCardProps) {
  const optimizedImage = getOptimizedImageUrl(item.image, 500, 500);

  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Image source={{ uri: optimizedImage }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.name} numberOfLines={1}>
          {item.name}
        </Text>
        <View style={styles.bottomRow}>
          <Text style={styles.price}>
            Rp {item.price.toLocaleString("id-ID")}
          </Text>
          <View style={styles.actions}>
            <Heart size={18} color={COLORS.text} style={styles.icon} />
            <View style={styles.cartBtn}>
              <ShoppingCart size={14} color={COLORS.card} />
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 20,
    flex: 1,
    margin: 8,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 120,
    borderRadius: 16,
    backgroundColor: COLORS.background,
  },
  infoContainer: {
    marginTop: 12,
    gap: 4,
  },
  name: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.text,
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.text,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  icon: {
    opacity: 0.5,
  },
  cartBtn: {
    backgroundColor: COLORS.text,
    padding: 6,
    borderRadius: 10,
  },
});
