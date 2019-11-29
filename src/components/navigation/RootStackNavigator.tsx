import {NavigationNativeContainer} from "@react-navigation/native";
import React from "react";
import Splash from "../screen/Splash";
import Intro from "../screen/Intro";
import Temp from "../screen/Temp";
import {createStackNavigator} from "@react-navigation/stack";
import {useThemeContext} from "../../providers/ThemeProvider";

const Stack = createStackNavigator();

function RootNavigator(): React.ReactElement {
  const {theme} = useThemeContext();
  return (<NavigationNativeContainer>
    <Stack.Navigator initialRouteName="Splash" screenOptions={{
        headerStyle: {
          backgroundColor: theme.background
        },
        headerTitleStyle: {
          color: theme.fontColor
        },
        headerTintColor: theme.tintColor
      }}>
      <Stack.Screen name="Splash" component={Splash} options={{
          header: null
        }}/>
      <Stack.Screen name="Intro" component={Intro}/>
      <Stack.Screen name="Temp" component={Temp}/>
    </Stack.Navigator>
  </NavigationNativeContainer>);
}

export default RootNavigator;
