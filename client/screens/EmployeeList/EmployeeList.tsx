import React, { useEffect, useState } from "react";
import { StyleSheet, SafeAreaView, ScrollView } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useNavigation, StackActions } from "@react-navigation/native";
import { Button, TextInput } from "react-native-paper";
import UserAvatar from "react-native-user-avatar";
import { connect } from "react-redux";
import moment from "moment";

import UserAction from "../../store/Actions/user";
import { Text, View } from "../../components/Themed";
import Separator from "../../components/Separator";
import List from "../../components/FlatList";
import Back from "../../components/Back";
import { Modal } from "../../components/Modal";
import { ROLE } from "../constant";

const EmployeeList = (props) => {
  const navigator = useNavigation();
  const [isDatePickerVisible, setDatePickerVisibility] = useState<boolean>(
    false
  );
  const [date, setDate] = useState<string>("");
  const [items, setItems] = useState<any>([]);
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

  useEffect(() => {
    props.getEmployee({
      role: ROLE.EMPLOYEE,
      token: props?.user?.data?.token
    });
  }, []);

  const handleSubmit = (user: any) => {
    if (date) {
      user?.paidSalariesMonth.push({ date });
    }
    const obj = {
      _id: user?._id,
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
      dob: user?.dob,
      salary: input?.salary ? input?.salary : user?.salary,
      designation: input?.designation ? input?.designation : user?.designation,
      paidSalariesMonth: user?.paidSalariesMonth,
      token: props?.user?.data?.token
    };
    props?.updateEmployee(obj);
  };

  useEffect(() => {
    setItems(props?.employees);
  }, [props?.employees]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Separator margin={30} />
        <View style={{ padding: 30 }}>
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
          {!props.loading && (
            <List data={date ? items?.data : []}>
              {(modalData, isModalVisible, isVisible) => {
                const isPaid = modalData?.paidSalariesMonth.some(
                  (ele) => ele.date === date
                );
                return (
                  <Modal visible={isModalVisible} onClose={isVisible}>
                    <UserAvatar
                      size={70}
                      src={modalData?.picture}
                      key={modalData?.picture}
                      name={`${modalData?.firstName} ${modalData?.lastName}`}
                      style={styles.avatar}
                    />
                    <Separator margin={20} />
                    <Text style={styles.title}>Designation</Text>
                    <TextInput
                      label="Designation"
                      theme={{ colors: { primary: "#149dec" } }}
                      style={styles.inputStyle}
                      value={modalData?.designation}
                      disabled={isPaid}
                      onChangeText={(text) =>
                        setInput((prevState) => ({
                          ...prevState,
                          designation: text
                        }))
                      }
                    />
                    <Separator margin={20} />
                    <Text style={styles.title}>Personal Information</Text>
                    <Text style={styles.text}>{modalData?.email}</Text>
                    <Text
                      style={styles.text}
                    >{`${modalData?.firstName} ${modalData?.lastName}`}</Text>
                    <TextInput
                      label="Salary"
                      theme={{ colors: { primary: "#149dec" } }}
                      style={styles.inputStyle}
                      value={modalData?.salary}
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
                        onPress={() => handleSubmit(modalData)}
                      >
                        {"Pay Salary"}
                      </Button>
                    )}
                    <Separator margin={20} />
                  </Modal>
                );
              }}
            </List>
          )}
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
  modalText: {
    width: "80%",
    top: 20,
    textAlign: "center"
  },
  inputStyle: {
    backgroundColor: "white"
  },
  avatar: {
    height: 70,
    width: 70,
    alignSelf: "center"
  }
});
