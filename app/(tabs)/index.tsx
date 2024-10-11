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
import {
  FAB,
  Searchbar,
  PaperProvider,
  ActivityIndicator,
} from "react-native-paper";
import { LogoText } from "@/components/Texts/text";
import CategoryChips from "@/components/HomeComponents/CategoryChips";
import TaskList from "@/components/HomeComponents/TaskList";
import NoteModal from "@/components/HomeComponents/NoteModal";
import {
  setUserTask,
  getUserTask,
  getThemeMode,
} from "@/components/storage/userPreferences";
import {
  setAddedCount,
  getAddedCount,
  setDeletedCount,
  getDeletedCount,
} from "@/components/storage/userStatistics";
import { useTheme } from "@/constants/ThemeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Home = () => {
  const { isDarkMode, setIsDarkMode } = useTheme();
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
  const [loading, setLoading] = useState<boolean>(true);
  const [valueBtn, setValueBtn] = useState(
    isDarkMode ? "darkMode" : "lightMode"
  );
  const categories = [
    { name: "Important", color: "#FDE99D" },
    { name: "Shopping", color: "#B0E9CA" },
    { name: "Lecture notes", color: "#D9E8FC" },
    { name: "To-do lists", color: "#FFD8F4" },
  ];

  useEffect(() => {
    const loadTasksAndThemeMode = async () => {
      try {
        setLoading(true);

        const storedTasks = await getUserTask();
        const addedTask = await getAddedCount();
        const deletedTask = await getDeletedCount();
        const savedCategoryCounts = await AsyncStorage.getItem(
          "@categoryCounts"
        );

        if (storedTasks != null) {
          setTasks(storedTasks);
        }
        setAddedTasksCount(addedTask);
        setDeletedTasksCount(deletedTask);
        if (savedCategoryCounts != null) {
          setCategoryCounts(JSON.parse(savedCategoryCounts));
        }

        const savedThemeMode = await getThemeMode();
        console.log("Loaded theme mode:", savedThemeMode);
        if (savedThemeMode === "darkMode") {
          setIsDarkMode(true);
          setValueBtn("darkMode");
        } else {
          setIsDarkMode(false);
          setValueBtn("lightMode");
        }
      } catch (error) {
        console.error("Error loading tasks or theme mode:", error);
      } finally {
        setLoading(false);
      }
    };

    loadTasksAndThemeMode();
  }, []);

  useEffect(() => {
    setUserTask(tasks);
  }, [tasks]);

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
        await setAddedCount(newCount);

        setCategoryCounts((prevCounts) => ({
          ...prevCounts,
          [selectedCategory]: (prevCounts[selectedCategory] || 0) + 1,
        }));
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
    await setDeletedCount(newCount);

    if (taskToRemove.category in categoryCounts) {
      setCategoryCounts((prevCounts) => ({
        ...prevCounts,
        [taskToRemove.category]: prevCounts[taskToRemove.category] - 1,
      }));
    }
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

              {loading ? (
                <ActivityIndicator
                  size="large"
                  color={isDarkMode ? "white" : "black"}
                  style={styles.loadingIndicator}
                />
              ) : (
                <TaskList
                  tasks={tasks}
                  editTask={editTask}
                  categories={categories}
                  selectedCategory={selectedCategory}
                  searchQuery={searchQuery}
                />
              )}

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
  loadingIndicator: {
    marginTop: 20,
  },
});

export default Home;
