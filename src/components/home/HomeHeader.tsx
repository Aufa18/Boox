import { COLORS } from "@/constants/theme";
import { useAuth } from "@/providers/AuthProvider";
import { getCurrentUser } from "@/services";
import { Bell } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export default function HomeHeader() {
  const { user } = useAuth();
  const [displayName, setDisplayName] = useState<string>("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      const { user, error } = await getCurrentUser();

      if (error) {
        console.error("Gagal mengambil data user:", error.message);
      } else if (user && user.user_metadata) {
        // Mengekstrak display_name dari metadata Supabase
        setDisplayName(user.user_metadata.display_name);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <View style={styles.header}>
      <View style={styles.userInfo}>
        <Image
          source={{
            uri: `https://ui-avatars.com/api/?name=${displayName}&background=E8C090&color=1C1C1C&size=100`,
          }}
          style={styles.avatar}
        />
        <View>
          <Text style={styles.welcomeText}>Welcome,</Text>
          <Text style={styles.userName}>{displayName}</Text>
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
