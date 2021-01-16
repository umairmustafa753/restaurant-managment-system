import React from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import UserAvatar from "react-native-user-avatar";

import { NAVIGATIONS } from "../../constants/navigator";
import { Text, View } from "../../components/Themed";
import { ScrollView } from "react-native-gesture-handler";

import Card from "../../components/Card";
import Separator from "../../components/Separator";

const AccountScreen = () => {
  const navigator = useNavigation();

  const navigate = (to) => {
    navigator.navigate(to);
  };
  return (
    <SafeAreaView style={styles.container}>
      <Separator margin={30} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.padding}>
          <UserAvatar
            size={80}
            // src={}
            name="Umair Mustafa"
            style={styles.avatar}
          />
          <Separator margin={10} />
          <Text style={styles.title}>Umair Mustafa</Text>
          <Text style={styles.subTitle}>Owner</Text>
          <Separator margin={10} />
          <Card
            titile="Upadte Account/Details"
            onPress={() => navigate(NAVIGATIONS.UPDATE_ACCOUNT)}
          />
          <Card
            titile="Add User"
            onPress={() => navigate(NAVIGATIONS.ADD_USER)}
          />
          <Card
            titile="Confirm Orders"
            onPress={() => {
              navigate(NAVIGATIONS.CONFIRM_ORDERS);
            }}
          />
          <Card titile="Pending Orders" onPress={() => {}} />
          <Card titile="Cancel Orders" onPress={() => {}} />
          <Card titile="Customers List" onPress={() => {}} />
          <Card titile="Employees List" onPress={() => {}} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center"
  },
  subTitle: {
    fontSize: 15,
    textAlign: "center"
  },
  padding: {
    padding: 30
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%"
  },
  avatar: {
    height: 80,
    width: 80,
    alignSelf: "center"
  }
});

export default AccountScreen;
