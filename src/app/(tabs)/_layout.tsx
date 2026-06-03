import { COLORS } from "@/constants/theme";
import { Tabs } from "expo-router";
import { Heart, Home, ShoppingCart, UserRound } from "lucide-react-native";
import {
  ColorValue,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const TAB_ICON_SIZE = 22;

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: COLORS.text,
        tabBarInactiveTintColor: COLORS.text,
        tabBarButton: ({ onPress, onLongPress, style, children }) => (
          <Pressable onPress={onPress} onLongPress={onLongPress} style={style}>
            {children}
          </Pressable>
        ),
        tabBarStyle: {
          position: "absolute",
          bottom: insets.bottom + 16,
          left: 0,
          right: 0,
          marginLeft: 30,
          marginRight: 30,
          height: 64,
          backgroundColor: COLORS.primary,
          borderRadius: 32,
          borderTopWidth: 0,
          paddingHorizontal: 8,
          ...Platform.select({
            ios: {
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.12,
              shadowRadius: 12,
            },
            android: {
              elevation: 8,
            },
          }),
        },
        tabBarItemStyle: {
          paddingVertical: 8,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon icon={Home} color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon icon={ShoppingCart} color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon icon={Heart} color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon icon={UserRound} color={color} focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}

function TabIcon({
  icon: Icon,
  color,
  focused,
}: {
  icon: typeof Home;
  color: ColorValue;
  focused: boolean;
}) {
  return (
    <View style={[styles.iconWrap, focused && styles.iconWrapActive]}>
      <Icon
        size={TAB_ICON_SIZE}
        color={focused ? COLORS.text : color}
        strokeWidth={focused ? 3 : 2}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  iconWrap: {
    marginTop: 10,
    width: 60,
    height: 52,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  iconWrapActive: {
    backgroundColor: COLORS.card,
  },
});
