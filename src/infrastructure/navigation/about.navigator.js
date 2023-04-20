import { createStackNavigator,TransitionPreset, TransitionPresets } from "@react-navigation/stack";
import { AboutScreen } from "../../features/about/Screens/about.Screen";
import { TeamScreen } from "../../features/about/Screens/team.Screen";
const AboutStack = createStackNavigator();

export const AboutNavigator = () => {
  return (
    <AboutStack.Navigator screenOptions={{headerShown:false ,
    ...TransitionPresets.SlideFromRightIOS
    }}>
      <AboutStack.Screen
        name="aboutScreen"
        component={AboutScreen} 
         
      />
      <AboutStack.Screen
      name="teamScreen"
      component={TeamScreen}
      />
    </AboutStack.Navigator>
  );
};
