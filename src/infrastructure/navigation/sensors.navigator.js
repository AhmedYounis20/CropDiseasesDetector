import { createStackNavigator,TransitionPreset, TransitionPresets } from "@react-navigation/stack";
import { SensorsScreen } from "../../features/sensors/screens/sensors.Screen";
import { AccelerometerComponent } from "../../features/sensors/components/AccelerometerComponent";
import { GyroscopeComponent } from "../../features/sensors/components/GyroscopeComponent";
import { BarometerComponent } from "../../features/sensors/components/BarometerComponent";
import { LightComponent } from "../../features/sensors/components/LightComponent";
import { PedometerComponent } from "../../features/sensors/components/PedometerComponent";
import { MagnetometerComponent } from "../../features/sensors/components/MagnetometerComponent";
import { CameraComponent } from "../../features/sensors/components/CameraComponent"; 
const RestaurantStack = createStackNavigator();

export const RestaurantsNavigator = () => {
  return (
    <RestaurantStack.Navigator screenOptions={{headerShown:false ,
    ...TransitionPresets.SlideFromRightIOS
    }}>
      <RestaurantStack.Screen
        name="sensors"
        component={SensorsScreen} 
      />
      <RestaurantStack.Screen
      name="Accelerometer"
      component={AccelerometerComponent}
      />
      <RestaurantStack.Screen
      name="Gyroscope"
      component={GyroscopeComponent}
      />
         <RestaurantStack.Screen
      name="Barometer"
      component={BarometerComponent}
      />
       <RestaurantStack.Screen
      name="Light"
      component={LightComponent}
      />
      <RestaurantStack.Screen
      name="Pedometer"
      component={PedometerComponent}
      />
            <RestaurantStack.Screen
      name="Magnetometer"
      component={MagnetometerComponent}
      />
              <RestaurantStack.Screen
      name="Camera"
      component={CameraComponent}
      />

    </RestaurantStack.Navigator>
  );
};
