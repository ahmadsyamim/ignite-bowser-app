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
  Spinner,
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
      navigation: DefaultNavigationProps<"Intro">;
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
          <TextInput placeholder={"Username or email"}
            // onChangeText={}
          />
          <TextInput placeholder={"Password"} secureTextEntry={true}/>
          <Btn styleName="secondary">
            <Text>test</Text>
          </Btn>
          <StyledText style={{
              marginTop: 100
            }}>
            {
              state.user
                ? state.user.displayName
                : ""
            }
          </StyledText>
          <StyledText>{
              state.user
                ? state.user.age
                : ""
            }</StyledText>
          <StyledText>{
              state.user
                ? state.user.job
                : ""
            }</StyledText>
        </ContentWrapper>
        <ButtonWrapper>
          <Button testID="btn1" imgLeftSrc={IC_MASK} isLoading={isLoggingIn} onClick={() : void => onLogin()} text={getString("LOGIN")}/>
          <View style={{
              marginTop: 8
            }}/>
          <Button testID="btn2" onClick={() : void => props.navigation.navigate("Temp")} text={getString("NAVIGATE")}/>
          <View style={{
              marginTop: 8
            }}/>
          <Button testID="btn3" onClick={() : void => changeThemeType()} text={getString("CHANGE_THEME")}/>
        </ButtonWrapper>
      </Container>);
    }

    export default Intro;
