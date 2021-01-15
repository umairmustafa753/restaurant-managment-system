import React from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import UserAvatar from "react-native-user-avatar";

import { Text, View } from "../../components/Themed";
import { ScrollView } from "react-native-gesture-handler";

import Card from "../../components/Card";
import Login from "../Auth/Login";
import Separator from "../../components/Separator";

const navigate = () => {
  console.log("in navigation");
};

const AccountScreen = () => {
  return (
    <>
      {false ? (
        <Login />
      ) : (
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
              <Card titile="Upadte Account" onPress={navigate} />
              <Card titile="Add Employee" onPress={navigate} />
              <Card titile="Reset Password" onPress={navigate} />
              <Card titile="Confirm Orders" onPress={navigate} />
              <Card titile="Pending Orders" onPress={navigate} />
              <Card titile="Customers & Employees List" onPress={navigate} />
            </View>
          </ScrollView>
        </SafeAreaView>
      )}
    </>
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
