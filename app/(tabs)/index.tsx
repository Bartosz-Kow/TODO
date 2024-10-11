import React, { useEffect, useState } from "react";
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "@/constants/ThemeContext";

const Home = () => {
  const { isDarkMode } = useTheme();
  const [isVisible, setVisible] = useState(false);
  const [isEditMode, setEditMode] = useState(false);
  const [note, setNote] = useState<string>("");
  const [tasks, setTasks] = useState<{ note: string; category: string }[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const [addedTasksCount, setAddedTasksCount] = useState<number>(0);
  const [deletedTasksCount, setDeletedTasksCount] = useState<number>(0);
  const [categoryCounts, setCategoryCounts] = useState<{
    [key: string]: number;
  }>({});

  const categories = [
    { name: "Important", color: "#FDE99D" },
    { name: "Shopping", color: "#B0E9CA" },
    { name: "Lecture notes", color: "#D9E8FC" },
    { name: "To-do lists", color: "#FFD8F4" },
  ];

  useEffect(() => {
    const loadStats = async () => {
      const addedTask = await AsyncStorage.getItem("@addedTaskCount");
      const deletedTask = await AsyncStorage.getItem("@deletedTaskCount");
      const savedCategoryCounts = await AsyncStorage.getItem("@categoryCounts");
      if (addedTask != null) setAddedTasksCount(parseInt(addedTask));
      if (deletedTask != null) setDeletedTasksCount(parseInt(deletedTask));
      if (savedCategoryCounts != null)
        setCategoryCounts(JSON.parse(savedCategoryCounts));
    };
    loadStats();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem("@categoryCounts", JSON.stringify(categoryCounts));
  }, [categoryCounts]);

  const handleUpdateNote = (newNote: string) => {
    setNote(newNote);
  };

  const handleAddTask = async () => {
    if (note.trim()) {
      if (isEditMode && editIndex !== null) {
        const updatedTasks = tasks.map((task, index) =>
          index === editIndex ? { note, category: selectedCategory } : task
        );
        setTasks(updatedTasks);
        setEditMode(false);
      } else {
        const newTask = { note, category: selectedCategory };
        setTasks([...tasks, newTask]);

        const newCount = addedTasksCount + 1;
        setAddedTasksCount(newCount);

        setCategoryCounts((prevCounts) => ({
          ...prevCounts,
          [selectedCategory]: (prevCounts[selectedCategory] || 0) + 1,
        }));

        await AsyncStorage.setItem("@addedTaskCount", newCount.toString());
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

  const removeTask = async (index: number) => {
    const taskToRemove = tasks[index];
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);

    const newCount = deletedTasksCount + 1;
    setDeletedTasksCount(newCount);

    if (taskToRemove.category in categoryCounts) {
      setCategoryCounts((prevCounts) => ({
        ...prevCounts,
        [taskToRemove.category]: prevCounts[taskToRemove.category] - 1,
      }));
    }

    await AsyncStorage.setItem("@deletedTaskCount", newCount.toString());
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
      <SafeAreaView
        style={[
          styles.container,
          { backgroundColor: isDarkMode ? "#1F2937" : "#F8F9FA" },
        ]}
      >
        <StatusBar
          barStyle={isDarkMode ? "light-content" : "dark-content"}
          backgroundColor={isDarkMode ? "#1F2937" : "#F8F9FA"}
        />
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
                style={[
                  styles.searchBar,
                  { backgroundColor: isDarkMode ? "#2D3E50" : "white" },
                ]}
                placeholder="Search for notes"
                value={searchQuery}
                onChangeText={(query) => setSearchQuery(query)}
                iconColor={isDarkMode ? "white" : "black"}
                placeholderTextColor={isDarkMode ? "white" : "black"}
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
                style={[
                  styles.fab,
                  { backgroundColor: isDarkMode ? "#66D1A6" : "#1F2937" },
                ]}
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
  },
  searchBar: {
    width: "95%",
    borderRadius: 12,
    borderWidth: 1,
  },
});

export default Home;
