import React,{ useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Pedometer } from "expo-sensors";

export const PedometerComponent = () => {
  const [stepCount, setStepCount] = useState(0);

  useEffect(() => {
    let subscription;
    const subscribeToPedometer = async () => {
      try {
        const isAvailable = await Pedometer.isAvailableAsync();
        if (isAvailable) {
          subscription = Pedometer.watchStepCount(result => {
            setStepCount(result.steps);
          });
        } else {
          console.log("Pedometer is not available");
        }
      } catch (error) {
        console.log(error);
      }
    };
    subscribeToPedometer();
    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text>Total Steps: {stepCount}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  }
});