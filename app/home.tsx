import React from "react";
import { StyleSheet, View } from "react-native";
import { FAB } from "react-native-paper";

const Home = () => {
  return (
    <View>
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => console.log("Pressed")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default Home;
