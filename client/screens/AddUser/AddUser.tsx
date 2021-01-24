import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Picker
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Button, TextInput, Menu } from "react-native-paper";
import { useNavigation, StackActions } from "@react-navigation/native";
import PasswordInputText from "react-native-hide-show-password-input";
import { NAVIGATIONS } from "../../constants/navigator";
import { MESSAGE, TYPE } from "../constant";
import { connect } from "react-redux";
import Toast from "react-native-toast-message";
import UserAction from "../../store/Actions/user";
import Spinner from "react-native-loading-spinner-overlay";
import moment from "moment";

import { Text, View } from "../../components/Themed";
import Separator from "../../components/Separator";
import Logo from "../../components/Logo";
import Back from "../../components/Back";

const AddUser = (props) => {
  const navigator = useNavigation();

  const [isDatePickerVisible, setDatePickerVisibility] = useState<boolean>(
    false
  );
  const [disabled, setDisabled] = useState<boolean>(false);
  const [enableToast, setEnableToast] = useState({
    visible: false
  });
  const [input, setInput] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    dob: "",
    role: "",
    salary: "",
    designation: ""
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

  const handleNavigate = () => {
    navigator.reset({
      routes: [
        {
          name: NAVIGATIONS.SUCCESS,
          params: {
            msg: MESSAGE.SUCCESS_USER_ADDED_MESSAGE,
            navigateTo: NAVIGATIONS.ACCOUNT
          }
        }
      ]
    });
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
    setDisabled(true);
    props.add(input);
  };

  useEffect(() => {
    if (!props.loading && enableToast?.visible) {
      const message = props?.addUser?.message;
      const isMatch = MESSAGE.SUCCESS_SIGN_UP_MESSAGE === message;
      const type = isMatch ? TYPE.SUCCESS : TYPE.ERROR;
      showToast(isMatch ? MESSAGE.SUCCESS_USER_ADDED_MESSAGE : message, type);
      if (isMatch) {
        handleNavigate();
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
              <Text style={styles.title}>Add User</Text>
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
              <Picker
                selectedValue={input.role}
                onValueChange={(text) =>
                  setInput((prevState) => ({ ...prevState, role: text }))
                }
              >
                <Picker.Item label="customer" value="customer" />
                <Picker.Item label="employee" value="employee" />
              </Picker>
              <Separator margin={20} />
              {true && (
                <View>
                  <TextInput
                    label="Salary"
                    theme={{ colors: { primary: "#149dec" } }}
                    style={styles.inputStyle}
                    value={input?.salary}
                    onChangeText={(text) =>
                      setInput((prevState) => ({ ...prevState, salary: text }))
                    }
                    keyboardType={"numeric"}
                  />
                  <Separator margin={20} />
                  <TextInput
                    label="Designation"
                    theme={{ colors: { primary: "#149dec" } }}
                    style={styles.inputStyle}
                    value={input?.designation}
                    onChangeText={(text) =>
                      setInput((prevState) => ({
                        ...prevState,
                        designation: text
                      }))
                    }
                  />
                </View>
              )}
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
              <Button
                mode="outlined"
                color="grey"
                onPress={handleSubmit}
                disabled={disabled}
              >
                Add User
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
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    addUser: state.userReducer.addUser,
    loading: state.userReducer.loading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    add: (obj) => {
      dispatch(UserAction.AddUser(obj));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddUser);

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
  spinnerTextStyle: {
    color: "#fff"
  },
  padding: {
    padding: 30
  },
  inputStyle: {
    backgroundColor: "white"
  },
  zIndex: {
    zIndex: 1
  }
});
