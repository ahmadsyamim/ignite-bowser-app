import Button from "../shared/Button";
import {DefaultNavigationProps} from "../../types";
import React from "react";
import styled from "styled-components/native";
import AsyncStorage from "@react-native-community/async-storage";
import {CommonActions} from "@react-navigation/core";
import * as NavigationService from "../navigation/NavigationService";
import {StackActions} from "@react-navigation/routers";

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
      name: "Splash"
    }
  ]
});

const homeAction = CommonActions.reset({
  index: 0,
  routes: [
    {
      name: "Splash"
    }
  ]
});

function Page(props : Props): React.ReactElement {
  const logout = async () => {
    try {
      await AsyncStorage.removeItem("user_token");
      NavigationService.navigate("Splash", {});

      try {
        const value = await AsyncStorage.getItem("user_token");
        console.log("Current token: ", value);
        if (value !== null) {
          // value previously stored
        } else {}
      } catch (e) {
        // error reading value
      }
    } catch (e) {
      // remove error
    }

    console.log("Done.");
  };

  return (<Container>
    <Button testID="btn" onClick={() => logout()} text="Logout" style={{
        backgroundColor: "#333333"
      }}/>
  </Container>);
}

export default Page;
