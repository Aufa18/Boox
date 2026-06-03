import { COLORS } from "@/constants/theme";
import { router } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Komponen Visual
import {
  CategoryList,
  HomeHeader,
  ProductCard,
  PromoBanner,
  SearchBar,
} from "@/components";

import { useProducts } from "@/hooks/useProducts";

const CATEGORIES = ["All", "Hot Coffee", "Cold Coffee"];

export default function HomeScreen() {
  const { products, isLoading, refetch } = useProducts();
  const [activeCategory, setActiveCategory] = useState("All");

  if (isLoading && products.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loadingText}>Menyiapkan menu kopi hangat...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        onRefresh={refetch}
        refreshing={isLoading}
        ListHeaderComponent={
          <>
            <HomeHeader />
            <SearchBar />
            <PromoBanner />
            <CategoryList
              categories={CATEGORIES}
              activeCategory={activeCategory}
              onSelectCategory={setActiveCategory}
            />
          </>
        }
        renderItem={({ item }) => (
          <ProductCard
            item={item}
            onPress={() => router.push(`/detail/${item.id}`)}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.background,
  },
  loadingText: {
    marginTop: 12,
    color: COLORS.subtitle,
    fontSize: 14,
    fontWeight: "500",
  },
  listContent: { paddingHorizontal: 16, paddingBottom: 120 },
  row: { justifyContent: "space-between" },
});
