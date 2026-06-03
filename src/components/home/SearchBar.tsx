import { COLORS } from "@/constants/theme";
import { Search, SlidersHorizontal } from "lucide-react-native";
import { StyleSheet, TextInput, View } from "react-native";

export default function SearchBar() {
  return (
    <View style={styles.searchContainer}>
      <Search size={20} color={COLORS.subtitle} />
      <TextInput
        placeholder="Search coffee..."
        style={styles.searchInput}
        placeholderTextColor={COLORS.subtitle}
      />
      <SlidersHorizontal size={20} color={COLORS.text} />
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.card,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 16,
    marginBottom: 24,
  },
  searchInput: { flex: 1, marginLeft: 12, fontSize: 14, color: COLORS.text },
});
