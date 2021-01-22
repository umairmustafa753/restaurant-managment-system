import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import { Button } from "react-native-paper";
import {
  useNavigation,
  useRoute,
  StackActions
} from "@react-navigation/native";
import Toast from "react-native-toast-message";
import PasswordInputText from "react-native-hide-show-password-input";

import UserAction from "../../store/Actions/user";
import Separator from "../../components/Separator";
import Spinner from "react-native-loading-spinner-overlay";
import { Text, View } from "../../components/Themed";
import { connect } from "react-redux";
import { NAVIGATIONS } from "../../constants/navigator";
import { MESSAGE, TYPE } from "../constant";

const ResestPassword = (props) => {
  const navigator = useNavigation();
  const route = useRoute();

  const [input, setInput] = useState({
    password: "",
    confirmPassword: ""
  });

  const [disabled, setDisabled] = useState<boolean>(false);

  const [enableToast, setEnableToast] = useState({
    visible: false
  });

  const handleNavigate = () => {
    navigator.reset({
      routes: [
        {
          name: NAVIGATIONS.SUCCESS,
          params: {
            msg: MESSAGE.SUCCESS_PASSWORD_MESSAGE,
            navigateTo: NAVIGATIONS.LOGIN
          }
        }
      ]
    });
  };

  const handleSubmit = () => {
    if (input?.confirmPassword === input?.password) {
      const obj = {
        email: route?.params?.email,
        password: input?.password
      };
      props.passowrdReset(obj);
    } else {
      showToast(MESSAGE.FAILED_PASSWORD_NOT_MATCH, TYPE.ERROR);
    }
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
      const message = props?.password?.message;
      const isMatch = MESSAGE.SUCCESS_PASSWORD_MESSAGE === message;
      const type = isMatch ? TYPE.SUCCESS : TYPE.ERROR;
      showToast(message, type);
      setDisabled(isMatch);
      if (isMatch) {
        handleNavigate();
      }
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
            <Text style={styles.title}>Enter New Password</Text>
            <Separator margin={20} />
            <PasswordInputText
              value={input?.password}
              onChangeText={(text) =>
                setInput((prevState) => ({ ...prevState, password: text }))
              }
            />
            <Separator margin={20} />
            <PasswordInputText
              value={input?.confirmPassword}
              label="Confirm Password"
              onChangeText={(text) =>
                setInput((prevState) => ({
                  ...prevState,
                  confirmPassword: text
                }))
              }
            />
            <Separator margin={20} />
            <Button
              mode="outlined"
              color="grey"
              onPress={handleSubmit}
              disabled={disabled}
            >
              Submit
            </Button>
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
    password: state.userReducer.obj,
    loading: state.userReducer.loading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    passowrdReset: (obj) => {
      dispatch(UserAction.ResetPassword(obj));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResestPassword);

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
  }
});
