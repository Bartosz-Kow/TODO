import { Tabs } from "expo-router";
import { ThemeProvider, useTheme } from "@/constants/ThemeContext";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { StyleSheet } from "react-native";

const TabLayout = () => {
  const { isDarkMode } = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: isDarkMode ? "#66D1A6" : "#333",
        tabBarStyle: [
          styles.tabBar,
          { backgroundColor: isDarkMode ? "#1F2937" : "#ffffff" },
        ],
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="user" color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default function MainLayout() {
  return (
    <ThemeProvider>
      <TabLayout />
    </ThemeProvider>
  );
}

// Style
const styles = StyleSheet.create({
  tabBar: {
    borderTopWidth: 0,
    borderRadius: 20,
    position: "absolute",
    bottom: 20,
    left: 30,
    right: 30,
    height: 60,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 5,
  },
});
