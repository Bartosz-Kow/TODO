import React from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import { Chip } from "react-native-paper";

interface CategoryChipsProps {
  categories: { name: string; color: string }[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  setSearchQuery: (query: string) => void;
}
const CategoryChips: React.FC<CategoryChipsProps> = ({
  categories,
  selectedCategory,
  setSelectedCategory,
  setSearchQuery,
}) => {
  return (
    <View style={styles.chipContainer}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <Chip
          style={[
            styles.chip,
            selectedCategory === "All" && styles.selectedChip,
            {
              backgroundColor: selectedCategory === "All" ? "#66D1A6" : "white",
            },
          ]}
          mode="outlined"
          onPress={() => {
            setSelectedCategory("All");
            setSearchQuery("");
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
              selectedCategory === category.name && styles.selectedChip,
              {
                backgroundColor:
                  selectedCategory === category.name ? category.color : "white",
              },
            ]}
            mode="outlined"
            onPress={() => {
              setSelectedCategory(category.name);
              setSearchQuery("");
            }}
            textStyle={{
              color: selectedCategory === category.name ? "white" : "black",
            }}
          >
            {category.name}
          </Chip>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  chipContainer: {
    flexDirection: "row",
    marginTop: 15,
    marginLeft: 5,
    marginBottom: 15,
  },
  chip: {
    marginHorizontal: 10,
    backgroundColor: "white",
  },
  selectedChip: {
    backgroundColor: "#66D1A6",
  },
});

export default CategoryChips;
