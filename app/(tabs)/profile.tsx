import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Avatar, RadioButton, IconButton } from "react-native-paper";

const Profile = () => {
  const [name, setName] = useState<string | null>(null);

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

  useEffect(() => {
    readName();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>
          Welcome <Text style={styles.boldText}>{name || "Bartosz"}!</Text> Now
          you can see your stats and edit profile details!
        </Text>
      </View>

      <TouchableOpacity>
        <Avatar.Icon size={80} icon="account" style={styles.avatar} />
      </TouchableOpacity>

      <Text style={styles.userName}>{name || "Your Name"}</Text>

      <View style={styles.statisticsContainer}>
        <Text style={styles.statisticsTitle}>Statistics:</Text>
        <View style={styles.statisticItem}>
          <IconButton icon="check-circle" size={18} />
          <Text style={styles.statisticLabel}>
            Added Tasks: <Text style={styles.statisticValue}>140</Text>
          </Text>
        </View>
        <View style={styles.statisticItem}>
          <IconButton icon="delete-circle" size={18} />
          <Text style={styles.statisticLabel}>
            Deleted Tasks: <Text style={styles.statisticValue}>140</Text>
          </Text>
        </View>
        <View style={styles.statisticItem}>
          <IconButton icon="star-circle" size={18} />
          <Text style={styles.statisticLabel}>
            Favourite category:{" "}
            <Text style={styles.statisticValue}>Important</Text>
          </Text>
        </View>
      </View>

      <Text style={styles.modeTitle}>Choose your app mode:</Text>
      <View style={styles.radioButtonContainer}>
        <RadioButton value="lightMode" />
        <Text style={styles.radioButtonLabel}>Light mode</Text>
      </View>
      <View style={styles.radioButtonContainer}>
        <RadioButton value="darkMode" />
        <Text style={styles.radioButtonLabel}>Dark Mode</Text>
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
  },
  statisticsContainer: {
    marginVertical: 15,
    alignItems: "flex-start",
    width: "100%",
    paddingHorizontal: 5,
    borderLeftWidth: 4,
    borderLeftColor: "#66D1A6",
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
    paddingVertical: 3,
    borderRadius: 6,
    backgroundColor: "#E9F5F0",
    width: "100%",
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
  },
});

export default Profile;
