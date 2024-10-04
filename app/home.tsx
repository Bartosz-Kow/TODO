import React, { useState } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  Text,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  StatusBar,
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
  const [tasks, setTasks] = useState<{ note: string; category: string }[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = [
    { name: "Important", color: "#FDE99D" },
    { name: "Shopping", color: "#B0E9CA" },
    { name: "Lecture notes", color: "#D9E8FC" },
    { name: "To-do lists", color: "#FFD8F4" },
  ];

  const handleUpdateNote = (newNote: string) => {
    setNote(newNote);
  };

  const handleAddTask = () => {
    if (note.trim()) {
      if (isEditMode && editIndex !== null) {
        const updatedTasks = tasks.map((task, index) =>
          index === editIndex ? { note, category: selectedCategory } : task
        );
        setTasks(updatedTasks);
        setEditMode(false);
      } else {
        setTasks([...tasks, { note, category: selectedCategory }]);
      }

      setNote("");
      setSelectedCategory("All");
      setVisible(false);
    }
  };

  const showModal = () => {
    setVisible(true);
    setSelectedCategory("Important");
  };
  const hideModal = () => {
    setVisible(false);
    setEditMode(false);
    setEditIndex(null);
    setNote("");
    setSelectedCategory("All");
  };

  const editTask = (index: number) => {
    setEditMode(true);
    setEditIndex(index);
    const taskToEdit = tasks[index];
    setNote(taskToEdit.note);
    setSelectedCategory(taskToEdit.category);
    showModal();
  };

  const renderTask = ({
    item,
    index,
  }: {
    item: { note: string; category: string };
    index: number;
  }) => {
    const categoryColor =
      categories.find((cat) => cat.name === item.category)?.color || "#FDE99D"; // Domyślny kolor to "Important"

    return (
      <View style={[styles.taskItem, { backgroundColor: categoryColor }]}>
        <TouchableOpacity onPress={() => editTask(index)}>
          <Text style={styles.taskText} numberOfLines={12}>
            {item.note}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <PaperProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#1F2937" />
        <KeyboardAvoidingView
          style={styles.innerContainer}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.select({
            ios: 40,
            android: 0,
          })}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.innerContainer}>
              <View style={styles.logo}>
                <LogoText />
              </View>
              <Searchbar
                style={styles.searchBar}
                placeholder="Search for notes"
                value={searchQuery}
                onChangeText={(query) => setSearchQuery(query)}
              />

              <View style={styles.chipContainer}>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                >
                  <Chip
                    style={[
                      styles.chip,
                      selectedCategory === "All" && styles.selectedChip,
                      {
                        backgroundColor:
                          selectedCategory === "All" ? "#66D1A6" : "white",
                      }, // Ustaw kolor dla chipu "All"
                    ]}
                    mode="outlined"
                    onPress={() => {
                      setSelectedCategory("All");
                      setSearchQuery(""); // Resetuj wyszukiwanie
                    }}
                    textStyle={{
                      color: selectedCategory === "All" ? "white" : "black",
                    }}
                  >
                    All
                  </Chip>
                  {categories.map((category) => (
                    <Chip
                      key={category.name}
                      style={[
                        styles.chip,
                        selectedCategory === category.name &&
                          styles.selectedChip,
                        {
                          backgroundColor:
                            selectedCategory === category.name
                              ? category.color
                              : "white",
                        }, // Ustaw kolor chipu
                      ]}
                      mode="outlined"
                      onPress={() => {
                        setSelectedCategory(category.name);
                        setSearchQuery(""); // Resetuj wyszukiwanie
                      }}
                      textStyle={{
                        color:
                          selectedCategory === category.name
                            ? "white"
                            : "black",
                      }}
                    >
                      {category.name}
                    </Chip>
                  ))}
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
                  <View style={styles.modalCategoryContainer}>
                    <Text style={styles.modalCategoryTitle}>
                      Select category:
                    </Text>
                    <ScrollView
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}
                    >
                      {categories.map((category) => (
                        <Chip
                          key={category.name}
                          style={[
                            styles.chip,
                            selectedCategory === category.name &&
                              styles.selectedChip,
                          ]}
                          mode="outlined"
                          onPress={() => setSelectedCategory(category.name)}
                          textStyle={{
                            color:
                              selectedCategory === category.name
                                ? "white"
                                : "black",
                          }}
                        >
                          {category.name}
                        </Chip>
                      ))}
                    </ScrollView>
                  </View>
                  <Button textColor="#66D1A6" onPress={handleAddTask}>
                    {isEditMode ? "Update" : "Apply"}
                  </Button>
                  <Button textColor="#1F2937" onPress={hideModal}>
                    Cancel
                  </Button>
                </Modal>
              </Portal>

              <FlatList
                data={tasks.filter(
                  (task) =>
                    (selectedCategory === "All" ||
                      task.category === selectedCategory) && // Filtruj po kategorii
                    task.note.toLowerCase().includes(searchQuery.toLowerCase())
                )}
                renderItem={renderTask}
                keyExtractor={(item, index) => index.toString()}
                numColumns={2}
                showsVerticalScrollIndicator={false}
              />

              <FAB
                icon="plus"
                color="white"
                style={styles.fab}
                onPress={showModal}
              />
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
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
    marginBottom: 15,
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
    flex: 1,
    flexBasis: "48%",
    marginHorizontal: 1,
    marginVertical: 8,
    borderRadius: 20,
    padding: 15,
  },
  taskText: {
    fontSize: 16,
    color: "#333",
  },
  modalCategoryContainer: {
    marginVertical: 20,
  },
  modalCategoryTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  selectedChip: {
    backgroundColor: "#66D1A6",
  },
});

export default Home;
