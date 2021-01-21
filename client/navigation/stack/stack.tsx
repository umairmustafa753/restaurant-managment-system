import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Login from "../../screens/Auth/Login";
import Signup from "../../screens/Auth/Signup";
import EmailVerification from "../../screens/Auth/EmailVerification";
import ResestPassword from "../../screens/Auth/ResetPassword";
import Account from "../../screens/Account/Account";
import UpdateAccount from "../../screens/UpdateAccount/UpdateAccount";
import ReservationScreen from "../../screens/Reservation/Reservation";
import AddUser from "../../screens/AddUser/AddUser";
import ConfirmOrders from "../../screens/ConfirmOrders/ConfirmOrders";
import PendingOrders from "../../screens/PendingOrders/PendingOrders";
import CancelOrders from "../../screens/CancelOrders/CancelOrders";
import CustomerList from "../../screens/CustomerList/CustomerList";
import EmployeeList from "../../screens/EmployeeList/EmployeeList";
import { StackParamList } from "../types";

const Stack = createStackNavigator<StackParamList>();

const StackScreens = () => {
  return (
    <Stack.Navigator headerMode="none" initialRouteName={"Login"}>
      <Stack.Screen name={"Login"} component={Login} />
      <Stack.Screen name={"Signup"} component={Signup} />
      <Stack.Screen name={"EmailVerification"} component={EmailVerification} />
      <Stack.Screen name={"ResetPassword"} component={ResestPassword} />
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

export default StackScreens;
