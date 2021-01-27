import React, { useEffect, useState } from "react";
import { StyleSheet, SafeAreaView, ScrollView } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useNavigation, StackActions } from "@react-navigation/native";
import { Button } from "react-native-paper";
import UserAvatar from "react-native-user-avatar";
import Spinner from "react-native-loading-spinner-overlay";
import AwesomeAlert from "react-native-awesome-alerts";
import Toast from "react-native-toast-message";
import { connect } from "react-redux";
import moment from "moment";

import { Text, View } from "../../components/Themed";
import Separator from "../../components/Separator";
import List from "../../components/FlatList";
import Back from "../../components/Back";
import { Modal } from "../../components/Modal";
import Reservation from "../../store/Actions/reservation";
import { MESSAGE, TYPE, STATUS } from "../constant";
import { State } from "react-native-gesture-handler";

const PendingOrders = (props) => {
  const navigator = useNavigation();
  const [isDatePickerVisible, setDatePickerVisibility] = useState<boolean>(
    false
  );
  const [enableToast, setEnableToast] = useState({
    visible: false
  });
  const [items, setItems] = useState<any>([]);
  const [isShowAlert, setShowAlert] = useState<boolean>(false);
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

  const showAlert = () => {
    setTimeout(() => {
      setShowAlert(true);
    }, 1000);
  };

  const handleSubmit = () => {};

  const hideAlert = () => {
    setShowAlert(false);
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

  useEffect(() => {
    const unsubscribe = navigator.addListener("focus", () => {
      setEnableToast((prevState) => ({ ...prevState, visible: true }));
    });

    return unsubscribe;
  }, [navigator]);

  useEffect(() => {
    if (date)
      props.getAllReservations({
        status: STATUS.PENDING,
        token: props?.user?.data?.token,
        date: date
      });
  }, [date]);

  useEffect(() => {
    if (!props.loading) {
      setItems(props?.reservations);
    }
  }, [props.loading]);

  return (
    <SafeAreaView style={styles.container}>
      <Toast ref={(ref) => Toast.setRef(ref)} style={styles.zIndex} />
      <ScrollView>
        <Separator margin={30} />
        <View style={{ padding: 30 }}>
          <AwesomeAlert
            show={isShowAlert}
            showProgress={false}
            title="Create Reservation"
            message="Are you sure you want to create reservation"
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
          <Text style={styles.title}>Pending Orders</Text>
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
          <List data={date ? items?.data : []} setState={() => {}}>
            {(modalData, isModalVisible, isVisible) => {
              return (
                <Modal
                  visible={isModalVisible}
                  onClose={isVisible}
                  style={styles.modalHeight}
                >
                  <View style={styles.row}>
                    <UserAvatar
                      size={70}
                      src={modalData?.picture}
                      key={modalData?.picture}
                      name={`${modalData?.firstName} ${modalData?.lastName}`}
                      style={styles.avatar}
                    />
                    <Text style={styles.modalTextStyle}>
                      {`${modalData?.firstName} ${modalData?.lastName} Order booking date ${modalData?.date} ${modalData?.time}`}
                    </Text>
                  </View>
                  <Separator margin={10} />
                  <Text>Email</Text>
                  <Text style={styles.modalText}>{modalData?.email}</Text>
                  <Separator margin={10} />
                  <Text>Menu Items</Text>
                  <View
                    style={{
                      flexDirection: "row"
                    }}
                  >
                    {modalData?.menuItems.map((item) => (
                      <Text style={styles.menuText}>{item?.name}</Text>
                    ))}
                  </View>
                  <Separator margin={10} />
                  <Text>50% advance amount</Text>
                  <Text style={styles.modalText}>
                    {modalData?.fiftyPerAmount} Rs
                  </Text>
                  <Separator margin={10} />
                  {true && (
                    <View style={[styles.row, styles.spaceBetween]}>
                      <Button mode="outlined" color="grey" onPress={showAlert}>
                        Comfrim
                      </Button>
                      <Button mode="outlined" color="grey" onPress={showAlert}>
                        Delete
                      </Button>
                    </View>
                  )}
                </Modal>
              );
            }}
          </List>
        </View>
        <Spinner
          visible={props?.loading}
          textContent={"Loading..."}
          textStyle={styles.spinnerTextStyle}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.obj,
    reservation: state?.reservationReducer?.reservation,
    reservations: state?.reservationReducer?.reservations,
    loading: state?.reservationReducer?.loading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllReservations: (obj) => {
      dispatch(Reservation.GetAllReservations(obj));
    },
    updateReservation: (obj) => {
      dispatch(Reservation.UpdateReservation(obj));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PendingOrders);

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
  modalHeight: {
    minHeight: 330
  },
  zIndex: {
    zIndex: 1
  },
  padding: {
    padding: 30
  },
  menuText: {
    marginRight: 20
  },
  spinnerTextStyle: {
    color: "#fff"
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
