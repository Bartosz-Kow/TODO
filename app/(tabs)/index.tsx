import React, { useState } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  StatusBar,
} from "react-native";
import { FAB, Searchbar, PaperProvider } from "react-native-paper";
import { LogoText } from "@/components/Texts/text";
import CategoryChips from "@/components/HomeComponents/CategoryChips";
import TaskList from "@/components/HomeComponents/TaskList";
import NoteModal from "@/components/HomeComponents/NoteModal";
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

  const removeTask = (index: number) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const editTask = (index: number) => {
    setEditMode(true);
    setEditIndex(index);
    const taskToEdit = tasks[index];
    setNote(taskToEdit.note);
    setSelectedCategory(taskToEdit.category);
    showModal();
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
                iconColor={"black"}
                placeholderTextColor={"black"}
              />
              <CategoryChips
                categories={categories}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                setSearchQuery={setSearchQuery}
              />

              <TaskList
                tasks={tasks}
                editTask={editTask}
                categories={categories}
                selectedCategory={selectedCategory}
                searchQuery={searchQuery}
              />

              <FAB
                icon="plus"
                color="white"
                style={styles.fab}
                onPress={showModal}
              />
              <NoteModal
                visible={isVisible}
                hideModal={hideModal}
                note={note}
                setNote={handleUpdateNote}
                categories={categories}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                isEditMode={isEditMode}
                handleAddTask={handleAddTask}
                editIndex={editIndex}
                removeTask={removeTask}
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

  fab: {
    position: "absolute",
    right: 20,
    bottom: 100,
    backgroundColor: "#1F2937",
  },
  searchBar: {
    width: "95%",
    borderRadius: 12,
    backgroundColor: "white",
    borderWidth: 1,
  },
});

export default Home;
