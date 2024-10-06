import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Avatar, RadioButton, IconButton } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Profile = () => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>
          Welcome <Text style={styles.boldText}>Bartosz!</Text> Now you can see
          your stats and edit profile details!
        </Text>
      </View>

      <TouchableOpacity>
        <Avatar.Icon size={100} icon="account" style={styles.avatar} />
      </TouchableOpacity>

      <Text style={styles.userName}>Bartosz</Text>

      <View style={styles.statisticsContainer}>
        <Text style={styles.statisticsTitle}>Statistics:</Text>
        <View style={styles.statisticItem}>
          <IconButton icon="check-circle" size={20} />
          <Text style={styles.statisticLabel}>
            Added Tasks: <Text style={styles.statisticValue}>140</Text>
          </Text>
        </View>
        <View style={styles.statisticItem}>
          <IconButton icon="delete-circle" size={20} />
          <Text style={styles.statisticLabel}>
            Deleted Tasks: <Text style={styles.statisticValue}>140</Text>
          </Text>
        </View>
        <View style={styles.statisticItem}>
          <IconButton icon="star-circle" size={20} />
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
    padding: 20,
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
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
    color: "#333",
  },
  titleContainer: {
    marginBottom: 15,
    alignItems: "center",
  },
  title: {
    fontSize: 28,
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
    marginVertical: 15,
  },
  statisticsContainer: {
    marginVertical: 20,
    alignItems: "flex-start",
    width: "100%",
    paddingHorizontal: 10,
    borderLeftWidth: 4,
    borderLeftColor: "#66D1A6",
  },
  statisticsTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 10,
  },
  statisticItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
    paddingVertical: 5,
    borderRadius: 6,
    backgroundColor: "#E9F5F0",
    width: "100%",
  },
  statisticLabel: {
    fontSize: 16,
    marginLeft: 8,
    color: "#333",
  },
  statisticValue: {
    fontWeight: "bold",
    color: "#333",
  },
  icon: {},
  modeTitle: {
    fontSize: 18,
    marginVertical: 10,
    color: "#1F2937",
    fontWeight: "bold",
  },
  radioButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
    width: "100%",
  },
  radioButtonLabel: {
    fontSize: 16,
    marginLeft: 8,
    color: "#333",
  },
});

export default Profile;
