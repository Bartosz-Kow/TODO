import React, { useEffect, useState } from "react";
import { loadFonts } from "@/constants/Font";
import { LogoText } from "@/components/Texts/text";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import { TextInput, ActivityIndicator, MD2Colors } from "react-native-paper";

export default function Index() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    loadFonts()
      .then(() => {
        console.log("Fonts loaded successfully");
        setFontsLoaded(true);
      })
      .catch((error) => {
        console.error("Error loading fonts:", error);
      });
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={styles.container}>
        <ActivityIndicator animating={true} color={MD2Colors.red800} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <LogoText>DO IT</LogoText>
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
        />
        <TouchableOpacity style={styles.button}>
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
    backgroundColor: "#fff",
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
    fontFamily: "InterBold",
    width: "90%",
    textAlign: "left",
    marginBottom: 16,
  },
  subTitle: {
    fontSize: 19,
    color: "#1f2937",
    textAlign: "center",
    margin: 10,
    fontFamily: "InterBold",
  },
  buttonText: {
    fontWeight: "bold",
    color: "#1F2937",
    fontFamily: "Roboto",
    fontSize: 15,
  },
});
