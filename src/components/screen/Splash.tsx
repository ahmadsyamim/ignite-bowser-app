import {DefaultNavigationProps, User} from "../../types";

import Button from "../shared/Button";
import {IC_MASK} from "../../utils/Icons";
import React from "react";
// import {View} from "react-native";
import {getString} from "../../../STRINGS";
import styled from "styled-components/native";
import {useAppContext} from "../../providers/AppProvider";
import {useThemeContext} from "../../providers/ThemeProvider";
import {
  TextInput,
  Button as Btn,
  NavigationBar,
  Icon,
  Title,
  Spinner,
  Text,
  View,
  Screen,
  Image,
  ImageBackground
} from "@shoutem/ui";
import {CommonActions} from "@react-navigation/core";
import AsyncStorage from "@react-native-community/async-storage";

const resetAction = CommonActions.reset({
  index: 0,
  routes: [
    {
      name: "Temp"
    }
  ]
});

const ContainerFull = styled.View `
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #cccccc;
`;

const Container = styled.View `
  flex: 1;
  align-self: stretch;
  overflow: scroll;
  background-color: ${ ({
  theme}): string => theme.background};

  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;
`;

  const ContentWrapper = styled.View `
  flex-direction: column;
  height: 100%;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
`;

  const ButtonWrapper = styled.View `
  position: absolute;
  flex-direction: column;
  bottom: 40;
  width: 85%;
  align-self: center;
`;

  const StyledText = styled.Text `
  font-size: 18;
  line-height: 27;
  color: ${ ({
    theme}): string => theme.fontColor};
`;

    interface Props {
      navigation: DefaultNavigationProps<"Splash">;
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

    function Splash(props : Props): React.ReactElement {
      let timer: number;
      const {state, setUser} = useAppContext();
      const {changeThemeType} = useThemeContext();
      const [isLoggingIn, setIsLoggingIn] = React.useState<boolean>(false);

      const getData = async () => {
        timer = setTimeout(async () => {
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
          clearTimeout(timer);
        }, 5000);
      };

      getData();

      return (<Screen>
        <ContainerFull>
          <Image styleName="medium" source={{
              uri: "https://shoutem.github.io/img/ui-toolkit/examples/image-3.png"
            }}/>
        </ContainerFull>
      </Screen>);
    }

    export default Splash;
