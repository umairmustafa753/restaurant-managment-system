import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import { Button, Card, Title, Paragraph, TextInput } from "react-native-paper";
import MultiSelect from "react-native-multiple-select";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { CreditCardInput } from "react-native-input-credit-card";
import moment from "moment";

import { Text, View } from "../../components/Themed";
import { ScrollView } from "react-native-gesture-handler";
import Separator from "../../components/Separator";

let MULTISELECT: MultiSelect;
const items = [
  {
    id: "92iijs7yta",
    name: "Ondo"
  },
  {
    id: "a0s0a8ssbsd",
    name: "Ogun"
  },
  {
    id: "16hbajsabsd",
    name: "Calabar"
  },
  {
    id: "nahs75a5sg",
    name: "Lagos"
  },
  {
    id: "667atsas",
    name: "Maiduguri"
  },
  {
    id: "hsyasajs",
    name: "Anambra"
  },
  {
    id: "djsjudksjd",
    name: "Benue"
  },
  {
    id: "sdhyaysdj",
    name: "Kaduna"
  },
  {
    id: "suudydjsjd",
    name: "Abuja"
  }
];

export default function ReservationScreen() {
  const [selectedItems, setSelectedItems] = useState<Array<object>>([]);
  const [isDatePickerVisible, setDatePickerVisibility] = useState<boolean>(
    false
  );
  const [isTimePickerVisible, setTimePickerVisible] = useState<boolean>(false);
  const [cardCardentials, setCardCarenditals] = useState<object>({});
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const showTimePicker = () => {
    setTimePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const hideTimePciker = () => {
    setTimePickerVisible(false);
  };

  const handleDateConfirm = (date) => {
    setDate(moment(date, "YYYY-MM-DD").format("YYYY-MM-DD"));
    hideDatePicker();
  };

  const handleTimeConfirm = (time) => {
    setTime(moment(time, "HH:mm:ss").format("hh:mm A"));
    hideTimePciker();
  };

  const onSelectedItemsChange = (selectedItems) => {
    setSelectedItems(selectedItems);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Separator margin={30} />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={30}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>Reservation Info</Text>
          <View style={styles.padding}>
            <TextInput
              label="First Name"
              theme={{ colors: { primary: "#149dec" } }}
              style={styles.inputStyle}
              value={""}
              onChangeText={(text) => {}}
            />
            <TextInput
              label="Last Name"
              theme={{ colors: { primary: "#149dec" } }}
              style={styles.inputStyle}
              value={""}
              onChangeText={(text) => {}}
            />
            <TextInput
              label="Email"
              theme={{ colors: { primary: "#149dec" } }}
              style={styles.inputStyle}
              value={""}
              onChangeText={(text) => {}}
            />
            <Separator margin={20} />
            <View>
              <Button mode="outlined" color="grey" onPress={showDatePicker}>
                {date ? date : "date"}
              </Button>
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleDateConfirm}
                onCancel={hideDatePicker}
              />
              <Separator margin={30} />
              <Button mode="outlined" color="grey" onPress={showTimePicker}>
                {time ? time : "time"}
              </Button>
              <DateTimePickerModal
                isVisible={isTimePickerVisible}
                mode="time"
                onConfirm={handleTimeConfirm}
                onCancel={hideTimePciker}
              />
              <Separator margin={30} />
            </View>
            <View>
              <Text style={styles.title}>Menu Items</Text>
              <Separator margin={10} />
              <MultiSelect
                hideTags
                items={items}
                uniqueKey="id"
                ref={(component) => {
                  component && (MULTISELECT = component);
                }}
                onSelectedItemsChange={onSelectedItemsChange}
                selectedItems={selectedItems}
                selectText="Pick Items"
                searchInputPlaceholderText="Search Items..."
                onChangeInput={(text) => console.log(text)}
                altFontFamily="ProximaNova-Light"
                tagRemoveIconColor="#CCC"
                tagBorderColor="#CCC"
                tagTextColor="#CCC"
                selectedItemTextColor="#CCC"
                selectedItemIconColor="#CCC"
                itemTextColor="#000"
                displayKey="name"
                styleItemsContainer={styles.styleItemsContainer}
                styleRowList={styles.styleRowList}
                submitButtonColor="#CCC"
                submitButtonText="Submit"
              />
              <View>{MULTISELECT?.getSelectedItemsExt(selectedItems)}</View>
            </View>
            <Separator margin={20} />
            <Card>
              <Card.Content>
                <Title>Your 50% advance bill is</Title>
                <Paragraph>0.00 Rs</Paragraph>
              </Card.Content>
            </Card>
            <Separator margin={20} />
            <Text style={styles.title}>Card Info</Text>
            <Separator margin={20} />
            <CreditCardInput
              onChange={(form) => {
                setCardCarenditals(form);
              }}
            />
            <Separator margin={20} />
            <Button mode="outlined" color="grey" onPress={() => {}}>
              confirm
            </Button>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

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
  inputStyle: {
    backgroundColor: "white"
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%"
  },
  styleItemsContainer: {
    backgroundColor: "white",
    paddingTop: 25
  },
  styleRowList: {
    padding: 10
  }
});
