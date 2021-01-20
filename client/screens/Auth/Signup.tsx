import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Button, TextInput } from "react-native-paper";
import { useNavigation, StackActions } from "@react-navigation/native";
import { connect } from "react-redux";
import PasswordInputText from "react-native-hide-show-password-input";
import Toast from "react-native-toast-message";
import moment from "moment";

import { Text, View } from "../../components/Themed";
import Separator from "../../components/Separator";
import Logo from "../../components/Logo";
import Back from "../../components/Back";
import UserAction from "../../store/Actions/user";
import { MESSAGE, TYPE } from "../constant";

const Signup = (props) => {
  const navigator = useNavigation();

  const [isDatePickerVisible, setDatePickerVisibility] = useState<boolean>(
    false
  );
  const [input, setInput] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    dob: ""
  });

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleDateConfirm = (date) => {
    setInput((prevState) => ({
      ...prevState,
      dob: moment(date, "YYYY-MM-DD").format("YYYY-MM-DD")
    }));
    hideDatePicker();
  };

  const handleNavigationPop = () => {
    navigator.dispatch(StackActions.popToTop());
  };

  const showToast = (msg: string, type: string) => {
    Toast.show({
      type: `${type}`,
      position: "top",
      text1: `${msg}`,
      autoHide: false,
      topOffset: 50
    });
  };

  const handleSubmit = async () => {
    await props.signup(input);
    const message = props?.SignUpUser?.message;
    if (message) {
      const type =
        MESSAGE.SUCCESS_SIGN_UP_MESSAGE === message ? TYPE.SUCCESS : TYPE.ERROR;
      showToast(message, type);
    }
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Toast ref={(ref) => Toast.setRef(ref)} style={styles.zIndex} />
        <Separator margin={30} />
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          keyboardVerticalOffset={30}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.padding}>
              <Back onPress={handleNavigationPop} />
              <Logo />
              <Separator margin={20} />
              <Text style={styles.title}>Sign Up</Text>
              <TextInput
                label="First Name"
                theme={{ colors: { primary: "#149dec" } }}
                style={styles.inputStyle}
                value={input?.firstName}
                onChangeText={(text) =>
                  setInput((prevState) => ({ ...prevState, firstName: text }))
                }
              />
              <TextInput
                label="Last Name"
                theme={{ colors: { primary: "#149dec" } }}
                style={styles.inputStyle}
                value={input?.lastName}
                onChangeText={(text) =>
                  setInput((prevState) => ({ ...prevState, lastName: text }))
                }
              />
              <TextInput
                label="Email"
                theme={{ colors: { primary: "#149dec" } }}
                style={styles.inputStyle}
                value={input?.email}
                onChangeText={(text) =>
                  setInput((prevState) => ({ ...prevState, email: text }))
                }
              />
              <PasswordInputText
                value={input?.password}
                onChangeText={(text) =>
                  setInput((prevState) => ({ ...prevState, password: text }))
                }
              />
              <Separator margin={20} />
              <Button mode="outlined" color="grey" onPress={showDatePicker}>
                {input?.dob ? input?.dob : "Date of Birth"}
              </Button>
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleDateConfirm}
                onCancel={hideDatePicker}
              />
              <Separator margin={20} />
              <Button mode="outlined" color="grey" onPress={handleSubmit}>
                Create Account
              </Button>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    SignUpUser: state.userReducer.obj
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signup: (obj) => {
      dispatch(UserAction.Signup(obj));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  zIndex: {
    zIndex: 1
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
