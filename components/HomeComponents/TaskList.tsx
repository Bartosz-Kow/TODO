import React from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";

interface Task {
  note: string;
  category: string;
}

interface TaskListProps {
  tasks: Task[];
  editTask: (index: number) => void;
  categories: { name: string; color: string }[];
  selectedCategory: string;
  searchQuery: string;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  editTask,
  categories,
  selectedCategory,
  searchQuery,
}) => {
  const filteredTasks = tasks.filter(
    (task) =>
      (selectedCategory === "All" || task.category === selectedCategory) &&
      task.note.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderTask = ({ item, index }: { item: Task; index: number }) => {
    const categoryColor =
      categories.find((cat) => cat.name === item.category)?.color || "#FDE99D";

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
    <FlatList
      data={filteredTasks}
      renderItem={renderTask}
      keyExtractor={(item, index) => index.toString()}
      numColumns={2}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
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
});

export default TaskList;
