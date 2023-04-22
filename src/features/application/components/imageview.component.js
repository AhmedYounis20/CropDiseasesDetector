import { useEffect, useState } from "react";
import { SafeArea } from "../../../components/SafeArea/SafeArea.Component";
import { View, Image, Text } from "react-native";
import * as ts from "@tensorflow/tfjs";
import { fetch, bundleResourceIO } from "@tensorflow/tfjs-react-native";
import styled from "styled-components";

const ResultText=styled(Text)`
  font-size:25px;
  font-weight:bold;
  font-style:italic;
`;

export const ImageView = ({ route }) => {
  const { uri } = route.params;
  return (
    <SafeArea>
      <View style={{flex:1,alignItems:"center",justifyContent:"flex-start"}}>
      <View style={{height:"70%",width:"70%",flexDirection:"row",alignItems:"center",justifyContent:"center",}}>
      <View style={{ flex: 1 }}>
        <Image source={{ uri: uri }} style={{ flex: 1}} resizeMode="contain" />
      </View>
      </View>
      <ResultText>Healthy</ResultText>
      </View>
    </SafeArea>
  );
};
