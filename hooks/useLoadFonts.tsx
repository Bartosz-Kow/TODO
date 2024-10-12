import * as Font from "expo-font";
import { useFonts } from "expo-font";
import { ActivityIndicator } from "react-native";
import React from "react";

export const useLoadFonts = () => {
  const [fontsLoaded] = useFonts({
    "Montserrat-Bold": require("../assets/fonts/Montserrat-Bold.ttf"),
    "Roboto-Thin": require("../assets/fonts/Roboto-Thin.ttf"),
    "Roboto-Regular": require("../assets/fonts/Roboto-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" />;
  }

  return fontsLoaded;
};
