import {DefaultNavigationProps, User} from "../../types";

import Button from "../shared/Button";
import {IC_MASK} from "../../utils/Icons";
import React from "react";
import {View} from "react-native";
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
  Image,
  Spinner,
  Heading,
  Text
} from "@shoutem/ui";

import {CommonActions} from "@react-navigation/core";

const resetAction = CommonActions.reset({
  index: 0,
  routes: [
    {
      name: "Temp"
    }
  ]
});

const Container = styled.View `
  flex: 1;
  align-self: stretch;
  overflow: scroll;
  padding-top: 50;
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
      navigation: DefaultNavigationProps<"Register">;
    }

    function Intro(props : Props): React.ReactElement {
      let timer: number;
      const {state, setUser} = useAppContext();
      const {changeThemeType} = useThemeContext();
      const [isLoggingIn, setIsLoggingIn] = React.useState<boolean>(false);

      const onLogin = () : void => {
        setIsLoggingIn(true);
        timer = setTimeout(() => {
          const user: User = {
            displayName: "dooboolab",
            age: 30,
            job: "developer"
          };
          setUser(user);
          setIsLoggingIn(false);
          props.navigation.dispatch(resetAction);
          clearTimeout(timer);
        }, 1000);
      };

      return (<Container>
        <ContentWrapper>
          <Heading>Register</Heading>
          <TextInput placeholder={"Name"}
            // onChangeText={}
          />
          <TextInput placeholder={"Email"}
            // onChangeText={}
          />
          <TextInput placeholder={"Password"} secureTextEntry={true}/>
          <Btn styleName="secondary" style={{
              marginTop: 20
            }}>
            <Text>Submit</Text>
          </Btn>
        </ContentWrapper>
      </Container>);
    }

    export default Intro;
