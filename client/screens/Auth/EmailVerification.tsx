import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import { useNavigation, StackActions } from "@react-navigation/native";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import Spinner from "react-native-loading-spinner-overlay";
import { Button, TextInput } from "react-native-paper";
import Toast from "react-native-toast-message";
import { connect } from "react-redux";

import { Text, View } from "../../components/Themed";
import Back from "../../components/Back";
import { NAVIGATIONS } from "../../constants/navigator";
import UserAction from "../../store/Actions/user";
import Separator from "../../components/Separator";
import { MESSAGE, TYPE } from "../constant";

const EmailVerifcation = (props) => {
  const navigator = useNavigation();

  const [input, setInput] = useState({
    email: "",
    otp: ""
  });

  const [enableToast, setEnableToast] = useState({
    visible: false
  });

  const [disabled, setDisabled] = useState<boolean>(false);

  const [isEmailSend, setEmailSend] = useState<boolean>(false);

  const handleNavigationPop = () => {
    navigator.dispatch(StackActions.popToTop());
  };

  const _handleEmailVerification = () => {
    setDisabled(true);
    handleEmailVerification();
  };

  const handleEmailVerification = () => {
    props.emailVerifcation(input);
  };

  const handleOtpVerification = () => {
    props.otpVerifcation(input);
  };

  const handleReset = () => {
    navigator.reset({
      routes: [
        {
          name: NAVIGATIONS.RESEST_PASSWORD,
          params: {
            email: input?.email
          }
        }
      ]
    });
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

  useEffect(() => {
    if (!props.loading && enableToast?.visible) {
      const message = props?.Verifcation?.message;
      const email = MESSAGE.SUCCESS_OTP_SENDED_MESSAGE;
      const otp = MESSAGE.SUCCESS_OTP_MESSAGE;
      const isOTPMatch = message !== otp;
      if (!isEmailSend) {
        setEmailSend(message == email);
      }
      const type =
        message == email || message == otp ? TYPE.SUCCESS : TYPE.ERROR;
      showToast(message, type);
      if (!isOTPMatch) {
        handleReset();
      }
      setDisabled(false);
    }
  }, [props.loading]);

  useEffect(() => {
    const unsubscribe = navigator.addListener("focus", () => {
      setEnableToast((prevState) => ({ ...prevState, visible: true }));
    });

    return unsubscribe;
  }, [navigator]);

  return (
    <SafeAreaView style={styles.container}>
      <Toast ref={(ref) => Toast.setRef(ref)} style={styles.zIndex} />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={30}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.padding}>
            <Back onPress={handleNavigationPop} />
            <Text style={styles.title}>Email Verification</Text>
            <TextInput
              label="Email"
              theme={{ colors: { primary: "#149dec" } }}
              style={styles.inputStyle}
              value={input?.email}
              disabled={isEmailSend}
              onChangeText={(text) =>
                setInput((prevState) => ({ ...prevState, email: text }))
              }
            />
            <Separator margin={50} />
            {!isEmailSend && (
              <Button
                mode="outlined"
                color="grey"
                onPress={_handleEmailVerification}
                disabled={disabled}
              >
                Send code
              </Button>
            )}
            {isEmailSend && (
              <View>
                <Separator margin={50} />
                <Text style={styles.title}>Please Enter Code</Text>
                <Separator margin={50} />
                <OTPInputView
                  pinCount={4}
                  style={styles.otp}
                  codeInputFieldStyle={styles.codeInputFieldStyle}
                  onCodeFilled={(code) =>
                    setInput((prevState) => ({ ...prevState, otp: code }))
                  }
                />
                <Separator margin={50} />
                <Button
                  mode="outlined"
                  color="grey"
                  onPress={handleOtpVerification}
                >
                  Submit
                </Button>
              </View>
            )}
          </View>
          <Spinner
            visible={props?.loading}
            textContent={"Loading..."}
            textStyle={styles.spinnerTextStyle}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => {
  return {
    Verifcation: state.userReducer.obj,
    loading: state.userReducer.loading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    emailVerifcation: (obj) => {
      dispatch(UserAction.EmailVerification(obj));
    },
    otpVerifcation: (obj) => {
      dispatch(UserAction.OTPVerification(obj));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EmailVerifcation);

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
  spinnerTextStyle: {
    color: "#fff"
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
