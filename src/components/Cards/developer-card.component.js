import { Card } from "react-native-paper";
import styled from "styled-components";
import { View, Image, Text } from "react-native";
const DeveloperInfoContainer = styled(Card)`
  width: 95%;
  height: 100px;
  margin: 2%;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

const InfoView = styled.View`
  margin: 10px;
`;
const DeveloperName = styled.Text`
  font-style: italic;
  font-weight: bold;
`;

export const DeveloperInfoCard = ({ developer = {} }) => {
  const {
    image = require(`../../../assets/Team/hasabalah.jpg`),
    name = "",
    email = "",
  } = developer;
  return (
    <DeveloperInfoContainer>
      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-start",
          justifyContent: "flex-start",
        }}
      >
        <View
          style={{ height: 100, width: 100, maxHeight: 100, maxWidth: 100 }}
        >
          <Image
            resizeMode="contain"
            source={image}
            style={{
              height: 90,
              width: 90,
              margin: 5,
              borderRadius: 55,
            }}
          />
        </View>
        <InfoView>
          <DeveloperName>{name}</DeveloperName>
          <Text>{email}</Text>
        </InfoView>
      </View>
    </DeveloperInfoContainer>
  );
};
