import { Text, View, TouchableOpacity } from "react-native";
import { SafeArea } from "../../../components/SafeArea/SafeArea.Component";
import { Card } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";
import styled from "styled-components";
import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

import * as tf from "@tensorflow/tfjs";
import { bundleResourceIO, decodeJpeg } from "@tensorflow/tfjs-react-native";
import * as FileSystem from "expo-file-system";

const modelJSON = require("../../../../assets/model/model_tfjs/model.json");
const modelWeights = require("../../../../assets/model/model_tfjs/group1-shard1of1.bin");
const imageSize = 224;

const AboutCard = styled(Card)`
  height: 80px;
  width: 95%;
  margin: 2.5%;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  flex: 1;
  padding-left: 10px;
`;
const AboutItemTitle = styled.Text`
  font-size: 30px;
  font-style: italic;
  color: violet;
  margin-left: 10px;
`;
export const ApplicationScreen = ({ navigation }) => {
  const loadModel = async () => {
    const model = await tf
      .loadLayersModel(bundleResourceIO(modelJSON, modelWeights))
      .catch((e) => {
        console.log("[LOADING ERROR] info:", e);
      });
    return model;
  };
  const transformImageToTensor = async (uri) => {
    const img64 = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    const imgBuffer = tf.util.encodeString(img64, "base64").buffer;
    const raw = new Uint8Array(imgBuffer);
    let imgTensor = decodeJpeg(raw);

    //resize the image
    imgTensor = tf.image.resizeNearestNeighbor(imgTensor, [
      imageSize,
      imageSize,
    ]);

    //normalize; if a normalization layer is in the model, this step can be skipped
    const tensorScaled = imgTensor;
    let img = tf.reshape(tensorScaled, [1, imageSize, imageSize, 3]);
    // img = tf.cast(img, 'float32');
    // img = tf.div(tensorScaled, tf.scalar(255.0));
    // console.log(img.shape)
    return img;
  };
  const makePredictions = async (batch, model, imagesTensor) => {
    //.ts: const makePredictions = async (batch:number, model:tf.LayersModel,imagesTensor:tf.Tensor<tf.Rank>):Promise<tf.Tensor<tf.Rank>[]>=>{
    //cast output prediction to tensor
    console.log(imagesTensor);
    try {
      console.log("before Pred::");
      const predictionsdata = await model.predict(imagesTensor);
      let pred = predictionsdata.array(); //split by batch size
      // console.log("")
      return predictionsdata;
    } catch (e) {
      console.log(e);
    }
  };
  const getPredictions = async (image) => {
    console.log("::::::::::::::::::::::::::::::::::::::::::::::::::::::");
    console.log(image);
    await tf.ready();
    const tensor_image = await transformImageToTensor(image);
    const model = await loadModel(); //as tf.LayersModel;
    const predictions = await makePredictions(1, model, tensor_image);
    console.log("prediction");
    console.log(predictions);
    return predictions;
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
      base64: true,
    });
    await getPredictions(result.assets[0].uri);

    if (!result.canceled) {
      navigation.navigate("ImageView", { uri: result.assets[0].uri });
    }
  };

  return (
    <SafeArea>
      <ScrollView style={{ marginTop: 20 }}>
        <TouchableOpacity onPress={() => navigation.navigate("CameraScreen")}>
          <AboutCard>
            <View style={{ flexDirection: "row" }}>
              <MaterialIcons name="camera" size={50} color={"violet"} />
              <AboutItemTitle>Take a photo</AboutItemTitle>
            </View>
          </AboutCard>
        </TouchableOpacity>
        <TouchableOpacity onPress={pickImage}>
          <AboutCard>
            <View style={{ flexDirection: "row" }}>
              <MaterialIcons name="image" size={50} color={"violet"} />
              <AboutItemTitle>pick from gallery</AboutItemTitle>
            </View>
          </AboutCard>
        </TouchableOpacity>
      </ScrollView>
    </SafeArea>
  );
};
