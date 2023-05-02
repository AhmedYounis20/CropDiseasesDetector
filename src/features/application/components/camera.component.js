import React, { useRef, useState } from "react";
import { View, Text, TouchableOpacity,Button } from "react-native";
import { Camera } from "expo-camera";
import { SafeArea } from "../../../components/SafeArea/SafeArea.Component";

export const CameraComponent = ({ navigation }) => {
  const cameraRef = useRef(null);
  const [photoUri, setPhotoUri] = useState(null);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }
  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <SafeArea style={{flex:1,alignItems:"center",justifyContent:"center"}}>
        <View>
          <Text style={{ textAlign: "center" }}>
            We need your permission to show the camera
          </Text>
          <Button onPress={requestPermission} title="grant permission" />
        </View>
      </SafeArea>
    );
  }
  const takePicture = async () => {
    if (cameraRef.current) {
      requestPermission();
      const { uri } = await cameraRef.current.takePictureAsync(false);
      navigation.navigate("ImageView", { uri: uri });
    }
  };

  return (
    <SafeArea>
      <View style={{ flex: 1 }}>
        <Camera ref={cameraRef} style={{ flex:1 }}>
          {/* Your camera view */}
        </Camera>
        <TouchableOpacity
          onPress={takePicture}
          style={{ position: "absolute", bottom: 20,alignSelf:"center" ,alignItems: "center",backgroundColor:"red",borderRadius:70,height:130,flexDirection:"row",justifyContent:"center",width:130 }}
        >
          <Text style={{ fontSize: 18 }}>Take Photo</Text>
        </TouchableOpacity>
      </View>
    </SafeArea>
  );
};
