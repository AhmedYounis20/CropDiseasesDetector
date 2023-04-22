import React, { useState, useEffect } from "react";
import { Button, Image, View, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { SafeArea } from "../../../components/SafeArea/SafeArea.Component";

export const ImagePickerComponent = ({ navigation }) => {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    console.log(result);
    if (!result.canceled) {
      setImage(result.assets);
      // console.log(result.assets);
      //navigation.navigate("ImageView", { uri: result });
    }
  };

  return (
    <SafeArea style={{ paddingTop: 90 }}>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          maxHeight: "80%",
          maxWidth: "90%",
          margin: "5%",
        }}
      >
        <View
          style={{
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Button title="Pick an image" onPress={pickImage} />
        </View>
      </View>
    </SafeArea>
  );
};
