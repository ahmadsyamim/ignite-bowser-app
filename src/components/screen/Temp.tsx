import Button from "../shared/Button";
import {DefaultNavigationProps} from "../../types";
import React from "react";
import styled from "styled-components/native";
import AsyncStorage from "@react-native-community/async-storage";
import {CommonActions} from "@react-navigation/core";

const Container = styled.View `
  flex: 1;
  background-color: ${ (props): string => props.theme.background};
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

interface Props {
  navigation: DefaultNavigationProps<"Temp">;
}

const authAction = CommonActions.reset({
  index: 0,
  routes: [
    {
      name: "Intro"
    }
  ]
});

const homeAction = CommonActions.reset({
  index: 0,
  routes: [
    {
      name: "Temp"
    }
  ]
});

function Page(props : Props): React.ReactElement {
  const logout = async () => {
    try {
      await AsyncStorage.removeItem("user_token");
      try {
        const value = await AsyncStorage.getItem("user_token");
        if (value !== null) {
          // value previously stored
          props.navigation.dispatch(homeAction);
        } else {
          props.navigation.dispatch(authAction);
        }
      } catch (e) {
        // error reading value
        props.navigation.dispatch(authAction);
      }
    } catch (e) {
      // remove error
    }

    console.log("Done.");
  };

  return (<Container>
    <Button testID="btn" onClick={() : void => props.navigation.goBack()} text="Go Back" style={{
        backgroundColor: "#333333"
      }}/>
    <Button testID="btn" onClick={() : void => logout()} text="Logout" style={{
        backgroundColor: "#333333"
      }}/>
  </Container>);
}

export default Page;
