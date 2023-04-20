import { Text, View, TouchableOpacity } from "react-native";
import { SafeArea } from "../../../components/SafeArea/SafeArea.Component";
import { Card } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";
import styled from "styled-components";
import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

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

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    // console.log(result);

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
              <MaterialIcons name="image" size={50}  color={"violet"}/>
              <AboutItemTitle>pick from gallery</AboutItemTitle>
            </View>
          </AboutCard>
        </TouchableOpacity>
      </ScrollView>
    </SafeArea>
  );
};
