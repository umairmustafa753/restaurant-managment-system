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
import Spinner from "react-native-loading-spinner-overlay";
import { NAVIGATIONS } from "../../constants/navigator";
import AwesomeAlert from "react-native-awesome-alerts";
import Toast from "react-native-toast-message";
import { connect } from "react-redux";
import moment from "moment";

import { Text, View } from "../../components/Themed";
import { ScrollView } from "react-native-gesture-handler";
import Separator from "../../components/Separator";
import Back from "../../components/Back";
import Menu from "../../store/Actions/menu";
import { MESSAGE, TYPE } from "../constant";
import Reservation from "../../store/Actions/reservation";

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
  const [isShowAlert, setShowAlert] = useState<boolean>(false);
  const [cardCardentials, setCardCarenditals] = useState<object>({});
  const [enableToast, setEnableToast] = useState({
    visible: false
  });
  const [price, setPrice] = useState<number>(0);
  const [input, setInput] = useState({
    firstName: "",
    lastName: "",
    email: "",
    date: "",
    time: ""
  });

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
    setInput((prevState) => ({
      ...prevState,
      date: moment(date, "YYYY-MM-DD").format("YYYY-MM-DD")
    }));
    hideDatePicker();
  };

  const showAlert = () => {
    setTimeout(() => {
      setShowAlert(true);
    }, 1000);
  };

  const hideAlert = () => {
    setShowAlert(false);
  };

  const handleTimeConfirm = (time) => {
    setInput((prevState) => ({
      ...prevState,
      time: moment(time, "HH:mm:ss").format("hh:mm A")
    }));
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

  const handleNavigate = () => {
    navigator.reset({
      routes: [
        {
          name: NAVIGATIONS.SUCCESS,
          params: {
            msg: MESSAGE.SUCCESS_RESERVATION_REQUSTED,
            navigateTo: NAVIGATIONS.ACCOUNT
          }
        }
      ]
    });
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
    }
  };

  const handleSubmit = () => {
    hideAlert();
    if (!selectedMenu.length) {
      showToast(MESSAGE.FAILED_NO_MENU_FOUND, TYPE.ERROR);
      return;
    }
    if (!cardCardentials?.valid) {
      showToast(MESSAGE.FAILED_ENTER_VALID_CARD_VALUES, TYPE.ERROR);
      return;
    }
    const obj = {
      firstName: input?.firstName,
      lastName: input?.lastName,
      email: input?.email,
      date: input?.date,
      time: input?.time,
      menuItems: selectedMenu,
      fiftyPerAmount: price,
      CardInfo: cardCardentials?.values,
      userId: props?.user?.data?.user?._id,
      token: props?.user?.data?.token
    };
    props?.createReservation(obj);
  };

  useEffect(() => {
    props.getFeaturedItems();
  }, []);

  useEffect(() => {
    let menuList = [{}];
    menuList.pop();
    if (props?.menuItems?.length) {
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
    }
  }, [props?.menuItems]);

  useEffect(() => {
    if (!props.loading && enableToast?.visible) {
      const message = props?.reservation?.message;
      const isMatch = MESSAGE.SUCCESS_RESERVATION_REQUSTED === message;
      const type = isMatch ? TYPE.SUCCESS : TYPE.ERROR;
      showToast(isMatch ? MESSAGE.SUCCESS_USER_ADDED_MESSAGE : message, type);
      if (isMatch) {
        handleNavigate();
      }
    }
  }, [props?.loading]);

  useEffect(() => {
    const unsubscribe = navigator.addListener("focus", () => {
      setEnableToast((prevState) => ({ ...prevState, visible: true }));
    });

    return unsubscribe;
  }, [navigator]);

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
            <AwesomeAlert
              show={isShowAlert}
              showProgress={false}
              title="Salary Payment"
              message="Are you sure you want to Create Reservation"
              closeOnTouchOutside={false}
              closeOnHardwareBackPress={true}
              showCancelButton={true}
              showConfirmButton={true}
              cancelText="No, cancel"
              confirmText="Yes, Create it"
              confirmButtonColor="grey"
              onCancelPressed={hideAlert}
              onConfirmPressed={handleSubmit}
            />
            <Back onPress={handleNavigationPop} />
            <Text style={styles.title}>Reservation Info</Text>
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
            <Separator margin={20} />
            <View>
              <Button mode="outlined" color="grey" onPress={showDatePicker}>
                {input.date ? input.date : "date"}
              </Button>
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleDateConfirm}
                onCancel={hideDatePicker}
              />
              <Separator margin={30} />
              <Button mode="outlined" color="grey" onPress={showTimePicker}>
                {input?.time ? input?.time : "time"}
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
              requiresName={true}
              onChange={(form) => {
                setCardCarenditals(form);
              }}
            />
            <Separator margin={20} />
            <Button mode="outlined" color="grey" onPress={showAlert}>
              confirm
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
    user: state.userReducer.obj,
    reservation: state?.reservationReducer?.reservation,
    loading: state?.reservationReducer?.loading,
    menuItems: state?.menuReducer?.menu?.MenuList
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getFeaturedItems: () => {
      dispatch(Menu.GetMenuItems());
    },
    createReservation: (obj) => {
      dispatch(Reservation.CreateReservation(obj));
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
  spinnerTextStyle: {
    color: "#fff"
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
