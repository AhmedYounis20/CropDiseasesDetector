import { useEffect, useState } from "react";
import { SafeArea } from "../../../components/SafeArea/SafeArea.Component";
import { View, Image } from "react-native";
import * as ts from "@tensorflow/tfjs";
import { fetch, bundleResourceIO } from "@tensorflow/tfjs-react-native";
export const ImageView = ({ route }) => {
  const { uri } = route.params;
  const [plantClassifier, setPlantClassifier] = useState(null);
  useEffect(async () => {
      console.log("[+] Application Started");
      const modelJson = await require("./../../../../assets/model/model.json");
      const modelWeight = await require("./../../../../assets/model/group1-shared.bin");
      const plantdetector = await ts.loadLayersModel(bundleResourceIO(modelJson,modelWeight));
      //setPlantClassifier(plantdetector);
      //console.log(ClassiffyPlant());
      console.log(plantdetector);
      return plantdetector;
  }, []);
  const ClassiffyPlant = () => {
    return plantClassifier.predict(uri).data();
  };
  return (
    <SafeArea>
      <View style={{ flex: 1 }}>
        <Image source={{ uri: uri }} style={{ flex: 1 }} resizeMode="contain" />
      </View>
    </SafeArea>
  );
};
