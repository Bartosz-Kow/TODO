import React, { useState } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  Text,
  Button,
} from "react-native";
import {
  FAB,
  Searchbar,
  Chip,
  Portal,
  Modal,
  PaperProvider,
} from "react-native-paper";
import { LogoText } from "@/components/Texts/text";

const Home = () => {
  const [isVisible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  return (
    <PaperProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.innerContainer}>
          <LogoText />
          <Searchbar
            style={styles.searchBar}
            placeholder="Search for notes"
            value={""}
          />

          <View style={styles.chipContainer}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <Chip
                style={styles.chipAll}
                mode="outlined"
                onPress={() => console.log("Pressed")}
                textStyle={{ color: "white" }}
              >
                All
              </Chip>
              <Chip
                style={styles.chip}
                mode="outlined"
                onPress={() => console.log("Pressed")}
                textStyle={{ color: "black" }}
              >
                Important
              </Chip>
              <Chip
                style={styles.chip}
                mode="outlined"
                onPress={() => console.log("Pressed")}
                textStyle={{ color: "black" }}
              >
                Shopping
              </Chip>
              <Chip
                style={styles.chip}
                mode="outlined"
                onPress={() => console.log("Pressed")}
                textStyle={{ color: "black" }}
              >
                Lecture notes
              </Chip>
              <Chip
                style={styles.chip}
                mode="outlined"
                onPress={() => console.log("Pressed")}
                textStyle={{ color: "black" }}
              >
                To-do lists
              </Chip>
            </ScrollView>
          </View>

          <Portal>
            <Modal visible={isVisible} onDismiss={hideModal}>
              <View style={styles.modalContent}>
                <Text style={styles.modalText}>
                  This is your modal content!
                </Text>
              </View>
            </Modal>
          </Portal>

          {/* Floating Action Button */}
          <FAB
            icon="plus"
            color="white"
            style={styles.fab}
            onPress={showModal}
          />
        </View>
      </SafeAreaView>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 40,
  },
  innerContainer: {
    flex: 1,
    alignItems: "center",
    width: "100%",
  },
  chipContainer: {
    flexDirection: "row",
    marginTop: 15,
    marginLeft: 15,
  },
  fab: {
    position: "absolute",
    right: 20,
    bottom: 20,
    backgroundColor: "#1F2937",
  },
  chip: {
    marginHorizontal: 10,
  },
  chipAll: {
    marginHorizontal: 10,
    backgroundColor: "#1F2937",
  },
  searchBar: {
    width: "95%",
    borderRadius: 12,
    backgroundColor: "white",
    borderWidth: 0.5,
  },
  modalContent: {
    padding: 20,
    alignItems: "center",
    backgroundColor: "white",
  },
  modalText: {
    marginBottom: 20,
    fontSize: 18,
  },
});

export default Home;
