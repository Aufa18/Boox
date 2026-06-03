// File: src/hooks/useConfirmExit.ts
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";
import { Alert, BackHandler } from "react-native";

export function useConfirmExit() {
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        Alert.alert(
          "Keluar Aplikasi",
          "Apakah Anda yakin ingin keluar dari Boox?",
          [
            { text: "Batal", onPress: () => null, style: "cancel" },
            { text: "Ya, Keluar", onPress: () => BackHandler.exitApp(), style: "destructive" },
          ]
        );
        return true; 
      };

      const subscription = BackHandler.addEventListener("hardwareBackPress", onBackPress);
      return () => subscription.remove();
    }, [])
  );
}