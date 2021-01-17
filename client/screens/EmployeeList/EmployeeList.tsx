import React, { useState } from "react";
import { StyleSheet, SafeAreaView, ScrollView } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useNavigation, StackActions } from "@react-navigation/native";
import { Button } from "react-native-paper";
import UserAvatar from "react-native-user-avatar";
import moment from "moment";

import { Text, View } from "../../components/Themed";
import Separator from "../../components/Separator";
import List from "../../components/FlatList";
import Back from "../../components/Back";
import { Modal } from "../../components/Modal";

const EmployeeList = () => {
  const navigator = useNavigation();
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

  const handleNavigationPop = () => {
    navigator.dispatch(StackActions.popToTop());
  };

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
          <List data={[]}>
            {(modalData, isModalVisible, isVisible) => (
              <Modal visible={isModalVisible} onClose={isVisible}>
                <UserAvatar
                  size={70}
                  // src={}
                  name="Umair Mustafa"
                  style={styles.avatar}
                />
                <Separator margin={20} />
                <Text style={styles.title}>Designation</Text>
                <Text style={styles.text}>Chef</Text>
                <Text style={styles.title}>Salary</Text>
                <Text style={styles.text}>5000</Text>
                <Text style={styles.title}>Personal Information</Text>
                <Text style={styles.text}>umair@gmail.com</Text>
                <Text style={styles.text}>Umair Mustafa</Text>
                <Separator margin={20} />
                {false ? (
                  <Button mode="outlined" color="green" onPress={() => {}}>
                    {"Salary paid"}
                  </Button>
                ) : (
                  <Button mode="outlined" color="red" onPress={() => {}}>
                    {"Pay Salary"}
                  </Button>
                )}
              </Modal>
            )}
          </List>
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
  avatar: {
    height: 70,
    width: 70,
    alignSelf: "center"
  }
});

export default EmployeeList;
