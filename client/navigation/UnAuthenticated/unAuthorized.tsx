import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Login from "../../screens/Auth/Login";
import Signup from "../../screens/Auth/Signup";
import EmailVerification from "../../screens/Auth/EmailVerification";
import ResestPassword from "../../screens/Auth/ResetPassword";
import { UnAuthenticatedStackParamList } from "../types";

const Stack = createStackNavigator<UnAuthenticatedStackParamList>();

const UnAuthenticatedStack = () => {
  return (
    <Stack.Navigator headerMode="none" initialRouteName={"Login"}>
      <Stack.Screen name={"Login"} component={Login} />
      <Stack.Screen name={"Signup"} component={Signup} />
      <Stack.Screen name={"EmailVerification"} component={EmailVerification} />
      <Stack.Screen name={"ResetPassword"} component={ResestPassword} />
    </Stack.Navigator>
  );
};

export default UnAuthenticatedStack;
