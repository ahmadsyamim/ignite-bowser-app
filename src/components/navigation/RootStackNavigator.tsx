import {NavigationNativeContainer} from "@react-navigation/native";
import React from "react";
import Splash from "../screen/Splash";
import Login from "../screen/Login";
import Register from "../screen/Register";
import Home from "../screen/Home";
import News from "../screen/News";
import Shop from "../screen/Shop";
import Video from "../screen/Video";
import Logout from "../screen/Logout";
import Intro from "../screen/Intro";
import Temp from "../screen/Temp";
import {createStackNavigator} from "@react-navigation/stack";
import {useThemeContext} from "../../providers/ThemeProvider";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {createDrawerNavigator} from "@react-navigation/drawer";
import {DrawerActions} from "@react-navigation/routers";
import {navigationRef} from "./NavigationService";
import {StyleSheet} from "react-native";
import {
  TextInput,
  Button as Btn,
  NavigationBar,
  ScrollView,
  Icon,
  Title,
  Spinner,
  Text,
  View,
  Screen,
  Image,
  Heading,
  ImageBackground
} from "@shoutem/ui";
import {useSafeArea} from "react-native-safe-area-context";
import {DrawerItemList, DrawerItem} from "@react-navigation/drawer";

function CustomDrawerContent({
  drawerPosition,
  navigation,
  ...rest
}) {
  const insets = useSafeArea();

  return (<ScrollView contentContainerStyle={[{
        paddingTop: insets.top + 4,
        paddingLeft: drawerPosition === "left"
          ? insets.left
          : 0,
        paddingRight: drawerPosition === "right"
          ? insets.right
          : 0
      }
    ]} style={styles.container}>
    <DrawerItemList navigation={navigation} {...rest}/>
    <DrawerItem label="Logout" onPress={() => navigation.navigate("Logout")}/>
  </ScrollView>);
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

const Root = createStackNavigator();
const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const Drawer = createDrawerNavigator();

function HomeNavigator(): React.ReactElement {
  const {theme} = useThemeContext();
  return (<HomeStack.Navigator initialRouteName="Home" screenOptions={{
      header: ({scene, previous, navigation}) => {
        const {options} = scene.descriptor;
        const title = options.headerTitle !== undefined
          ? options.headerTitle
          : options.title !== undefined
            ? options.title
            : scene.route.name;

        return (<NavigationBar centerComponent={<Title> {
            title
          }
          </Title>} rightComponent={<Icon
          name = "sidebar"
          onPress = {
            () => {
              navigation.dispatch(DrawerActions.openDrawer());
            }
          }
          />} leftButton={previous
            ? <Btn onPress={navigation.goBack}/>
            : undefined
}/>);
      },

      headerStyle: {
        backgroundColor: theme.background
      },
      headerTitleStyle: {
        color: theme.fontColor
      },
      headerTintColor: theme.tintColor
    }}>
    <HomeStack.Screen name="Home" component={News} options={{
        // headerShown: true
      }}/>
  </HomeStack.Navigator>);
}

function TabNavigator(): React.ReactElement {
  return (<Tab.Navigator>
    <Tab.Screen name="Home" component={HomeNavigator}/>
    <Tab.Screen name="Shops" component={Shop}/>
    <Tab.Screen name="Videos" component={Video}/>
    <Tab.Screen name="Temp" key="temp" component={Temp}/>
  </Tab.Navigator>);
}

function DrawerNavigator(): React.ReactElement {
  return (<Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props}/>}>
    <Drawer.Screen name="Home" component={TabNavigator}/>
    <Drawer.Screen name="Shops" component={Shop}/>
  </Drawer.Navigator>);
}

function RootNavigator(): React.ReactElement {
  const {theme} = useThemeContext();
  return (<NavigationNativeContainer ref={navigationRef}>
    <Root.Navigator initialRouteName="Splash" screenOptions={{
        headerStyle: {
          backgroundColor: theme.background
        },
        headerTitleStyle: {
          color: theme.fontColor
        },
        headerTintColor: theme.tintColor
      }}>
      <Root.Screen name="Splash" component={Splash} options={{
          headerShown: false
        }}/>
      <Root.Screen name="Login" component={Login}/>
      <Root.Screen name="Register" component={Register}/>
      <Drawer.Screen name="Logout" component={Logout}/>
      <Root.Screen name="Tab" component={DrawerNavigator} options={{
          headerShown: false
        }}/>
    </Root.Navigator>
  </NavigationNativeContainer>);
}

export default RootNavigator;
