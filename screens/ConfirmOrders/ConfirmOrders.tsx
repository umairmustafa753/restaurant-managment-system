import React, { useState } from "react";
import { StyleSheet, SafeAreaView, ScrollView } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useNavigation, StackActions } from "@react-navigation/native";
import { Button } from "react-native-paper";
import moment from "moment";

import { Text, View } from "../../components/Themed";
import Separator from "../../components/Separator";
import List from "../../components/FlatList";
import Back from "../../components/Back";

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
            {date ? date : "Date of Birth"}
          </Button>
          <Separator margin={30} />
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleDateConfirm}
            onCancel={hideDatePicker}
          />
          <List data={[]} />
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
  }
});

export default ConfirmOrders;
