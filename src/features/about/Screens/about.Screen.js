import { Text, View, TouchableOpacity } from "react-native";
import { SafeArea } from "../../../components/SafeArea/SafeArea.Component";
import { Card } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";
import styled from "styled-components";
import { MaterialIcons } from "@expo/vector-icons";
const AboutCard = styled(Card)`
  height: 80px;
  width: 95%;
  margin: 2.5%;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  flex: 1;
  padding-left: 10px;
  color: violet;
`;
const AboutItemTitle = styled.Text`
  font-size: 30px;
  font-style: italic;
  color: violet;
  margin-left: 10px;
`;
export const AboutScreen = ({ navigation }) => {
  return (
    <SafeArea>
      <ScrollView style={{ marginTop: 20 }}>
        <TouchableOpacity onPress={() => navigation.navigate("projectDescriptionScreen")}>
          <AboutCard>
            <View style={{ flexDirection: "row" }}>
              <MaterialIcons name="menu-book" size={50}  color={"violet"} />
              <AboutItemTitle>Project Desciption</AboutItemTitle>
            </View>
          </AboutCard>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("teamScreen")}>
          <AboutCard>
            <View style={{ flexDirection: "row" }}>
              <MaterialIcons name="groups" size={50}  color={"violet"}/>
              <AboutItemTitle>Team Members</AboutItemTitle>
            </View>
          </AboutCard>
        </TouchableOpacity>
      </ScrollView>
    </SafeArea>
  );
};
