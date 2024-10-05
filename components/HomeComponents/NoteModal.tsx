import React from "react";
import { StyleSheet, View, ScrollView, Text, Modal } from "react-native";
import { Chip, TextInput, Button } from "react-native-paper";

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
  return (
    <Modal
      visible={visible}
      onRequestClose={hideModal}
      animationType="slide"
      statusBarTranslucent={true}
      transparent={true}
    >
      <View style={styles.modalContent}>
        <TextInput
          label="Write notes!"
          multiline
          style={styles.textInput}
          textColor="black"
          cursorColor="#66D1A6"
          value={note}
          onChangeText={setNote}
          theme={{
            colors: {
              primary: "#66D1A6",
              placeholder: "black",
            },
          }}
        />
        <View style={styles.modalCategoryContainer}>
          <Text style={styles.modalCategoryTitle}>Select category:</Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {categories.map((category) => (
              <Chip
                key={category.name}
                style={[
                  styles.chip,
                  selectedCategory === category.name && styles.selectedChip,
                ]}
                mode="outlined"
                onPress={() => setSelectedCategory(category.name)}
                textStyle={{
                  color: selectedCategory === category.name ? "white" : "black",
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
        <Button textColor="#1F2937" onPress={hideModal}>
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
    backgroundColor: "white",
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
    backgroundColor: "white",
    borderTopWidth: 0,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    color: "#374151",
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
