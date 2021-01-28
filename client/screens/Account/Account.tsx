import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  RefreshControl,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import UserAvatar from "react-native-user-avatar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { connect } from "react-redux";
import { Cell, Section, TableView } from "react-native-tableview-simple";
import ImageView from "react-native-image-viewing";

import UserAction from "../../store/Actions/user";
import { NAVIGATIONS } from "../../constants/navigator";
import { Text, View } from "../../components/Themed";
import { ROLE } from "../constant";
import Separator from "../../components/Separator";

const AccountScreen = (props) => {
  const navigator = useNavigation();

  const [image, setImage] = useState("");
  const [imagePrieview, setImagePrieview] = useState<boolean>(false);

  const navigate = (to) => {
    navigator.navigate(to);
  };

  const handleLogout = async () => {
    let error = null;
    try {
      await AsyncStorage.removeItem("user");
    } catch (error) {
      error = error;
    }
    if (!error) navigator.reset({ routes: [{ name: NAVIGATIONS.LOGIN }] });
  };

  useEffect(() => {
    setImage(props?.user?.data?.user?.picture);
  }, []);

  const onRefresh = async () => {
    await props.getUser({
      _id: props?.user?.data?.user?._id,
      token: props?.user?.data?.token
    });
  };

  useEffect(() => {
    if (!props.loading) {
      setImage(props?.user?.data?.user?.picture);
    }
  }, [props.loading]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={props.loading} onRefresh={onRefresh} />
        }
      >
        <ImageView
          images={[
            {
              uri: props?.user?.data?.user?.picture
            }
          ]}
          imageIndex={0}
          presentationStyle="overFullScreen"
          visible={imagePrieview}
          onRequestClose={() => setImagePrieview(false)}
        />
        <View style={styles.row}>
          <View style={styles.colounm}>
            <Text style={styles.title}>
              {`${props?.user?.data?.user?.firstName} ${props?.user?.data?.user?.lastName}`}
            </Text>
            <Text style={styles.subTitle}>{props?.user?.data?.user?.role}</Text>
          </View>
          <TouchableOpacity
            onPress={() =>
              props?.user?.data?.user?.picture ? setImagePrieview(true) : {}
            }
          >
            <UserAvatar
              size={50}
              key={image}
              src={image}
              name={`${props?.user?.data?.user?.firstName} ${props?.user?.data?.user?.lastName}`}
              style={styles.avatar}
            />
          </TouchableOpacity>
        </View>
        <Separator margin={50} />
        <TableView appearance="light">
          <Section footer="All rights reserved.">
            <Cell
              title="Upadte Account/Details"
              titleTextColor="#007AFF"
              onPress={() => navigate(NAVIGATIONS.UPDATE_ACCOUNT)}
            />
            {props?.user?.data?.user?.role === ROLE.OWNER && (
              <Cell
                title="Add User"
                titleTextColor="#007AFF"
                onPress={() => navigate(NAVIGATIONS.ADD_USER)}
              />
            )}
            <Cell
              title="Reservation"
              titleTextColor="#007AFF"
              onPress={() => navigate(NAVIGATIONS.RESERVATION)}
            />
            <Cell
              title="Confirm Orders"
              titleTextColor="#007AFF"
              onPress={() => {
                navigate(NAVIGATIONS.CONFIRM_ORDERS);
              }}
            />
            <Cell
              title="Pending Orders"
              titleTextColor="#007AFF"
              onPress={() => navigate(NAVIGATIONS.PENDING_ORDERS)}
            />
            <Cell
              title="Cancel Orders"
              titleTextColor="#007AFF"
              onPress={() => navigate(NAVIGATIONS.CANCEL_ORDERS)}
            />
            {props?.user?.data?.user?.role !== ROLE.CUSTOMER && (
              <Cell
                title="Customers List"
                titleTextColor="#007AFF"
                onPress={() => navigate(NAVIGATIONS.CUSTOMER_LIST)}
              />
            )}
            {props?.user?.data?.user?.role === ROLE.OWNER && (
              <Cell
                title="Employees List"
                titleTextColor="#007AFF"
                onPress={() => navigate(NAVIGATIONS.EMPLOYEE_LIST)}
              />
            )}
            <Cell
              title="log out"
              titleTextColor="#007AFF"
              onPress={handleLogout}
            />
          </Section>
        </TableView>
      </ScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.obj,
    requsted: state.userReducer.requsted,
    loading: state.userReducer.loading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUser: (obj) => {
      dispatch(UserAction.GetUser(obj));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AccountScreen);

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
  subTitle: {
    fontSize: 15,
    textAlign: "center"
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    top: 30,
    paddingLeft: 10,
    paddingRight: 5
  },
  colounm: {
    flexDirection: "column",
    alignSelf: "center",
    alignItems: "flex-start",
    width: "80%"
  },
  padding: {
    padding: 30
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%"
  },
  avatar: {
    height: 50,
    width: 50,
    justifyContent: "flex-end"
  },
  zIndex: {
    zIndex: 1
  }
});
