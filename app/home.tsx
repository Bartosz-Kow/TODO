import React, { useState } from "react";
import { StyleSheet, View, SafeAreaView, ScrollView, Text } from "react-native";
import {
  FAB,
  Searchbar,
  Chip,
  Portal,
  Modal,
  PaperProvider,
  TextInput,
  Button,
} from "react-native-paper";
import { LogoText } from "@/components/Texts/text";

const Home = () => {
  const [isVisible, setVisible] = useState(false);
  const [note, setNote] = useState("");

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
            <Modal
              visible={isVisible}
              onDismiss={hideModal}
              contentContainerStyle={styles.modalContent}
            >
              <TextInput
                label="Write notes!"
                multiline
                style={styles.textInput}
                textColor="black"
                cursorColor="#66D1A6"
                theme={{
                  colors: {
                    primary: "#66D1A6",
                    placeholder: "black",
                  },
                }}
              />
              <Button textColor="#66D1A6">Apply</Button>
              <Button textColor="#1F2937" onPress={hideModal}>
                Cancel
              </Button>
            </Modal>
          </Portal>

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
    backgroundColor: "white",
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
    backgroundColor: "white",
    borderRadius: 20,
    width: "90%",
    alignSelf: "center",
    position: "absolute",
    bottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  textInput: {
    width: "100%",
    height: 250,
    backgroundColor: "#F9FAFB",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    color: "#374151",
  },
});

export default Home;
