import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Button, TextInput } from "react-native-paper";

import PasswordInputText from "react-native-hide-show-password-input";
import moment from "moment";

import { Text, View } from "../../components/Themed";
import Separator from "../../components/Separator";
import Logo from "../../components/Logo";

const navigate = () => {
  console.log("in navigation");
};

const Signup = () => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState<boolean>(
    false
  );
  const [date, setDate] = useState<string>("");

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleDateConfirm = (date) => {
    setDate(moment(date, "YYYY-MM-DD").format("YYYY-MM-DD"));
    hideDatePicker();
  };

  return (
    <>
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
              <Text style={styles.title}>Sign Up</Text>
              <TextInput
                label="First Name"
                theme={{ colors: { primary: "#149dec" } }}
                style={styles.inputStyle}
                value={""}
                onChangeText={(text) => {}}
              />
              <TextInput
                label="Last Name"
                theme={{ colors: { primary: "#149dec" } }}
                style={styles.inputStyle}
                value={""}
                onChangeText={(text) => {}}
              />
              <TextInput
                label="Email"
                theme={{ colors: { primary: "#149dec" } }}
                style={styles.inputStyle}
                value={""}
                onChangeText={(text) => {}}
              />
              <PasswordInputText value={""} onChangeText={() => {}} />
              <Separator margin={20} />
              <Button mode="outlined" color="grey" onPress={showDatePicker}>
                {date ? date : "Date of Birth"}
              </Button>
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleDateConfirm}
                onCancel={hideDatePicker}
              />
              <Separator margin={20} />
              <Button mode="outlined" color="grey" onPress={() => {}}>
                Submit
              </Button>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
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
  padding: {
    padding: 30
  },
  inputStyle: {
    backgroundColor: "white"
  }
});

export default Signup;
