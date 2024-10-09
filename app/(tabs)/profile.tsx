import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "expo-router";
import React, { useState, useCallback } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Avatar, RadioButton, IconButton } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { useTheme } from "@/constants/ThemeContext";

const Profile = () => {
  const { isDarkMode, setIsDarkMode } = useTheme();
  const [name, setName] = useState<string | null>(null);
  const [addedTasksCount, setAddedTasksCount] = useState<number>(0);
  const [deletedTasksCount, setDeletedTasksCount] = useState<number>(0);
  const [categoryCounts, setCategoryCounts] = useState<{
    [key: string]: number;
  }>({});
  const [favoriteCategory, setFavoriteCategory] = useState<string>("");
  const [image, setImage] = useState<string | null>(null);
  const [valueBtn, setValueBtn] = useState(
    isDarkMode ? "darkMode" : "lightMode"
  );

  const handleClearStatistics = async () => {
    try {
      await AsyncStorage.removeItem("@addedTaskCount");
      await AsyncStorage.removeItem("@deletedTaskCount");
      await AsyncStorage.removeItem("@categoryCounts");

      setAddedTasksCount(0);
      setDeletedTasksCount(0);
      setCategoryCounts({});
      setFavoriteCategory("");

      await loadStats();

      console.log("Statistics Cleared!");
    } catch (e) {
      console.log("Error:", e);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const selectedImageUri = result.assets[0].uri;
      setImage(selectedImageUri);
      await AsyncStorage.setItem("@userImage", selectedImageUri);
    }
  };

  const readName = async () => {
    try {
      const value = await AsyncStorage.getItem("@storage_Key");
      if (value !== null) {
        setName(value);
      }
    } catch (e) {
      console.log("Error reading data", e);
    }
  };

  const loadStats = async () => {
    try {
      const addedTask = await AsyncStorage.getItem("@addedTaskCount");
      const deletedTask = await AsyncStorage.getItem("@deletedTaskCount");
      const savedCategoryCounts = await AsyncStorage.getItem("@categoryCounts");

      if (addedTask != null) setAddedTasksCount(parseInt(addedTask));
      if (deletedTask != null) setDeletedTasksCount(parseInt(deletedTask));
      if (savedCategoryCounts != null) {
        const counts = JSON.parse(savedCategoryCounts);
        setCategoryCounts(counts);

        const favorite = Object.keys(counts).reduce((a, b) =>
          counts[a] > counts[b] ? a : b
        );
        setFavoriteCategory(favorite);
      }
    } catch (e) {
      console.log("Error loading stats", e);
    }
  };

  const loadImage = async () => {
    try {
      const storedImage = await AsyncStorage.getItem("@userImage");
      if (storedImage !== null) {
        setImage(storedImage);
      }
    } catch (e) {
      console.log("Error loading image", e);
    }
  };

  useFocusEffect(
    useCallback(() => {
      readName();
      loadStats();
      loadImage();
    }, [])
  );

  const handleChangeMode = (newValue: string) => {
    setValueBtn(newValue);
    setIsDarkMode(newValue === "darkMode");
  };

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

      <TouchableOpacity onPress={pickImage}>
        {image ? (
          <Avatar.Image
            size={80}
            source={{ uri: image }}
            style={styles.avatar}
          />
        ) : (
          <Avatar.Icon size={80} icon="account" style={styles.avatar} />
        )}
      </TouchableOpacity>

      <Text
        style={[styles.userName, { color: isDarkMode ? "#F8F9FA" : "#555" }]}
      >
        {name || "Your Name"}
      </Text>

      <View
        style={[
          styles.statisticsContainer,
          { backgroundColor: isDarkMode ? "#66D1A6" : "white" },
        ]}
      >
        <View
          style={[
            styles.clearBtnContainer,
            { backgroundColor: isDarkMode ? "#2D3E50" : "white" },
          ]}
        >
          <Text
            style={[
              styles.statisticsTitle,
              { color: isDarkMode ? "white" : "#1F2937" },
            ]}
          >
            Statistics:
          </Text>
          <TouchableOpacity onPress={handleClearStatistics}>
            <Text style={styles.clearAllBtn}>Clear all</Text>
          </TouchableOpacity>
        </View>
        <View
          style={[
            styles.statisticItem,
            { backgroundColor: isDarkMode ? "#2D3E50" : "#E9F5F0" },
          ]}
        >
          <IconButton
            icon="check-circle"
            size={18}
            iconColor={isDarkMode ? "#66D1A6" : "#333"}
          />
          <Text
            style={[
              styles.statisticLabel,
              { color: isDarkMode ? "#F8F9FA" : "#555" },
            ]}
          >
            Added Tasks:{" "}
            <Text
              style={[
                styles.statisticLabel,
                { color: isDarkMode ? "#F8F9FA" : "#555" },
              ]}
            >
              {addedTasksCount}
            </Text>
          </Text>
        </View>

        <View
          style={[
            styles.statisticItem,
            { backgroundColor: isDarkMode ? "#2D3E50" : "#E9F5F0" },
          ]}
        >
          <IconButton
            icon="delete-circle"
            size={18}
            iconColor={isDarkMode ? "#66D1A6" : "#333"}
          />
          <Text
            style={[
              styles.statisticLabel,
              { color: isDarkMode ? "#F8F9FA" : "#555" },
            ]}
          >
            Deleted Tasks:{" "}
            <Text
              style={[
                styles.statisticLabel,
                { color: isDarkMode ? "white" : "#333" },
              ]}
            >
              {deletedTasksCount}
            </Text>
          </Text>
        </View>

        <View
          style={[
            styles.statisticItem,
            { backgroundColor: isDarkMode ? "#2D3E50" : "#E9F5F0" },
          ]}
        >
          <IconButton
            icon="star-circle"
            size={18}
            iconColor={isDarkMode ? "#66D1A6" : "#333"}
          />
          <Text
            style={[
              styles.statisticLabel,
              { color: isDarkMode ? "white" : "#333" },
            ]}
          >
            Favourite category:{" "}
            <Text
              style={[
                styles.statisticLabel,
                { color: isDarkMode ? "white" : "#333" },
              ]}
            >
              {favoriteCategory || "None"}
            </Text>
          </Text>
        </View>
      </View>

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
  clearBtnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  clearAllBtn: {
    fontSize: 14,
    color: "#66D1A6",
    fontWeight: "bold",
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
  avatar: {
    backgroundColor: "#66D1A6",
    marginVertical: 10,
    borderRadius: 40,
  },
  statisticsContainer: {
    marginVertical: 15,
    alignItems: "flex-start",
    width: "100%",
    paddingHorizontal: 5,
    paddingVertical: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  statisticsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 5,
  },
  statisticItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 3,
    paddingVertical: 5,
    borderRadius: 6,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  statisticLabel: {
    fontSize: 14,
    marginLeft: 5,
  },
  statisticValue: {
    fontWeight: "bold",
  },
  modeTitle: {
    fontSize: 16,
    marginVertical: 8,
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
    marginVertical: 3,
    width: "100%",
  },
  radioButtonLabel: {
    fontSize: 14,
    marginLeft: 5,
    fontWeight: "bold",
  },
});

export default Profile;
