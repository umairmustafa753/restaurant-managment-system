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

const ConfirmOrders = () => {
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
          <Text style={styles.title}>Confirm Orders</Text>
          <Separator margin={30} />
          <Button mode="outlined" color="grey" onPress={showDatePicker}>
            {date ? date : "Please Select Date"}
          </Button>
          <Separator margin={30} />
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleDateConfirm}
            onCancel={hideDatePicker}
          />
          <List data={[]}>
            {(modalData, isModalVisible, isVisible) => (
              <Modal visible={isModalVisible} onClose={isVisible}>
                <View style={styles.row}>
                  <UserAvatar
                    size={70}
                    // src={}
                    name="Umair Mustafa"
                    style={styles.avatar}
                  />
                  <Text style={styles.modalTextStyle}>
                    Umair Mustafa Order booking date 2021-12-20 8:30 PM
                  </Text>
                </View>
                <Separator margin={20} />
                <Text>Menu Items</Text>
                <Text style={styles.modalText}>{modalData?.title}</Text>
                <Separator margin={20} />
                <Text>50% advance amount</Text>
                <Text style={styles.modalText}>{modalData?.title}</Text>
                <Separator margin={20} />
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
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center"
  },
  padding: {
    padding: 30
  },
  row: {
    flexDirection: "row"
  },
  spaceBetween: {
    justifyContent: "space-between"
  },
  modalTextStyle: {
    alignSelf: "center",
    width: "70%",
    marginLeft: 10
  },
  modalText: {
    width: "80%"
  },
  avatar: {
    height: 70,
    width: 70,
    alignSelf: "center"
  }
});

export default ConfirmOrders;
