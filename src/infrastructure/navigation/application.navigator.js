import {
  createStackNavigator,
  TransitionPreset,
  TransitionPresets,
} from "@react-navigation/stack";
import { ApplicationScreen } from "../../features/application/Screens/Application.Screen";
import { ImagePickerComponent } from "../../features/application/components/imagepicker.component";
import { CameraComponent } from "../../features/application/components/camera.component";
import { ImageView } from "../../features/application/components/imageview.component";

const ApplicationStack = createStackNavigator();

export const ApplicationNavigator = () => {
  return (
    <ApplicationStack.Navigator
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.SlideFromRightIOS,
      }}
    >
      <ApplicationStack.Screen
        name="ApplicationScreen"
        component={ApplicationScreen}
      />
      <ApplicationStack.Screen
        name="ImagePickerComponent"
        component={ImagePickerComponent}
      />
      <ApplicationStack.Screen
        name="CameraScreen"
        component={CameraComponent}
      />
      <ApplicationStack.Screen
        name="ImageView"
        component={ImageView}
      />
    </ApplicationStack.Navigator>
  );
};
