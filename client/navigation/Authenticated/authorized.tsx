import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Account from "../../screens/Account/Account";
import UpdateAccount from "../../screens/UpdateAccount/UpdateAccount";
import ReservationScreen from "../../screens/Reservation/Reservation";
import AddUser from "../../screens/AddUser/AddUser";
import ConfirmOrders from "../../screens/ConfirmOrders/ConfirmOrders";
import PendingOrders from "../../screens/PendingOrders/PendingOrders";
import CancelOrders from "../../screens/CancelOrders/CancelOrders";
import CustomerList from "../../screens/CustomerList/CustomerList";
import EmployeeList from "../../screens/EmployeeList/EmployeeList";
import { AuthenticatedStackParamList } from "../types";

const Stack = createStackNavigator<AuthenticatedStackParamList>();

const AuthenticatedStack = () => {
  return (
    <Stack.Navigator headerMode="none" initialRouteName={"Account"}>
      <Stack.Screen name={"Account"} component={Account} />
      <Stack.Screen name={"UpdateAccount"} component={UpdateAccount} />
      <Stack.Screen name={"AddUser"} component={AddUser} />
      <Stack.Screen name={"ConfirmOrders"} component={ConfirmOrders} />
      <Stack.Screen name={"PendingOrders"} component={PendingOrders} />
      <Stack.Screen name={"CancelOrders"} component={CancelOrders} />
      <Stack.Screen name={"CustomerList"} component={CustomerList} />
      <Stack.Screen name={"EmployeeList"} component={EmployeeList} />
      <Stack.Screen name={"Reservation"} component={ReservationScreen} />
    </Stack.Navigator>
  );
};

export default AuthenticatedStack;
