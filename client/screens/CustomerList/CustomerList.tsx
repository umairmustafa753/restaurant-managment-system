import React, { useState } from "react";
import { StyleSheet, SafeAreaView, ScrollView } from "react-native";
import { useNavigation, StackActions } from "@react-navigation/native";
import UserAvatar from "react-native-user-avatar";

import { Text, View } from "../../components/Themed";
import Separator from "../../components/Separator";
import List from "../../components/FlatList";
import Back from "../../components/Back";
import { Modal } from "../../components/Modal";

const CustomerList = () => {
  const navigator = useNavigation();

  const handleNavigationPop = () => {
    navigator.dispatch(StackActions.popToTop());
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Separator margin={30} />
        <View style={{ padding: 30 }}>
          <Back onPress={handleNavigationPop} />
          <Text style={styles.title}>Customer List</Text>
          <Separator margin={30} />
          <List data={[]}>
            {(modalData, isModalVisible, isVisible) => (
              <Modal visible={isModalVisible} onClose={isVisible}>
                <UserAvatar
                  size={70}
                  // src={}
                  name="Umair Mustafa"
                  style={styles.avatar}
                />
                <Separator margin={20} />
                <Text style={styles.title}>Personal Information</Text>
                <Text style={styles.text}>umair@gmail.com</Text>
                <Text style={styles.text}>Umair Mustafa</Text>
                <Separator margin={20} />
                <Separator margin={20} />
              </Modal>
            )}
          </List>
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

export default CustomerList;
