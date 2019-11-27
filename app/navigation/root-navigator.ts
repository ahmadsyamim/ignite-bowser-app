import { createStackNavigator } from "react-navigation"
import { PrimaryNavigator } from "./primary-navigator"
import {
  LoginScreen,
} from "../screens" // eslint-disable-line @typescript-eslint/no-unused-vars

export const RootNavigator = createStackNavigator(
  {
    loginScreen: { screen: LoginScreen },
    primaryStack: { screen: PrimaryNavigator },
  },
  {
    headerMode: "none",
    navigationOptions: { gesturesEnabled: false },
  },
)
