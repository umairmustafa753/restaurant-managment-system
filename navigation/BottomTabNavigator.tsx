import { MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";

import HomeScreen from "../screens/Home/HomeScreen";
import MenuScreen from "../screens/Menu/MenuScreen";
import ReservationScreen from "../screens/Reservation/Reservation";
import AccountScreen from "../screens/Account/Account";
import {
  BottomTabParamList,
  HomeParamList,
  MenuParamList,
  ReservationParamList,
  AccountParamList
} from "../types";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  return (
    <BottomTab.Navigator initialRouteName="Home">
      <BottomTab.Screen
        name="Home"
        component={HomeScreenNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="home-work" color={color} />
          )
        }}
      />
      <BottomTab.Screen
        name="Menu"
        component={MenuScreenNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="restaurant-menu" color={color} />
          )
        }}
      />
      <BottomTab.Screen
        name="Reservation"
        component={ReservationScreenNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="dinner-dining" color={color} />
          )
        }}
      />
      <BottomTab.Screen
        name="Account"
        component={AccountStackScreenNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="account-circle" color={color} />
          )
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
  return <MaterialIcons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const HomeStack = createStackNavigator<HomeParamList>();

function HomeScreenNavigator() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerTitle: "Home" }}
      />
    </HomeStack.Navigator>
  );
}

const MenuStack = createStackNavigator<MenuParamList>();

function MenuScreenNavigator() {
  return (
    <MenuStack.Navigator>
      <MenuStack.Screen
        name="MenuScreen"
        component={MenuScreen}
        options={{ headerTitle: "Menu" }}
      />
    </MenuStack.Navigator>
  );
}

const ReservationStack = createStackNavigator<ReservationParamList>();

function ReservationScreenNavigator() {
  return (
    <ReservationStack.Navigator>
      <ReservationStack.Screen
        name="ReservationScreen"
        component={ReservationScreen}
        options={{ headerTitle: "Reservation" }}
      />
    </ReservationStack.Navigator>
  );
}

const AccountStack = createStackNavigator<AccountParamList>();

function AccountStackScreenNavigator() {
  return (
    <AccountStack.Navigator>
      <AccountStack.Screen
        name="AccountScreen"
        component={AccountScreen}
        options={{ headerTitle: "Account" }}
      />
    </AccountStack.Navigator>
  );
}
