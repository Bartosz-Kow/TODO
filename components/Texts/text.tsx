import React from "react";
import { Text, StyleSheet } from "react-native";

const LogoText = () => {
  return (
    <Text style={styles.logo}>
      DO I<Text style={styles.logoLetter}>T</Text>
      <Text style={styles.logo}> .</Text>
    </Text>
  );
};

const styles = StyleSheet.create({
  logo: {
    fontSize: 31,
    color: "#1F2937",
    fontWeight: "bold",
  },
  logoLetter: {
    fontSize: 31,
    color: "#66D1A6",
  },
});

export { LogoText };
