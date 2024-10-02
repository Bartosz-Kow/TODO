import React from "react";
import { Text, StyleSheet } from "react-native";
import { loadFonts } from "@/constants/Font";

interface LogoTextProps {
  children: string;
}

const LogoText: React.FC<LogoTextProps> = ({ children }) => {
  const length = children.length;

  return (
    <Text style={styles.logo}>
      {length > 1 && <Text>{children.slice(0, length - 1)}</Text>}
      <Text style={styles.logoLetter}>{children.charAt(length - 1)}</Text>{" "}
    </Text>
  );
};

const styles = StyleSheet.create({
  logo: {
    fontSize: 31,
    color: "#1F2937",
    fontFamily: "InterBold",
  },
  logoLetter: {
    fontSize: 31,
    color: "#B0E9CA",
  },
});

export { LogoText };
