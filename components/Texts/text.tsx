import React from "react";
import { Text, StyleSheet } from "react-native";
import { useTheme } from "@/constants/ThemeContext";
import { useLoadFonts } from "@/hooks/useLoadFonts";

const LogoText = () => {
  const { isDarkMode } = useTheme();
  const fontsLoaded = useLoadFonts();

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Text style={[styles.logo, { color: isDarkMode ? "white" : "#1F2937" }]}>
      DO I<Text style={styles.logoLetter}>T</Text>
      <Text style={[styles.logo, { color: isDarkMode ? "white" : "#1F2937" }]}>
        .
      </Text>
    </Text>
  );
};

const styles = StyleSheet.create({
  logo: {
    fontSize: 31,
    fontFamily: "Montserrat-Bold",
    color: "#1F2937",
  },
  logoLetter: {
    fontSize: 31,
    color: "#66D1A6",
    fontFamily: "Montserrat-Bold",
  },
});

export { LogoText };
