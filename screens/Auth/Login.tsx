import React from "react";
import { StyleSheet, SafeAreaView } from "react-native";

import { Text, View } from "../../components/Themed";
import { ScrollView } from "react-native-gesture-handler";

import Separator from "../../components/Separator";

const navigate = () => {
  console.log("in navigation");
};

const Login = () => {
  return (
    <>
      <SafeAreaView style={styles.container}>
        <Separator margin={30} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.padding}>
            <Text>Login</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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

export default Login;
