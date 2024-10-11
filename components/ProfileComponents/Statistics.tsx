// Statistics.tsx
import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { IconButton } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  setAddedCount,
  getAddedCount,
  setDeletedCount,
  getDeletedCount,
} from "@/components/storage/userStatistics";
import { useTheme } from "@/constants/ThemeContext";
import { useFocusEffect } from "expo-router";

const Statistics = () => {
  const { isDarkMode } = useTheme();
  const [addedTasksCount, setAddedTasksCount] = useState<number>(0);
  const [deletedTasksCount, setDeletedTasksCount] = useState<number>(0);
  const [favoriteCategory, setFavoriteCategory] = useState<string>("");

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
    } catch (e) {
      console.log("Error clearing statistics", e);
    }
  };
  useFocusEffect(
    useCallback(() => {
      loadStats();
    }, [])
  );

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
    fontWeight: "bold",
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
  statisticsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 5,
  },
});

export default Statistics;
