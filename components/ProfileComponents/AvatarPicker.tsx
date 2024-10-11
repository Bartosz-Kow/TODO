import React, { useState, useEffect } from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Avatar } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import {
  setUserImage,
  getUserImage,
} from "@/components/storage/userPreferences";

const AvatarPicker = () => {
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const selectedImageUri = result.assets[0].uri;
      setImage(selectedImageUri);
      await setUserImage(selectedImageUri);
    }
  };

  const loadImage = async () => {
    try {
      const storedImage = await getUserImage();
      if (storedImage !== null) {
        setImage(storedImage);
      }
    } catch (e) {
      console.log("Error loading image", e);
    }
  };

  useEffect(() => {
    loadImage();
  }, []);

  return (
    <TouchableOpacity onPress={pickImage}>
      {image ? (
        <Avatar.Image size={80} source={{ uri: image }} style={styles.avatar} />
      ) : (
        <Avatar.Icon size={80} icon="account" style={styles.avatar} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  avatar: {
    backgroundColor: "#66D1A6",
    marginVertical: 10,
    borderRadius: 40,
  },
});

export default AvatarPicker;
