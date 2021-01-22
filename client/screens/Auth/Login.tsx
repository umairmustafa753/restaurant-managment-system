import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Button, TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { connect } from "react-redux";
import Spinner from "react-native-loading-spinner-overlay";
import PasswordInputText from "react-native-hide-show-password-input";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Text, View } from "../../components/Themed";
import { NAVIGATIONS } from "../../constants/navigator";
import Separator from "../../components/Separator";
import Logo from "../../components/Logo";
import UserAction from "../../store/Actions/user";
import { MESSAGE, TYPE } from "../constant";

const Login = (props) => {
  const navigator = useNavigation();

  const [input, setInput] = useState({
    email: "",
    password: ""
  });
  const [enableToast, setEnableToast] = useState({
    visible: false
  });

  const handleSignup = () => {
    navigator.navigate(NAVIGATIONS.SIGNUP);
  };

  const handleForgotPassword = () => {
    navigator.navigate(NAVIGATIONS.EMAIL_VERIFICATION);
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
    props.login(input);
  };

  const handleAccount = () => {
    navigator.reset({ routes: [{ name: NAVIGATIONS.ACCOUNT }] });
  };

  useEffect(() => {
    if (!props.loading && enableToast?.visible) {
      const message = props?.LoginUser?.message;
      const isMatch = MESSAGE.SUCCESS_LOG_IN_MESSAGE === message;
      const type = isMatch ? TYPE.SUCCESS : TYPE.ERROR;
      if (isMatch) {
        handleAccount();
      }
      showToast(message, type);
    }
  }, [props.loading]);

  useEffect(() => {
    const unsubscribe = navigator.addListener("focus", () => {
      setEnableToast((prevState) => ({ ...prevState, visible: true }));
    });

    return unsubscribe;
  }, [navigator]);

  useEffect(() => {
    const unsubscribe = navigator.addListener("focus", () => {
      setEnableToast((prevState) => ({ ...prevState, visible: true }));
    });

    return unsubscribe;
  }, [navigator]);

  const alreadyLogin = async () => {
    let user = await AsyncStorage.getItem("user");
    if (user) {
      user = JSON.parse(user);
    }
  };

  useEffect(() => {
    alreadyLogin();
  }, []);

  return (
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
            <Logo />
            <Separator margin={20} />
            <Text style={styles.title}>Login</Text>
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

            <Button mode="outlined" color="grey" onPress={handleSubmit}>
              Log in
            </Button>
            <Separator margin={20} />
            <View style={styles.row}>
              <Button
                mode="outlined"
                color="grey"
                onPress={handleForgotPassword}
              >
                forgot password
              </Button>
              <Button mode="outlined" color="grey" onPress={handleSignup}>
                Signup
              </Button>
            </View>
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
    LoginUser: state.userReducer.obj,
    loading: state.userReducer.loading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (obj) => {
      dispatch(UserAction.Login(obj));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  zIndex: {
    zIndex: 1
  },
  spinnerTextStyle: {
    color: "#fff"
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
