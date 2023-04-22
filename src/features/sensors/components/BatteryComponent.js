import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as Battery from "expo-battery";


export const BatteryComponent = () => {
    const [batteryLevel, setBatteryLevel] = useState(null);
    const [batteryState, setBatteryState] = useState(null);
    const [batteryPowerState, setBatteryPowerState] = useState(false);
    
    const GetOptimizationData = async () => {
        const temp= await Battery.isLowPowerModeEnabledAsync();
        setBatteryPowerState(temp);
        Battery.addLowPowerModeListener(({ lowPowerMode }) => {
            setBatteryPowerState(lowPowerMode );
            console.log('batteryLevel changed!', lowPowerMode);
          });
      };
  useEffect(() => {
    Battery.getBatteryLevelAsync().then((level) => setBatteryLevel(level));
    Battery.getBatteryStateAsync().then((state) => setBatteryState(state));
    GetOptimizationData();
  }, []);

  return (
    <View style={styles.container}>
      <Text>
        Battery Level:{" "}
        {batteryLevel !== null
          ? Math.round(batteryLevel * 100) + "%"
          : "Unknown"}
      </Text>
      <Text>
        Battery State:{" "}
        {batteryState !== null
          ? getBatteryStateString(batteryState)
          : "Unknown"}
      </Text>
      <Text>
        Battery State:{" "}
        {batteryPowerState !== null ? `${batteryPowerState}` : false}
      </Text>
    </View>
  );
};

function getBatteryStateString(state) {
  switch (state) {
    case Battery.BatteryState.UNKNOWN:
      return "Unknown";
    case Battery.BatteryState.UNPLUGGED:
      return "Unplugged";
    case Battery.BatteryState.CHARGING:
      return "Charging";
    case Battery.BatteryState.FULL:
      return "Full";
    default:
      return "Unknown";
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    alignItems: "center",
    justifyContent: "center",
  },
});
