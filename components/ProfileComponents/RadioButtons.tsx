import { useTheme } from "@/constants/ThemeContext";
import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { RadioButton } from "react-native-paper";
import { setThemeMode } from "../storage/userPreferences";

const RadioButtons = () => {
  const { isDarkMode, setIsDarkMode } = useTheme();
  const [valueBtn, setValueBtn] = useState(
    isDarkMode ? "darkMode" : "lightMode"
  );

  const handleChangeMode = async (newValue: string) => {
    setValueBtn(newValue);
    const isDarkMode = newValue === "darkMode";
    setIsDarkMode(isDarkMode);
    await setThemeMode(isDarkMode);
  };
  return (
    <View>
      <Text
        style={[styles.modeTitle, { color: isDarkMode ? "#F8F9FA" : "#555" }]}
      >
        Choose your app mode:
      </Text>
      <View style={styles.radioButtonGroup}>
        <RadioButton.Group onValueChange={handleChangeMode} value={valueBtn}>
          <View style={styles.radioButtonContainer}>
            <RadioButton value="lightMode" color={"#66D1A6"} />
            <Text
              style={[
                styles.radioButtonLabel,
                { color: isDarkMode ? "#F8F9FA" : "#555" },
              ]}
            >
              Light mode
            </Text>
          </View>
          <View style={styles.radioButtonContainer}>
            <RadioButton value="darkMode" />
            <Text
              style={[
                styles.radioButtonLabel,
                { color: isDarkMode ? "#F8F9FA" : "#555" },
              ]}
            >
              Dark Mode
            </Text>
          </View>
        </RadioButton.Group>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modeTitle: {
    fontSize: 16,
    marginVertical: 1,
    fontWeight: "bold",
  },
  radioButtonGroup: {
    flexDirection: "row",
    justifyContent: "flex-start",
    width: "100%",
    marginVertical: 5,
  },
  radioButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 1,
    width: "100%",
  },
  radioButtonLabel: {
    fontSize: 14,
    marginLeft: 5,
    fontWeight: "bold",
  },
});

export default RadioButtons;
