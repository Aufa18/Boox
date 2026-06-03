import { COLORS } from "@/constants/theme";
import { LogOut, Settings, ShieldCheck, User } from "lucide-react-native";
import React from "react";

export type AccountOptionType = {
  title: string;
  icon: React.ReactNode;
  routeName?: string;
  bgColor: string;
};

export const ACCOUNT_OPTIONS: AccountOptionType[] = [
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
