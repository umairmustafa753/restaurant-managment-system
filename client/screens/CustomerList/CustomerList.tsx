import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  RefreshControl,
  TouchableOpacity
} from "react-native";
import { useNavigation, StackActions } from "@react-navigation/native";
import { connect } from "react-redux";
import UserAvatar from "react-native-user-avatar";
import Spinner from "react-native-loading-spinner-overlay";
import ImageView from "react-native-image-viewing";

import UserAction from "../../store/Actions/user";
import { Text, View } from "../../components/Themed";
import { Modal } from "../../components/Modal";
import Separator from "../../components/Separator";
import List from "../../components/FlatList";
import Back from "../../components/Back";
import { ROLE } from "../constant";

const CustomerList = (props) => {
  const navigator = useNavigation();
  const [items, setItems] = useState<any>([]);
  const [showSpiner, setShowSpiner] = useState<boolean>(false);
  const [imagePrieview, setImagePrieview] = useState<boolean>(false);

  const handleNavigationPop = () => {
    navigator.dispatch(StackActions.popToTop());
  };

  useEffect(() => {
    props.getCustomers({
      role: ROLE.CUSTOMER,
      token: props?.user?.data?.token
    });
  }, []);

  const onRefresh = () => {
    props.getCustomers({
      role: ROLE.CUSTOMER,
      token: props?.user?.data?.token
    });
  };

  useEffect(() => {
    if (!props.loading) {
      setItems(props?.customers);
    }
  }, [props.loading]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={showSpiner} onRefresh={onRefresh} />
        }
      >
        <Separator margin={30} />
        <View style={{ padding: 30 }}>
          <Back onPress={handleNavigationPop} />
          <Text style={styles.title}>Customer List</Text>
          <Separator margin={30} />
          {!props.loading && (
            <List data={items?.data} setState={() => {}}>
              {(modalData, isModalVisible, isVisible) => (
                <Modal
                  visible={isModalVisible}
                  onClose={isVisible}
                  style={styles.modelView}
                >
                  <ImageView
                    images={[
                      {
                        uri: modalData?.picture
                      }
                    ]}
                    imageIndex={0}
                    presentationStyle="overFullScreen"
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
                  <Separator margin={20} />
                  <Text style={styles.title}>Personal Information</Text>
                  <Text style={styles.text}>{modalData?.email}</Text>
                  <Text
                    style={styles.text}
                  >{`${modalData?.firstName} ${modalData?.lastName}`}</Text>
                  <Separator margin={20} />
                  <Separator margin={20} />
                </Modal>
              )}
            </List>
          )}
          <Spinner
            visible={props?.loading}
            textContent={"Loading..."}
            textStyle={styles.spinnerTextStyle}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => {
  return {
    customers: state.userReducer.users,
    user: state.userReducer.obj,
    loading: state.userReducer.loading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCustomers: (obj) => {
      dispatch(UserAction.GetUsers(obj));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerList);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  modelView: {
    minHeight: 150
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
    width: "80%"
  },
  avatar: {
    height: 70,
    width: 70,
    alignSelf: "center"
  }
});
