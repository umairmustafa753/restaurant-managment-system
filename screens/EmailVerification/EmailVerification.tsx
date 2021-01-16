import * as React from "react";
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from "react-native";
import { useNavigation, StackActions } from "@react-navigation/native";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import { Button, TextInput } from "react-native-paper";

import Back from "../../components/Back";
import Separator from "../../components/Separator";

const EmailVerifcation = () => {
  const navigator = useNavigation();

  const handleNavigationPop = () => {
    navigator.dispatch(StackActions.popToTop());
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.padding}>
          <Back onPress={handleNavigationPop} />
          <Text style={styles.title}>Email Verification</Text>
          <TextInput
            label="Email"
            theme={{ colors: { primary: "#149dec" } }}
            style={styles.inputStyle}
            value={""}
            onChangeText={(text) => {}}
          />
          <Separator margin={50} />
          {true && (
            <Button mode="outlined" color="grey" onPress={() => {}}>
              Send Email
            </Button>
          )}
          {true && (
            <View>
              <Separator margin={50} />
              <Text style={styles.title}>Please Enter Code</Text>
              <Separator margin={50} />
              <OTPInputView
                pinCount={4}
                style={styles.otp}
                codeInputFieldStyle={styles.codeInputFieldStyle}
              />
              <Separator margin={50} />
              <Button mode="outlined" color="grey" onPress={() => {}}>
                Submit
              </Button>
            </View>
          )}
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
  inputStyle: {
    backgroundColor: "white"
  },
  padding: {
    padding: 30
  },
  codeInputFieldStyle: {
    borderColor: "black",
    color: "black",
    margin: 20
  },
  otp: {
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 80,
    position: "absolute"
  }
});

export default EmailVerifcation;
