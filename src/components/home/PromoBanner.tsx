import { COLORS } from "@/constants/theme";
import { Image, StyleSheet, Text, View } from "react-native";

export default function PromoBanner() {
  return (
    <View style={styles.banner}>
      <View style={styles.bannerContent}>
        <Text style={styles.bannerTag}>Today Only</Text>
        <Text style={styles.bannerTitle}>50% OFF</Text>
        <Text style={styles.bannerSubtitle}>Super Discount</Text>
        <View style={styles.bookBtn}>
          <Text style={styles.bookBtnText}>Book Now</Text>
        </View>
      </View>
      <Image
        source={{
          uri: "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=200&q=80",
        }}
        style={styles.bannerImage}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    backgroundColor: COLORS.accent,
    borderRadius: 24,
    padding: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
    overflow: "hidden",
  },
  bannerContent: { flex: 1, zIndex: 2 },
  bannerTag: { color: COLORS.card, fontSize: 12, opacity: 0.9 },
  bannerTitle: {
    color: COLORS.card,
    fontSize: 32,
    fontWeight: "900",
    marginVertical: 4,
  },
  bannerSubtitle: {
    color: COLORS.card,
    fontSize: 14,
    opacity: 0.9,
    marginBottom: 16,
  },
  bookBtn: {
    backgroundColor: COLORS.primary,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  bookBtnText: { color: COLORS.text, fontWeight: "bold", fontSize: 12 },
  bannerImage: {
    position: "absolute",
    right: -20,
    top: -20,
    width: 150,
    height: 150,
    opacity: 0.8,
  },
});
