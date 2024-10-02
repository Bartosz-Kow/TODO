import * as Font from "expo-font";

export const loadFonts = async () => {
  await Font.loadAsync({
    Roboto: require("../assets/fonts/Roboto-Regular.ttf"),
    Inter: require("../assets/fonts/Inter_28pt-Regular.ttf"),
    InterBold: require("../assets/fonts/Inter_18pt-Bold.ttf"),
  });
};
