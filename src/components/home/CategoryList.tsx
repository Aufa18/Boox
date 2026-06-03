import { COLORS } from "@/constants/theme";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity
} from "react-native";

interface CategoryListProps {
  categories: string[];
  activeCategory: string;
  onSelectCategory: (category: string) => void;
}

export default function CategoryList({
  categories,
  activeCategory,
  onSelectCategory,
}: CategoryListProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.categories}
    >
      {categories.map((cat) => {
        const isActive = activeCategory === cat;
        return (
          <TouchableOpacity
            key={cat}
            onPress={() => onSelectCategory(cat)}
            style={[styles.categoryPill, isActive && styles.categoryPillActive]}
          >
            <Text
              style={[
                styles.categoryText,
                isActive && styles.categoryTextActive,
              ]}
            >
              {cat}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  categories: { marginBottom: 16 },
  categoryPill: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: COLORS.card,
    marginRight: 12,
  },
  categoryPillActive: { backgroundColor: COLORS.primary },
  categoryText: { color: COLORS.subtitle, fontWeight: "600" },
  categoryTextActive: { color: COLORS.text },
});
