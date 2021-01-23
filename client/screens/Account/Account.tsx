import React, { useEffect, useState } from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import UserAvatar from "react-native-user-avatar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { connect } from "react-redux";

import { NAVIGATIONS } from "../../constants/navigator";
import { Text, View } from "../../components/Themed";
import { ScrollView } from "react-native-gesture-handler";

import Card from "../../components/Card";
import Separator from "../../components/Separator";

const AccountScreen = (props) => {
  const navigator = useNavigation();

  const [image, setImage] = useState("");

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

  return (
    <SafeAreaView style={styles.container}>
      <Separator margin={30} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.padding}>
          <UserAvatar
            size={80}
            key={image}
            src={image}
            name="Umair Mustafa"
            style={styles.avatar}
          />
          <Separator margin={10} />
          <Text style={styles.title}>Umair Mustafa</Text>
          <Text style={styles.subTitle}>Owner</Text>
          <Separator margin={10} />
          <Card
            titile="Upadte Account/Details"
            onPress={() => navigate(NAVIGATIONS.UPDATE_ACCOUNT)}
          />
          <Card
            titile="Add User"
            onPress={() => navigate(NAVIGATIONS.ADD_USER)}
          />
          <Card
            titile="Reservation"
            onPress={() => navigate(NAVIGATIONS.RESERVATION)}
          />
          <Card
            titile="Confirm Orders"
            onPress={() => {
              navigate(NAVIGATIONS.CONFIRM_ORDERS);
            }}
          />
          <Card
            titile="Pending Orders"
            onPress={() => navigate(NAVIGATIONS.PENDING_ORDERS)}
          />
          <Card
            titile="Cancel Orders"
            onPress={() => navigate(NAVIGATIONS.CANCEL_ORDERS)}
          />
          <Card
            titile="Customers List"
            onPress={() => navigate(NAVIGATIONS.CUSTOMER_LIST)}
          />
          <Card
            titile="Employees List"
            onPress={() => navigate(NAVIGATIONS.EMPLOYEE_LIST)}
          />
          <Card titile="log out" onPress={handleLogout} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.obj
  };
};

export default connect(mapStateToProps, null)(AccountScreen);

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
  padding: {
    padding: 30
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%"
  },
  avatar: {
    height: 80,
    width: 80,
    alignSelf: "center"
  }
});
