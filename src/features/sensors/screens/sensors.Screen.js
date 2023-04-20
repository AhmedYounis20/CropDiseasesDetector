import React from "react";
import { Card } from "react-native-paper";
import { View,FlatList,TouchableOpacity,StyleSheet } from "react-native";
import styled from "styled-components";
import { SafeArea } from "../../../components/SafeArea/SafeArea.Component";

import { sensors } from "../../../services/sensors/sensors.mock";

const SensorCard = styled(Card)`
  margin: 5%;
  height: 140px;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 5px;
  
`;
const SensorsView = styled(View)`
    flex:1;
    flex-direction:row;
    flex-wrap:wrap;
`;
const SensorTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  font-style: italic;
`;
const TouchCard = styled(TouchableOpacity)`
  margin-left: 1%;
  margin-right: 3%;
  height: 140px;
  width: 45%;
  margin-bottom:10%;

`;

export const SensorsScreen = ({ navigation }) => {

  return (
    <SafeArea>
      <FlatList
      contentContainerStyle={styles.sensorsList}
      numColumns={2}
      data={sensors}
      renderItem={({item})=>{
        console.log(item);
        return(
          <TouchCard onPress={()=>navigation.navigate(item)}>
        <SensorCard>
          <SensorTitle>{item}</SensorTitle>
        </SensorCard>
      </TouchCard>
            );
      }}
      keyExtractor={item=>item}      
      />
    </SafeArea>
  );
};

const styles=StyleSheet.create({
  sensorsList:{
    flex:1,
    margin:10,
    marginTop:20
  }
});