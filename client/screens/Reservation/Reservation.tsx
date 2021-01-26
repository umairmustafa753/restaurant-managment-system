import React, { useState, useEffect } from "react";
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
import { useNavigation, StackActions } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { connect } from "react-redux";
import moment from "moment";

import { Text, View } from "../../components/Themed";
import { ScrollView } from "react-native-gesture-handler";
import Separator from "../../components/Separator";
import Back from "../../components/Back";
import Menu from "../../store/Actions/menu";

let MULTISELECT: MultiSelect;

const ReservationScreen = (props) => {
  const navigator = useNavigation();

  const [items, setItems] = useState<any>([]);
  const [selectedMenu, setSelectedMenu] = useState<Array<object>>([]);
  const [selectedItemsIds, setSelectedItemsIds] = useState<Array<object>>([]);
  const [isDatePickerVisible, setDatePickerVisibility] = useState<boolean>(
    false
  );
  const [isTimePickerVisible, setTimePickerVisible] = useState<boolean>(false);
  const [cardCardentials, setCardCarenditals] = useState<object>({});
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [price, setPrice] = useState<number>(0);

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
    let price50 = 0;
    const list = items.filter((item) =>
      selectedItems?.find((selected) => selected === item?.id)
    );
    setSelectedItemsIds(selectedItems);
    list.map((item) => (price50 = price50 + item?.price * 0.5));
    setPrice(price50);
    setSelectedMenu(list);
  };

  const handleNavigationPop = () => {
    navigator.dispatch(StackActions.popToTop());
  };

  console.log(selectedMenu);

  const showToast = () => {
    Toast.show({
      type: "error",
      position: "top",
      text1: "Alert !",
      text2: "This is some something 👋",
      autoHide: false,
      topOffset: 50
    });
  };

  useEffect(() => {
    props.getFeaturedItems();
  }, []);

  useEffect(() => {
    let menuList = [{}];
    menuList.pop();
    props?.menuItems[0]?.menu?.map((item) =>
      item?.subCategory.map((subItem) =>
        menuList?.push({
          id: subItem?._id,
          name: subItem?.val,
          price: subItem?.price
        })
      )
    );
    setItems(menuList);
  }, [props?.menuItems]);

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
            <Back onPress={handleNavigationPop} />
            <Text style={styles.title}>Reservation Info</Text>
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
                selectedItems={selectedItemsIds}
                selectText="Pick Items"
                searchInputPlaceholderText="Search Items..."
                onChangeInput={() => {}}
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
              <View>{MULTISELECT?.getSelectedItemsExt(selectedItemsIds)}</View>
            </View>
            <Separator margin={20} />
            <Card>
              <Card.Content>
                <Title>Your 50% advance bill is</Title>
                <Paragraph>{price} Rs</Paragraph>
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
            <Button mode="outlined" color="grey" onPress={showToast}>
              confirm
            </Button>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => {
  return {
    menuItems: state?.menuReducer?.menu?.MenuList
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getFeaturedItems: () => {
      dispatch(Menu.GetMenuItems());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReservationScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  zIndex: {
    zIndex: 1
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
