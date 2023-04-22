import { FlatList, Text, View } from "react-native";
import { SafeArea } from "../../../components/SafeArea/SafeArea.Component";
import { DeveloperInfoCard } from "../../../components/Cards/developer-card.component";
import { develpers } from "../../../services/about/team.mock";
import { projectNotes } from "../../../services/about/project.mock";
import styled from "styled-components";

const Title = styled.Text`
  font-weight: bold;
  font-size: 15px;
`;
const Row = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  margin: 1px;
`;

export const ProjectDescriptionScreen = () => {
  return (
    <SafeArea>
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 30, fontStyle: "italic", color: "violet" }}>
          Project Description
        </Text>
      </View>
      <FlatList
        data={projectNotes}
        renderItem={({ item, index }) => {
          return (
            <Row>
              <Title>{index + 1}.</Title>
              <Title>{item.header}</Title>
              <Text style={{ marginLeft: item.header === "" ? 0 : 10 }}>
                {item.body}
              </Text>
            </Row>
          );
        }}
        keyExtractor={(item) => item.index}
      />
    </SafeArea>
  );
};
