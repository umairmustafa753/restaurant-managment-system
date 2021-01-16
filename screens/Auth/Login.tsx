import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Button, TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import PasswordInputText from "react-native-hide-show-password-input";

import { Text, View } from "../../components/Themed";
import { NAVIGATIONS } from "../../constants/navigator";
import Separator from "../../components/Separator";
import Logo from "../../components/Logo";

const navigate = () => {
  console.log("in navigation");
};

const Login = () => {
  const navigator = useNavigation();

  const handleSignup = () => {
    navigator.navigate(NAVIGATIONS.SIGNUP);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Separator margin={30} />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={30}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.padding}>
            <Logo />
            <Separator margin={20} />
            <Text style={styles.title}>Login</Text>
            <TextInput
              label="Email"
              theme={{ colors: { primary: "#149dec" } }}
              style={styles.inputStyle}
              value={""}
              onChangeText={(text) => {}}
            />
            <PasswordInputText value={""} onChangeText={() => {}} />
            <Separator margin={20} />

            <Button mode="outlined" color="grey" onPress={() => {}}>
              Submit
            </Button>
            <Separator margin={20} />
            <View style={styles.row}>
              <Button mode="outlined" color="grey">
                forgot password
              </Button>
              <Button mode="outlined" color="grey" onPress={handleSignup}>
                Signup
              </Button>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
  padding: {
    padding: 30
  },
  inputStyle: {
    backgroundColor: "white"
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between"
  }
});

export default Login;
