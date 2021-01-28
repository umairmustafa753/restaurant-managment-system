import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  RefreshControl,
  TouchableOpacity
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useNavigation, StackActions } from "@react-navigation/native";
import AwesomeAlert from "react-native-awesome-alerts";
import Spinner from "react-native-loading-spinner-overlay";
import { Button, TextInput } from "react-native-paper";
import UserAvatar from "react-native-user-avatar";
import ImageView from "react-native-image-viewing";
import Toast from "react-native-toast-message";
import { connect } from "react-redux";
import moment from "moment";

import UserAction from "../../store/Actions/user";
import { Text, View } from "../../components/Themed";
import Separator from "../../components/Separator";
import List from "../../components/FlatList";
import Back from "../../components/Back";
import { MESSAGE, TYPE } from "../constant";
import { Modal } from "../../components/Modal";
import { ROLE } from "../constant";

const EmployeeList = (props) => {
  const navigator = useNavigation();
  const [isDatePickerVisible, setDatePickerVisibility] = useState<boolean>(
    false
  );
  const [showSpiner, setShowSpiner] = useState<boolean>(false);
  const [isShowAlert, setShowAlert] = useState<boolean>(false);
  const [imagePrieview, setImagePrieview] = useState<boolean>(false);
  const [date, setDate] = useState<string>("");
  const [items, setItems] = useState<any>([]);
  const [user, setUser] = useState<any>();
  const [input, setInput] = useState({
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
    setDate(moment(date, "YYYY-MM").format("YYYY-MM"));
    hideDatePicker();
  };

  const handleNavigationPop = () => {
    navigator.dispatch(StackActions.popToTop());
  };

  const showToast = (msg: string, type: string) => {
    if (msg) {
      Toast.show({
        type: `${type}`,
        position: "top",
        text1: `${msg}`,
        autoHide: false,
        topOffset: 50
      });
      props.resetUpdateEmployee();
    }
  };

  useEffect(() => {
    props.getEmployee({
      role: ROLE.EMPLOYEE,
      token: props?.user?.data?.token
    });
  }, []);

  const showAlert = (user: any) => {
    setUser(user);
    setTimeout(() => {
      setShowAlert(true);
    }, 1000);
  };

  const hideAlert = () => {
    setShowAlert(false);
  };

  const handleSubmit = () => {
    hideAlert();
    if (!input?.salary || !input?.designation) {
      showToast(MESSAGE.FAILED_ENTER_VALID_VALUES, TYPE.ERROR);
      return;
    }
    if (date) {
      user?.paidSalariesMonth.push({ date });
    }
    const obj = {
      _id: user?._id,
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
      dob: user?.dob,
      salary: input?.salary,
      designation: input?.designation,
      paidSalariesMonth: user?.paidSalariesMonth,
      token: props?.user?.data?.token
    };
    props?.updateEmployee(obj);
  };

  useEffect(() => {
    if (!props.loading) {
      const message = props?.requsted?.message;
      const isMatch = MESSAGE.SUCCESS_USER_UPDATED_MESSAGE === message;
      const type = isMatch ? TYPE.SUCCESS : TYPE.ERROR;
      showToast(isMatch ? MESSAGE?.SUCCESS_SALARY_PAID : message, type);
      setItems(props?.employees);
    }
  }, [props?.requsted]);

  useEffect(() => {
    if (!props.loading) {
      setItems(props?.employees);
    }
  }, [props.employees]);

  const onRefresh = () => {
    props.getEmployee({
      role: ROLE.EMPLOYEE,
      token: props?.user?.data?.token
    });
  };

  const setState = (user: any) => {
    setInput({ salary: user?.salary, designation: user?.designation });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Toast ref={(ref) => Toast.setRef(ref)} style={styles.zIndex} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={showSpiner} onRefresh={onRefresh} />
        }
      >
        <Separator margin={30} />
        <View style={{ padding: 30 }}>
          <AwesomeAlert
            show={isShowAlert}
            showProgress={false}
            title="Salary Payment"
            message="Are you sure you want to pay salary"
            closeOnTouchOutside={false}
            closeOnHardwareBackPress={true}
            showCancelButton={true}
            showConfirmButton={true}
            cancelText="No, cancel"
            confirmText="Yes, Pay Salary"
            confirmButtonColor="grey"
            onCancelPressed={hideAlert}
            onConfirmPressed={handleSubmit}
          />
          <Back onPress={handleNavigationPop} />
          <Text style={styles.title}>Employee List</Text>
          <Separator margin={30} />
          <Button mode="outlined" color="grey" onPress={showDatePicker}>
            {date ? date : "Please Select Month"}
          </Button>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleDateConfirm}
            onCancel={hideDatePicker}
          />
          <Separator margin={30} />
          <List
            data={date ? items?.data : []}
            setState={(user) => setState(user)}
          >
            {(modalData, isModalVisible, isVisible) => {
              const isPaid = modalData?.paidSalariesMonth?.some(
                (ele) => ele.date === date
              );
              return (
                <Modal visible={isModalVisible} onClose={isVisible}>
                  <ImageView
                    images={[
                      {
                        uri: modalData?.picture
                      }
                    ]}
                    imageIndex={0}
                    presentationStyle="overFullScreen"
                    visible={imagePrieview}
                    onRequestClose={() => setImagePrieview(false)}
                  />
                  <TouchableOpacity
                    onPress={() =>
                      modalData?.picture ? setImagePrieview(true) : {}
                    }
                  >
                    <UserAvatar
                      size={70}
                      src={modalData?.picture}
                      key={modalData?.picture}
                      name={`${modalData?.firstName} ${modalData?.lastName}`}
                      style={styles.avatar}
                    />
                  </TouchableOpacity>
                  <Separator margin={20} />
                  <Text style={styles.title}>Personal Information</Text>
                  <Text style={styles.text}>{modalData?.email}</Text>
                  <Text
                    style={styles.text}
                  >{`${modalData?.firstName} ${modalData?.lastName}`}</Text>
                  <Text style={styles.title}>Designation</Text>
                  <TextInput
                    placeholder="Designation"
                    theme={{ colors: { primary: "#149dec" } }}
                    style={styles.inputStyle}
                    value={input?.designation}
                    disabled={isPaid}
                    onChangeText={(text) =>
                      setInput((prevState) => ({
                        ...prevState,
                        designation: text
                      }))
                    }
                  />
                  <Separator margin={20} />
                  <Text style={styles.title}>Salary</Text>
                  <TextInput
                    placeholder="Salary"
                    theme={{ colors: { primary: "#149dec" } }}
                    style={styles.inputStyle}
                    value={input?.salary}
                    disabled={isPaid}
                    onChangeText={(text) =>
                      setInput((prevState) => ({
                        ...prevState,
                        salary: text
                      }))
                    }
                    keyboardType={"numeric"}
                  />
                  <Separator margin={20} />
                  {isPaid ? (
                    <Button
                      mode="outlined"
                      color="red"
                      onPress={() => {}}
                      disabled={isPaid}
                    >
                      {"Salary paid"}
                    </Button>
                  ) : (
                    <Button
                      mode="outlined"
                      color="green"
                      onPress={() => {
                        isVisible();
                        showAlert(modalData);
                      }}
                    >
                      {"Pay Salary"}
                    </Button>
                  )}
                  <Separator margin={20} />
                </Modal>
              );
            }}
          </List>
          <Spinner
            visible={props?.loading}
            textContent={"Loading..."}
            textStyle={styles.spinnerTextStyle}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => {
  return {
    employees: state.userReducer.users,
    user: state.userReducer.obj,
    requsted: state.userReducer.requsted,
    loading: state.userReducer.loading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateEmployee: (obj) => {
      dispatch(UserAction.UpdateEmployee(obj));
    },
    getEmployee: (obj) => {
      dispatch(UserAction.GetUsers(obj));
    },
    resetUpdateEmployee: () => {
      dispatch(UserAction.resetUpdateEmployee());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeList);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center"
  },
  padding: {
    padding: 30
  },
  text: {
    textAlign: "center",
    margin: 10
  },
  modalTextStyle: {
    alignSelf: "center",
    width: "70%",
    marginLeft: 10
  },
  zIndex: {
    zIndex: 1
  },
  modalText: {
    width: "80%",
    top: 20,
    textAlign: "center"
  },
  spinnerTextStyle: {
    color: "#fff"
  },
  inputStyle: {
    backgroundColor: "white",
    textAlign: "center"
  },
  avatar: {
    height: 70,
    width: 70,
    alignSelf: "center"
  }
});
