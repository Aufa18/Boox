import { Href, useRouter } from "expo-router";
import {
  ChevronRight,
  LogOut,
  Settings,
  ShieldCheck,
  User,
} from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

// Import dari arsitektur internal kita
import { COLORS } from "@/constants/theme";
import { useAuth } from "@/providers/AuthProvider";
import { getCurrentUser, signOutUser } from "@/services";

type AccountOptionType = {
  title: string;
  icon: React.ReactNode;
  routeName?: string;
  bgColor: string;
};

const ProfileScreen = () => {
  const { user } = useAuth();
  const router = useRouter();

  // Memaksimalkan data dinamis dari email yang login
  const [displayName, setDisplayName] = useState<string>("");
  const userEmail = user?.email || "user@email.com";
  const avatarUrl = `https://ui-avatars.com/api/?name=${displayName}&background=E8C090&color=1C1C1C&size=200`;

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

  const accountOptions: AccountOptionType[] = [
    {
      title: "Edit Profile",
      icon: <User size={24} color={COLORS.card} />,
      routeName: "/(modals)/profileModal",
      bgColor: COLORS.accent,
    },
    {
      title: "Settings",
      icon: <Settings size={24} color={COLORS.card} />,
      bgColor: "#059669",
    },
    {
      title: "Privacy Policy",
      icon: <ShieldCheck size={24} color={COLORS.card} />,
      bgColor: COLORS.subtitle,
    },
    {
      title: "Logout",
      icon: <LogOut size={24} color={COLORS.card} />,
      bgColor: "#e11d48",
    },
  ];

  const handleLogout = async () => {
    // Logika bisnis murni dipanggil dari services, komponen menjadi sangat tipis!
    const { error } = await signOutUser();
    if (error) {
      Alert.alert("Error", error.message);
    }
  };

  const showLogoutAlert = () => {
    Alert.alert("Logout", "Apakah Anda yakin ingin keluar?", [
      { text: "Batal", style: "cancel" },
      { text: "Ya, Keluar", onPress: handleLogout, style: "destructive" },
    ]);
  };

  const handlePress = (item: AccountOptionType) => {
    if (item.title === "Logout") {
      showLogoutAlert();
    } else if (item.routeName) {
      // Menggunakan tipe Href agar Expo Typed Routes tidak protes
      router.push(item.routeName as Href);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* User Info Section */}
      <View style={styles.userInfo}>
        <View style={styles.avatarContainer}>
          <Image source={{ uri: avatarUrl }} style={styles.avatar} />
        </View>

        <View style={styles.nameContainer}>
          <Text style={styles.userName}>{displayName}</Text>
          <Text style={styles.userEmail}>{userEmail}</Text>
        </View>
      </View>

      {/* Account Options List */}
      <View style={styles.accountOptions}>
        {accountOptions.map((item, index) => {
          return (
            <Animated.View
              key={index.toString()}
              entering={FadeInDown.delay(index * 100).springify()}
              style={styles.listItem}
            >
              <TouchableOpacity
                style={styles.flexRow}
                onPress={() => handlePress(item)}
              >
                <View
                  style={[styles.listIcon, { backgroundColor: item.bgColor }]}
                >
                  {item.icon}
                </View>

                <Text style={styles.listTitle}>{item.title}</Text>

                <ChevronRight size={20} color={COLORS.text} />
              </TouchableOpacity>
            </Animated.View>
          );
        })}
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 20,
  },
  userInfo: { marginTop: 30, alignItems: "center", gap: 15 },
  avatarContainer: { position: "relative", alignSelf: "center" },
  avatar: {
    height: 120,
    width: 120,
    borderRadius: 60,
    backgroundColor: COLORS.primary,
  },
  nameContainer: { alignItems: "center", gap: 4 },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.text,
    textTransform: "capitalize",
  },
  userEmail: { fontSize: 15, color: COLORS.subtitle },
  accountOptions: { marginTop: 40 },
  listItem: { marginBottom: 16 },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.card,
    padding: 12,
    borderRadius: 16,
    gap: 12,
  },
  listIcon: {
    height: 44,
    width: 44,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
  },
  listTitle: { flex: 1, fontSize: 16, fontWeight: "600", color: COLORS.text },
});
