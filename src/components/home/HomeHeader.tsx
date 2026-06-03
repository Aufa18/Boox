import { COLORS } from "@/constants/theme";
import { useUserProfile } from "@/hooks/useUserProfile";
import { Bell } from "lucide-react-native";
import { Image, StyleSheet, Text, View } from "react-native";

export default function HomeHeader() {
  // Panggil hook yang sudah dibuat
  const { displayName, avatarUrl } = useUserProfile();

  return (
    <View style={styles.header}>
      <View style={styles.userInfo}>
        <Image source={{ uri: avatarUrl }} style={styles.avatar} />
        <View>
          <Text style={styles.welcomeText}>Welcome,</Text>
          <Text style={styles.userName}>{displayName || "Boox"}</Text>
        </View>
      </View>
      <View style={styles.notificationBtn}>
        <Bell size={24} color={COLORS.text} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 24,
  },
  userInfo: { flexDirection: "row", alignItems: "center", gap: 12 },
  avatar: { width: 44, height: 44, borderRadius: 22 },
  welcomeText: { fontSize: 12, color: COLORS.subtitle },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.text,
    textTransform: "capitalize",
  },
  notificationBtn: {
    backgroundColor: COLORS.card,
    padding: 10,
    borderRadius: 20,
  },
});
