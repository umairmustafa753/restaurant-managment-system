import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Account from "../../screens/Account/Account";
import UpdateAccount from "../../screens/UpdateAccount/UpdateAccount";
import AddUser from "../../screens/AddUser/AddUser";
import { AuthenticatedStackParamList } from "../types";

const Stack = createStackNavigator<AuthenticatedStackParamList>();

const AuthenticatedStack = () => {
  return (
    <Stack.Navigator headerMode="none" initialRouteName={"Account"}>
      <Stack.Screen name={"Account"} component={Account} />
      <Stack.Screen name={"UpdateAccount"} component={UpdateAccount} />
      <Stack.Screen name={"AddUser"} component={AddUser} />
    </Stack.Navigator>
  );
};

export default AuthenticatedStack;
