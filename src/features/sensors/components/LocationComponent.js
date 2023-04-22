import React, { useState, useEffect } from "react";
import { Platform, Text, View, StyleSheet } from "react-native";
import { isDevice } from "expo-device";
import * as Location from "expo-location";
import { ActivityIndicator } from "react-native-paper";
export const LocationComponent = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS === "android" && !isDevice) {
        setErrorMsg(
          "Oops, this will not work on Snack in an Android Emulator. Try it on your device!"
        );
        return;
      }
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
    console.log(location.coords.speed);
  }

  return (
    <View style={styles.container}>
      {location ? (
        <>
          <Text style={styles.paragraph}>timestamp: {location.timestamp}</Text>
          <Text style={styles.paragraph}>
            moked: {location.mocked ? "true" : "false"}
          </Text>
          <Text style={{fontWeight:"bold",fontSize:20}}>---------- coords ----------</Text>
          <Text style={styles.paragraph}>heading: {location.coords.heading}</Text>
          <Text style={styles.paragraph}>altitude: {location.coords.altitude}</Text>
          <Text style={styles.paragraph}>altitude accuracy: {location.coords.altitudeAccuracy}</Text>
          <Text style={styles.paragraph}>latitude: {location.coords.latitude}</Text>
          <Text style={styles.paragraph}>longitude: {location.coords.longitude}</Text>
          <Text style={styles.paragraph}>speed: {location.coords.speed}</Text>
          <Text style={styles.paragraph}>accuracy: {location.coords.accuracy}</Text>
        </>
      ):(<><ActivityIndicator size={50}/></>)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  paragraph: {
    fontSize: 18,
    textAlign: "center",
  },
});
