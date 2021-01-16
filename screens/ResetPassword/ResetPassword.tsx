import * as React from "react";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import { Button } from "react-native-paper";
import { useNavigation, StackActions } from "@react-navigation/native";

import { NAVIGATIONS } from "../../constants/navigator";
import Separator from "../../components/Separator";
import { Text, View } from "../../components/Themed";
import Back from "../../components/Back";
import PasswordInputText from "react-native-hide-show-password-input";

const ResestPassword = () => {
  const navigator = useNavigation();

  const handleLogin = () => {
    navigator.navigate(NAVIGATIONS.EMAIL_VERIFICATION);
  };

  const handleNavigationPop = () => {
    navigator.dispatch(StackActions.popToTop());
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={30}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.padding}>
            <Back onPress={handleNavigationPop} />
            <Text style={styles.title}>Enter New Password</Text>
            <Separator margin={20} />
            <PasswordInputText value={""} onChangeText={() => {}} />
            <Separator margin={20} />
            <PasswordInputText
              value={""}
              label="Confirm Password"
              onChangeText={() => {}}
            />
            <Separator margin={20} />
            <Button mode="outlined" color="grey" onPress={handleLogin}>
              Submit
            </Button>
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
  }
});

export default ResestPassword;
