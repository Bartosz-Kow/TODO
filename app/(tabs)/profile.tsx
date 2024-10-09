import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "expo-router";
import React, { useState, useCallback } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Avatar, RadioButton, IconButton } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";

const Profile = () => {
  const [name, setName] = useState<string | null>(null);
  const [addedTasksCount, setAddedTasksCount] = useState<number>(0);
  const [deletedTasksCount, setDeletedTasksCount] = useState<number>(0);
  const [categoryCounts, setCategoryCounts] = useState<{
    [key: string]: number;
  }>({});
  const [favoriteCategory, setFavoriteCategory] = useState<string>("");
  const [image, setImage] = useState<string | null>(null);
  const [valueBtn, setValueBtn] = useState("lightMode");

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

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>
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

      <Text style={styles.userName}>{name || "Your Name"}</Text>

      <View style={styles.statisticsContainer}>
        <View style={styles.clearBtnContainer}>
          <Text style={styles.statisticsTitle}>Statistics:</Text>
          <TouchableOpacity onPress={handleClearStatistics}>
            <Text style={styles.clearAllBtn}>Clear all</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.statisticItem}>
          <IconButton icon="check-circle" size={18} />
          <Text style={styles.statisticLabel}>
            Added Tasks:{" "}
            <Text style={styles.statisticValue}>{addedTasksCount}</Text>
          </Text>
        </View>

        <View style={styles.statisticItem}>
          <IconButton icon="delete-circle" size={18} />
          <Text style={styles.statisticLabel}>
            Deleted Tasks:{" "}
            <Text style={styles.statisticValue}>{deletedTasksCount}</Text>
          </Text>
        </View>

        <View style={styles.statisticItem}>
          <IconButton icon="star-circle" size={18} />
          <Text style={styles.statisticLabel}>
            Favourite category:{" "}
            <Text style={styles.statisticValue}>
              {favoriteCategory || "None"}
            </Text>
          </Text>
        </View>
      </View>

      <Text style={styles.modeTitle}>Choose your app mode:</Text>
      <View style={styles.radioButtonGroup}>
        <RadioButton.Group
          onValueChange={(newValueBtn) => setValueBtn(newValueBtn)}
          value={valueBtn}
        >
          <View style={styles.radioButtonContainer}>
            <RadioButton value="lightMode" color={"#66D1A6"} />
            <Text style={styles.radioButtonLabel}>Light mode</Text>
          </View>
          <View style={styles.radioButtonContainer}>
            <RadioButton value="darkMode" color={"#1F2937"} />
            <Text style={styles.radioButtonLabel}>Dark Mode</Text>
          </View>
        </RadioButton.Group>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
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
    backgroundColor: "#FFFFFF",
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
    backgroundColor: "#FFFFFF",
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
    backgroundColor: "#E9F5F0",
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
    color: "#333",
  },
  statisticValue: {
    fontWeight: "bold",
    color: "#333",
  },
  modeTitle: {
    fontSize: 16,
    marginVertical: 8,
    color: "#1F2937",
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
    color: "#333",
    fontWeight: "bold",
  },
});

export default Profile;
