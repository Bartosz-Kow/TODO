import React from "react";
import { StyleSheet, View, ScrollView, Text, Modal } from "react-native";
import { Chip, TextInput, Button } from "react-native-paper";
import { useTheme } from "@/constants/ThemeContext";

interface NoteModalProps {
  visible: boolean;
  hideModal: () => void;
  note: string;
  setNote: (note: string) => void;
  categories: { name: string; color: string }[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  isEditMode: boolean;
  handleAddTask: () => void;
  editIndex: number | null;
  removeTask: (index: number) => void;
}

const NoteModal: React.FC<NoteModalProps> = ({
  visible,
  hideModal,
  note,
  setNote,
  categories,
  selectedCategory,
  setSelectedCategory,
  isEditMode,
  handleAddTask,
  editIndex,
  removeTask,
}) => {
  const { isDarkMode } = useTheme();

  return (
    <Modal
      visible={visible}
      onRequestClose={hideModal}
      animationType="slide"
      statusBarTranslucent={true}
      transparent={true}
    >
      <View
        style={[
          styles.modalContent,
          { backgroundColor: isDarkMode ? "#334155" : "white" },
        ]}
      >
        <TextInput
          label="Write notes!"
          multiline
          style={[
            styles.textInput,
            { backgroundColor: isDarkMode ? "#334155" : "white" },
          ]}
          textColor={isDarkMode ? "white" : "black"}
          cursorColor="#66D1A6"
          value={note}
          onChangeText={setNote}
          theme={{
            colors: {
              primary: "#66D1A6",
              placeholder: isDarkMode ? "#D1D5DB" : "black",
            },
          }}
        />
        <View style={styles.modalCategoryContainer}>
          <Text
            style={[
              styles.modalCategoryTitle,
              { color: isDarkMode ? "white" : "black" },
            ]}
          >
            Select category:
          </Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {categories.map((category) => (
              <Chip
                key={category.name}
                style={[
                  styles.chip,
                  selectedCategory === category.name && styles.selectedChip,
                  {
                    backgroundColor:
                      selectedCategory === category.name
                        ? category.color
                        : isDarkMode
                        ? "#334155"
                        : "white",
                  },
                ]}
                mode="outlined"
                onPress={() => setSelectedCategory(category.name)}
                textStyle={{
                  color:
                    selectedCategory === category.name
                      ? "white"
                      : isDarkMode
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
        <Button
          textColor="red"
          onPress={() => {
            if (editIndex !== null) {
              removeTask(editIndex);
              hideModal();
            }
          }}
        >
          Delete
        </Button>
        <Button
          textColor={isDarkMode ? "#CBD5E1" : "#1F2937"}
          onPress={hideModal}
        >
          Cancel
        </Button>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    width: "90%",
    height: "100%",
    borderRadius: 20,
    alignSelf: "center",
    padding: 20,
    marginTop: "30%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  textInput: {
    width: "100%",
    height: 370,
    borderTopWidth: 0,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
  },
  modalCategoryContainer: {
    marginVertical: 20,
  },
  modalCategoryTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  chip: {
    marginHorizontal: 10,
    backgroundColor: "white",
  },
  selectedChip: {
    backgroundColor: "#66D1A6",
  },
});

export default NoteModal;
