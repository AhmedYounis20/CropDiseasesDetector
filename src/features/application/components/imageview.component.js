import { useEffect, useState } from "react";
import { SafeArea } from "../../../components/SafeArea/SafeArea.Component";
import { View, Image, Text } from "react-native";
import styled from "styled-components";
import * as tf from "@tensorflow/tfjs";
import { bundleResourceIO, decodeJpeg } from "@tensorflow/tfjs-react-native";
import * as FileSystem from "expo-file-system";
import { ActivityIndicator } from "react-native-paper";

const modelJSON = require("../../../../assets/model/model_tfjs/model.json");
const modelWeights = require("../../../../assets/model/model_tfjs/group1-shard1of1.bin");
const imageSize = 224;

const ResultText = styled(Text)`
  font-size: 25px;
  font-weight: bold;
  font-style: italic;
`;
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
  imgTensor = tf.image.resizeNearestNeighbor(imgTensor, [imageSize, imageSize]);

  //normalize; if a normalization layer is in the model, this step can be skipped
  const tensorScaled = imgTensor;
  let img = tf.reshape(tensorScaled, [1, imageSize, imageSize, 3]);
  return img;
};
const makePredictions = async (batch, model, imagesTensor) => {
  //cast output prediction to tensor
  console.log(imagesTensor);
  try {
    console.log("before Pred::");
    const predictionsdata = await model.predict(imagesTensor);
    let pred = predictionsdata.array(); //split by batch size
    return pred;
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

export const ImageView = ({ route }) => {
  const { uri } = route.params;
  const [result, setResult] = useState([[0.9, 0.1]]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      const predictionResult = await getPredictions(uri);
      if (predictionResult) setResult(predictionResult);
      console.log("result",result[0]);
      setIsLoading(false);
    };
    load();
  }, []);
  return (
    <SafeArea>
      {isLoading ? (
        <View
          style={{
            flex: 1,
            alignContent: "center",
            alignSelf: "center",
            justifyContent: "center",
          }}
        >
          <ActivityIndicator
            animating={true}
            size={50}
            color="rgba(100,100,255,1)"
          />
          <Text
            style={{
              marginTop: 20,
              fontSize: 16,
              fontWeight: "bold",
              color: "rgba(100,100,255,1)",
              fontStyle: "italic",
            }}
          >
            Please wait for prediction...
          </Text>
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <View
            style={{
              height: "70%",
              width: "70%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View style={{ flex: 1 }}>
              <Image
                source={{ uri: uri }}
                style={{ flex: 1 }}
                resizeMode="contain"
              />
            </View>
          </View>
          <ResultText>Healthy : {Math.ceil(result[0][0] * 100)}%</ResultText>
          <ResultText>
            powdery mildew : {Math.floor(result[0][1] * 100)}%
          </ResultText>
        </View>
      )}
    </SafeArea>
  );
};
