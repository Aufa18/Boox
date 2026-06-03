import { useRouter } from "expo-router";
import React from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// Kita gunakan Lucide Icons agar seragam dengan tab bar Boox Anda
import {
  ChevronRight,
  LogOut,
  Settings,
  ShieldCheck,
  User,
} from "lucide-react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

// Import sistem Boox
import { COLORS } from "../../constants/products";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../providers/AuthProvider";

// Tipe data opsi akun
type AccountOptionType = {
  title: string;
  icon: React.ReactNode;
  routeName?: string;
  bgColor: string;
};

const ProfileScreen = () => {
  const { user } = useAuth();
  const router = useRouter();

  const accountOptions: AccountOptionType[] = [
    {
      title: "Edit Profile",
      icon: <User size={24} color={COLORS.card} />,
      routeName: "/(modals)/profileModal",
      bgColor: COLORS.accent, // Menggunakan warna coklat aplikasi Anda
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
    const { error } = await supabase.auth.signOut();
    if (error) {
      Alert.alert("Error", error.message);
    }
  };

  const showLogoutAlert = () => {
    Alert.alert("Confirm", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Logout",
        onPress: () => handleLogout(),
        style: "destructive",
      },
    ]);
  };

  const handlePress = (item: AccountOptionType) => {
    if (item.title === "Logout") {
      showLogoutAlert();
    } else if (item.routeName) {
      router.push(item.routeName as any);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* User Info Section */}
      <View style={styles.userInfo}>
        <View style={styles.avatarContainer}>
          {/* Avatar Default karena Supabase belum menyimpan gambar user secara otomatis */}
          <Image
            source={{
              uri: "https://ui-avatars.com/api/?name=Coffee+Lover&background=E8C090&color=1C1C1C&size=200",
            }}
            style={styles.avatar}
          />
        </View>

        <View style={styles.nameContainer}>
          <Text style={styles.userName}>Aufa</Text>
          <Text style={styles.userEmail}>
            {user?.email || "user@email.com"}
          </Text>
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
                {/* Icon Wrapper */}
                <View
                  style={[styles.listIcon, { backgroundColor: item.bgColor }]}
                >
                  {item.icon}
                </View>

                {/* Title */}
                <Text style={styles.listTitle}>{item.title}</Text>

                {/* Caret Icon */}
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
  userInfo: {
    marginTop: 30,
    alignItems: "center",
    gap: 15,
  },
  avatarContainer: {
    position: "relative",
    alignSelf: "center",
  },
  avatar: {
    height: 120,
    width: 120,
    borderRadius: 60,
    backgroundColor: COLORS.primary,
  },
  nameContainer: {
    alignItems: "center",
    gap: 4,
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.text,
  },
  userEmail: {
    fontSize: 15,
    color: COLORS.subtitle,
  },
  accountOptions: {
    marginTop: 40,
  },
  listItem: {
    marginBottom: 16,
  },
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
  listTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.text,
  },
});
