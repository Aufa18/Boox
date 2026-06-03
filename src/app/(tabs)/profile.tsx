import { Href, useRouter } from "expo-router";
import { ChevronRight } from "lucide-react-native";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

// Imports internal
import { ACCOUNT_OPTIONS, AccountOptionType } from "@/constants/profileOptions";
import { COLORS } from "@/constants/theme";
import { useUserProfile } from "@/hooks/useUserProfile";
import { signOutUser } from "@/services";

const ProfileOptionRow = ({
  item,
  index,
  onPress,
}: {
  item: AccountOptionType;
  index: number;
  onPress: (item: AccountOptionType) => void;
}) => (
  <Animated.View
    entering={FadeInDown.delay(index * 100).springify()}
    style={styles.listItem}
  >
    <TouchableOpacity style={styles.flexRow} onPress={() => onPress(item)}>
      <View style={[styles.listIcon, { backgroundColor: item.bgColor }]}>
        {item.icon}
      </View>
      <Text style={styles.listTitle}>{item.title}</Text>
      <ChevronRight size={20} color={COLORS.text} />
    </TouchableOpacity>
  </Animated.View>
);

const ProfileScreen = () => {
  const router = useRouter();

  // Panggil hook yang sudah dibuat
  const { displayName, avatarUrl, email } = useUserProfile();

  const handleLogout = async () => {
    const { error } = await signOutUser();
    if (error) Alert.alert("Error", error.message);
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
          <Text style={styles.userName}>{displayName || "Boox"}</Text>
          <Text style={styles.userEmail}>{email}</Text>
        </View>
      </View>

      {/* Account Options List */}
      <View style={styles.accountOptions}>
        {ACCOUNT_OPTIONS.map((item, index) => (
          <ProfileOptionRow
            key={item.title}
            item={item}
            index={index}
            onPress={handlePress}
          />
        ))}
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
