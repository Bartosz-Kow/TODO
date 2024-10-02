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

export default function Index() {
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
        ></TextInput>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Save Name</Text>
        </TouchableOpacity>
        <Text style={styles.subTitle}>
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
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    width: "90%",
    marginBottom: 16,
  },
  logo: {
    width: 201,
    height: 201,
    marginVertical: 20,
  },
  title: {
    fontSize: 30,
    color: "#1F2937",
    textAlign: "left",
  },
  subTitle: {
    fontSize: 19,
    color: "#1f2937",
  },
  buttonText: {
    fontWeight: "bold",
    color: "#1F2937",
  },
});
