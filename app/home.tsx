import React, { useState } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
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
  const [isEditMode, setEditMode] = useState(false);
  const [note, setNote] = useState<string>("");
  const [tasks, setTasks] = useState<string[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const handleUpdateNote = (newNote: string) => {
    setNote(newNote);
  };

  const handleAddTask = () => {
    if (note.trim()) {
      if (isEditMode && editIndex !== null) {
        const updatedTasks = tasks.map((task, index) =>
          index === editIndex ? note : task
        );
        setTasks(updatedTasks);
        setEditMode(false);
      } else {
        setTasks([...tasks, note]);
      }
      setNote("");
    }
  };

  const showModal = () => setVisible(true);
  const hideModal = () => {
    setVisible(false);
    setEditMode(false);
    setEditIndex(null);
  };

  const editTask = (index: number) => {
    setEditMode(true);
    setEditIndex(index);
    setNote(tasks[index]);
    showModal();
  };

  const renderTask = ({ item, index }: { item: string; index: number }) => {
    return (
      <TouchableOpacity onPress={() => editTask(index)}>
        <View style={styles.taskItem}>
          <Text style={styles.taskText}>{item}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <PaperProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.innerContainer}>
          <View style={styles.logo}>
            <LogoText />
          </View>
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
                value={note}
                onChangeText={handleUpdateNote}
                theme={{
                  colors: {
                    primary: "#66D1A6",
                    placeholder: "black",
                  },
                }}
              />
              <Button textColor="#66D1A6" onPress={handleAddTask}>
                {isEditMode ? "Update" : "Apply"}
              </Button>
              <Button textColor="#1F2937" onPress={hideModal}>
                Cancel
              </Button>
            </Modal>
          </Portal>

          <FlatList
            data={tasks}
            renderItem={renderTask}
            keyExtractor={(item, index) => index.toString()}
          />

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
  logo: {
    marginBottom: 10,
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
  taskItem: {
    padding: 15,
    borderRadius: 8,
    backgroundColor: "#F1F1F1",
    marginVertical: 5,
  },
  taskText: {
    fontSize: 16,
    color: "#333",
  },
});

export default Home;
