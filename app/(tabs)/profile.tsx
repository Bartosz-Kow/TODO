import { useFocusEffect } from "expo-router";
import React, { useState, useCallback, Children } from "react";
import { StyleSheet, View, Text } from "react-native";
import { useTheme } from "@/constants/ThemeContext";
import {
  getUserName,
  getThemeMode,
} from "@/components/storage/userPreferences";

import AvatarPicker from "@/components/ProfileComponents/AvatarPicker";
import Statistics from "@/components/ProfileComponents/Statistics";
import RadioButtons from "@/components/ProfileComponents/RadioButtons";

const Profile = () => {
  const { isDarkMode, setIsDarkMode } = useTheme();
  const [name, setName] = useState<string | null>(null);
  const [valueBtn, setValueBtn] = useState(
    isDarkMode ? "darkMode" : "lightMode"
  );

  const readName = async () => {
    try {
      const userName = await getUserName();
      if (userName !== null) {
        setName(userName);
      }
    } catch (e) {
      console.log("Error reading data", e);
    }
  };

  useFocusEffect(
    useCallback(() => {
      readName();
      const loadThemeMode = async () => {
        const savedThemeMode = await getThemeMode();

        if (savedThemeMode === "darkMode") {
          setIsDarkMode(true);
          setValueBtn("darkMode");
        } else {
          setIsDarkMode(false);
          setValueBtn("lightMode");
        }
      };
      loadThemeMode();
    }, [])
  );

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? "#1F2937" : "#F8F9FA" },
      ]}
    >
      <View style={styles.titleContainer}>
        <Text
          style={[styles.title, { color: isDarkMode ? "#F8F9FA" : "#555" }]}
        >
          Welcome <Text style={styles.boldText}>{name || "User"}</Text>!{" "}
          Customize your profile!
        </Text>
      </View>

      <AvatarPicker />

      <Text
        style={[styles.userName, { color: isDarkMode ? "#F8F9FA" : "#555" }]}
      >
        {name || "Your Name"}
      </Text>

      <Statistics />
      <RadioButtons />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  userName: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 5,
    color: "#333",
  },
  titleContainer: {
    marginBottom: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    color: "#555",
    fontWeight: "600",
  },
  boldText: {
    color: "#66D1A6",
    fontWeight: "bold",
  },
});

export default Profile;
