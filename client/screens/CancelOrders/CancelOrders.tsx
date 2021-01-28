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
import { Button } from "react-native-paper";
import UserAvatar from "react-native-user-avatar";
import Spinner from "react-native-loading-spinner-overlay";
import ImageView from "react-native-image-viewing";
import { connect } from "react-redux";
import moment from "moment";

import { Text, View } from "../../components/Themed";
import Separator from "../../components/Separator";
import List from "../../components/FlatList";
import Back from "../../components/Back";
import { Modal } from "../../components/Modal";
import Reservation from "../../store/Actions/reservation";
import { STATUS, ROLE } from "../constant";

const CancelOrders = (props) => {
  const navigator = useNavigation();
  const [isDatePickerVisible, setDatePickerVisibility] = useState<boolean>(
    false
  );
  const [showSpiner, setShowSpiner] = useState<boolean>(false);
  const [imagePrieview, setImagePrieview] = useState<boolean>(false);
  const [items, setItems] = useState<any>([]);
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

  const getReservations = () => {
    if (date) {
      if (props?.user?.data?.user?.role !== ROLE.CUSTOMER) {
        props.getAllReservations({
          status: STATUS.CANCEL,
          token: props?.user?.data?.token,
          date: date
        });
      } else {
        props.getUserReservations({
          status: STATUS.CANCEL,
          id: props?.user?.data?.user?._id,
          token: props?.user?.data?.token,
          date: date
        });
      }
    }
  };

  useEffect(() => {
    getReservations();
  }, [date]);

  useEffect(() => {
    if (!props.loading) {
      setItems(props?.reservations);
    }
  }, [props.reservations]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={showSpiner} onRefresh={getReservations} />
        }
      >
        <Separator margin={30} />
        <View style={{ padding: 30 }}>
          <Back onPress={handleNavigationPop} />
          <Text style={styles.title}>Cancel Orders</Text>
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
          <List data={date ? items : []} setState={() => {}}>
            {(modalData, isModalVisible, isVisible) => {
              return (
                <Modal
                  visible={isModalVisible}
                  onClose={isVisible}
                  style={styles.modalHeight}
                >
                  <View style={styles.row}>
                    <ImageView
                      images={[
                        {
                          uri: modalData?.picture
                        }
                      ]}
                      imageIndex={0}
                      presentationStyle="overFullScreen"
                      doubleTapToZoomEnabled={true}
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
                    <Text style={styles.modalTextStyle}>
                      {`${modalData?.firstName} ${modalData?.lastName} Order booking date ${modalData?.date} ${modalData?.time}`}
                    </Text>
                  </View>
                  <Separator margin={10} />
                  <Text>Email</Text>
                  <Text style={styles.modalText}>{modalData?.email}</Text>
                  <Separator margin={10} />
                  <Text>Menu Items</Text>
                  <View>
                    {modalData?.menuItems.map((item, index) => (
                      <Text style={styles.menuText} key={index}>
                        {item?.name}
                      </Text>
                    ))}
                  </View>
                  <Separator margin={10} />
                  <Text>50% advance amount</Text>
                  <Text style={styles.modalText}>
                    {modalData?.fiftyPerAmount} Rs
                  </Text>
                  <Separator margin={10} />
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
    reservations: state?.reservationReducer?.reservations?.data,
    loading: state?.reservationReducer?.loading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllReservations: (obj) => {
      dispatch(Reservation.GetAllReservations(obj));
    },
    getUserReservations: (obj) => {
      dispatch(Reservation.GetUserReservations(obj));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CancelOrders);

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
    minHeight: 350
  },
  zIndex: {
    zIndex: 1
  },
  padding: {
    padding: 30
  },
  menuText: {
    marginRight: 20,
    color: "grey",
    marginTop: 5
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
