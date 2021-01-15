import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import { Fumi } from "react-native-textinput-effects";
import { Button, Card, Title, Paragraph } from "react-native-paper";
import MultiSelect from "react-native-multiple-select";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { CreditCardInput } from "react-native-input-credit-card";

import { Text, View } from "../../components/Themed";
import { ScrollView } from "react-native-gesture-handler";
import Separator from "../../components/Separator";
import moment from "moment";

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
            <Fumi
              label={"Full Name"}
              iconClass={FontAwesomeIcon}
              iconName={"user"}
              iconColor={"#545454"}
              iconSize={20}
              inputPadding={16}
            />
            <Fumi
              label={"Phone Number"}
              iconClass={FontAwesomeIcon}
              iconName={"phone"}
              iconColor={"#545454"}
              iconSize={20}
              inputPadding={16}
            />
            <Fumi
              label={"Party Size"}
              iconClass={FontAwesomeIcon}
              iconName={"group"}
              iconColor={"#545454"}
              iconSize={20}
              inputPadding={16}
              keyboardType={"numeric"}
            />
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
                searchInputStyle={{ color: "#CCC" }}
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
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%"
  }
});
