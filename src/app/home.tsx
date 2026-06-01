import { router } from "expo-router";
import { Bell, Search, SlidersHorizontal } from "lucide-react-native";
import {
    FlatList,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ProductCard from "../components/ProductCard";
import { COLORS, products } from "../constants/products";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <>
            {/* Header */}
            <View style={styles.header}>
              <View style={styles.userInfo}>
                <Image
                  source={{ uri: "https://i.pravatar.cc/100" }}
                  style={styles.avatar}
                />
                <View>
                  <Text style={styles.welcomeText}>Welcome,</Text>
                  <Text style={styles.userName}>Devon Lane</Text>
                </View>
              </View>
              <View style={styles.notificationBtn}>
                <Bell size={24} color={COLORS.text} />
              </View>
            </View>

            {/* Search Bar */}
            <View style={styles.searchContainer}>
              <Search size={20} color={COLORS.subtitle} />
              <TextInput
                placeholder="Search coffee..."
                style={styles.searchInput}
                placeholderTextColor={COLORS.subtitle}
              />
              <SlidersHorizontal size={20} color={COLORS.text} />
            </View>

            {/* Promo Banner */}
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

            {/* Categories */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.categories}
            >
              {["All", "Hot Coffee", "Cold Coffee"].map((cat, index) => (
                <View
                  key={cat}
                  style={[
                    styles.categoryPill,
                    index === 0 && styles.categoryPillActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.categoryText,
                      index === 0 && styles.categoryTextActive,
                    ]}
                  >
                    {cat}
                  </Text>
                </View>
              ))}
            </ScrollView>
          </>
        }
        renderItem={({ item }) => (
          <ProductCard
            item={item}
            onPress={() => router.push(`/detail/[id]`)}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  row: {
    justifyContent: "space-between",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 24,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  welcomeText: {
    fontSize: 12,
    color: COLORS.subtitle,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.text,
  },
  notificationBtn: {
    backgroundColor: COLORS.card,
    padding: 10,
    borderRadius: 20,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.card,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 16,
    marginBottom: 24,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 14,
    color: COLORS.text,
  },
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
  bannerContent: {
    flex: 1,
    zIndex: 2,
  },
  bannerTag: {
    color: COLORS.card,
    fontSize: 12,
    opacity: 0.9,
  },
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
  bookBtnText: {
    color: COLORS.text,
    fontWeight: "bold",
    fontSize: 12,
  },
  bannerImage: {
    position: "absolute",
    right: -20,
    top: -20,
    width: 150,
    height: 150,
    opacity: 0.8,
  },
  categories: {
    marginBottom: 16,
  },
  categoryPill: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: COLORS.card,
    marginRight: 12,
  },
  categoryPillActive: {
    backgroundColor: COLORS.primary,
  },
  categoryText: {
    color: COLORS.subtitle,
    fontWeight: "600",
  },
  categoryTextActive: {
    color: COLORS.text,
  },
});
