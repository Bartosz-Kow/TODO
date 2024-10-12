import React, { useCallback, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { IconButton, ActivityIndicator } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  setAddedCount,
  getAddedCount,
  setDeletedCount,
  getDeletedCount,
} from "@/components/storage/userStatistics";
import { useTheme } from "@/constants/ThemeContext";
import { useFocusEffect } from "expo-router";
import * as Updates from "expo-updates";
import { useLoadFonts } from "@/hooks/useLoadFonts";

const Statistics = () => {
  const { isDarkMode } = useTheme();
  const [addedTasksCount, setAddedTasksCount] = useState<number>(0);
  const [deletedTasksCount, setDeletedTasksCount] = useState<number>(0);
  const [favoriteCategory, setFavoriteCategory] = useState<string>("");
  const fontsLoaded = useLoadFonts();

  const loadStats = async () => {
    try {
      const addedTask = await getAddedCount();
      const deletedTask = await getDeletedCount();
      const savedCategoryCounts = await AsyncStorage.getItem("@categoryCounts");

      setAddedTasksCount(addedTask);
      setDeletedTasksCount(deletedTask);

      if (savedCategoryCounts != null) {
        const counts = JSON.parse(savedCategoryCounts);
        const favorite = Object.keys(counts).reduce((a, b) =>
          counts[a] > counts[b] ? a : b
        );
        setFavoriteCategory(favorite);
      }
    } catch (e) {
      console.log("Error loading stats", e);
    }
  };

  const handleClearStatistics = async () => {
    try {
      await setAddedCount(0);
      await setDeletedCount(0);
      await AsyncStorage.removeItem("@categoryCounts");

      setAddedTasksCount(0);
      setDeletedTasksCount(0);
      setFavoriteCategory("");

      await loadStats();

      await Updates.reloadAsync();
    } catch (e) {
      console.log("Error clearing statistics", e);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadStats();
    }, [])
  );

  if (!fontsLoaded) {
    return null;
  }

  return (
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
            {
              color: isDarkMode ? "white" : "#1F2937",
              fontFamily: fontsLoaded ? "Montserrat-Bold" : "System",
            },
          ]}
        >
          Statistics:
        </Text>
        <TouchableOpacity onPress={handleClearStatistics}>
          <Text
            style={[
              styles.clearAllBtn,
              { fontFamily: fontsLoaded ? "Montserrat-Bold" : "System" },
            ]}
          >
            Clear all
          </Text>
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
            {
              color: isDarkMode ? "#F8F9FA" : "#555",
              fontFamily: fontsLoaded ? "Roboto-Regular" : "System",
            },
          ]}
        >
          Added Tasks: {addedTasksCount}
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
            {
              color: isDarkMode ? "#F8F9FA" : "#555",
              fontFamily: fontsLoaded ? "Roboto-Regular" : "System",
            },
          ]}
        >
          Deleted Tasks: {deletedTasksCount}
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
            {
              color: isDarkMode ? "white" : "#333",
            },
          ]}
        >
          Favourite category: {favoriteCategory || "None"}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
    fontWeight: "bold",
  },
  statisticsTitle: {
    fontSize: 20,
    color: "#1F2937",
    marginBottom: 5,
  },
});

export default Statistics;
