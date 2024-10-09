import React, { useEffect, useState } from "react";
import { LogoText } from "@/components/Texts/text";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import { TextInput } from "react-native-paper";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Index() {
  const [name, setName] = useState<string>("");

  useEffect(() => {
    const checkStoredName = async () => {
      try {
        const storedName = await AsyncStorage.getItem("@storage_Key");
        if (storedName) {
          router.push("/(tabs)");
        }
      } catch (e) {
        console.log("Error fetching name", e);
      }
    };

    checkStoredName();
  }, []);

  const storeName = async () => {
    try {
      await AsyncStorage.setItem("@storage_Key", name);
      console.log("Name stored:", name);
      router.push("/(tabs)");
    } catch (e) {
      console.log("Error storing data", e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <LogoText />
        <Image
          style={styles.logo}
          source={require("/PROJEKTY/todo/Todo/assets/images/logo2.png")}
        />
        <Text style={styles.title}>Getting started</Text>
        <TextInput
          style={styles.textInput}
          label={"Your Name"}
          mode="outlined"
          placeholder="Enter Your Name"
          right={<TextInput.Affix text="/14" />}
          onChangeText={(text) => setName(text)}
        />
        <TouchableOpacity style={styles.button} onPress={storeName}>
          <Text style={styles.buttonText}>Save Name</Text>
        </TouchableOpacity>
        <Text style={[styles.subTitle]}>
          Start taking your notes and never forget anything!
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  innerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textInput: {
    width: "90%",
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#79EA99",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    width: "90%",
    marginBottom: 16,
  },
  logo: {
    width: 201,
    height: 201,
    marginBottom: 25,
  },
  title: {
    fontSize: 30,
    color: "#1F2937",
    width: "90%",
    textAlign: "left",
    marginBottom: 16,
    fontWeight: "bold",
  },
  subTitle: {
    fontSize: 19,
    color: "#1f2937",
    textAlign: "center",
    margin: 10,
  },
  buttonText: {
    fontWeight: "bold",
    color: "#1F2937",
    fontSize: 15,
  },
});
