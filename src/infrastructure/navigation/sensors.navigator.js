import {
  createStackNavigator,
  TransitionPreset,
  TransitionPresets,
} from "@react-navigation/stack";
import { SensorsScreen } from "../../features/sensors/screens/sensors.Screen";
import { AccelerometerComponent } from "../../features/sensors/components/AccelerometerComponent";
import { GyroscopeComponent } from "../../features/sensors/components/GyroscopeComponent";
import { BarometerComponent } from "../../features/sensors/components/BarometerComponent";
import { LightComponent } from "../../features/sensors/components/LightComponent";
import { PedometerComponent } from "../../features/sensors/components/PedometerComponent";
import { MagnetometerComponent } from "../../features/sensors/components/MagnetometerComponent";
import { CameraComponent } from "../../features/sensors/components/CameraComponent";
import { ProximityComponent } from "../../features/sensors/components/ProximityComponent";
const SensorsStack = createStackNavigator();

export const SensorsNavigator = () => {
  return (
    <SensorsStack.Navigator
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.SlideFromRightIOS,
      }}
    >
      <SensorsStack.Screen name="sensors" component={SensorsScreen} />
      <SensorsStack.Screen
        name="Accelerometer"
        component={AccelerometerComponent}
      />
      <SensorsStack.Screen name="Gyroscope" component={GyroscopeComponent} />
      <SensorsStack.Screen name="Barometer" component={BarometerComponent} />
      <SensorsStack.Screen name="Light" component={LightComponent} />
      <SensorsStack.Screen name="Pedometer" component={PedometerComponent} />
      <SensorsStack.Screen
        name="Magnetometer"
        component={MagnetometerComponent}
      />
      <SensorsStack.Screen name="Camera" component={CameraComponent} />
      <SensorsStack.Screen name="Proximity" component={ProximityComponent} />
    </SensorsStack.Navigator>
  );
};
