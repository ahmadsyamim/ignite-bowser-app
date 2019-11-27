import * as React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, StyleSheet} from "react-native"
import { Screen, Text } from "../components"
// import { useStores } from "../models/root-store"
import { color } from "../theme"
import { NavigationScreenProps } from "react-navigation"
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  Calendar,
  Layout,
  Text as Txt, 
  Button
} from 'react-native-ui-kitten';




export interface LoginScreenProps extends NavigationScreenProps<{}> {
  
}

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
}

export const LoginScreen: React.FunctionComponent<LoginScreenProps> = observer((props) => {
  // const { someStore } = useStores()

  const styles = StyleSheet.create({
    container: {
      padding: 16,
      minHeight: 376,
    },
  });

  return (
    <Screen preset="scroll">
      <View style={ROOT}>
        <Text preset="header" tx="loginScreen.header" />
      </View>
      <View>
      <Input
        placeholder='BASIC INPUT'
        />
        <Input
          placeholder='INPUT WITH CUSTOM ICON'
          leftIcon={
            <Icon
              name='users'
              size={24}
              color='black'
            />
          }
        />

        <Input
          placeholder='INPUT WITH ERROR MESSAGE'
          errorStyle={{ color: 'red' }}
          errorMessage='ENTER A VALID ERROR HERE'
        />
      </View>
      <Layout>
    <Txt category='h4'>Welcome to UI Kitten</Txt>
    <Button>BUTTON</Button>
  </Layout>
  <Layout style={styles.container}>
        <Calendar
        />
      </Layout>
    </Screen>
  )
})
