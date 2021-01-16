import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Account from "../../screens/Account/Account";
import { AuthenticatedStackParamList } from "../types";

const Stack = createStackNavigator<AuthenticatedStackParamList>();

const UnAuthenticatedStack = () => {
  return (
    <Stack.Navigator headerMode="none" initialRouteName={"Account"}>
      <Stack.Screen name={"Account"} component={Account} />
    </Stack.Navigator>
  );
};

export default UnAuthenticatedStack;
