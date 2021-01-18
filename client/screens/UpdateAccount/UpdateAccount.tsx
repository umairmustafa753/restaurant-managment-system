import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Image
} from "react-native";
import { useNavigation, StackActions } from "@react-navigation/native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import UserAvatar from "react-native-user-avatar";
import { Button, TextInput, Card, Title, Paragraph } from "react-native-paper";
import CompleteFlatList from "react-native-complete-flatlist";
import moment from "moment";

import Back from "../../components/Back";
import { Text, View } from "../../components/Themed";
import Separator from "../../components/Separator";

const UpdateAccount = () => {
  const navigator = useNavigation();

  const [isDatePickerVisible, setDatePickerVisibility] = useState<boolean>(
    false
  );

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

  const DATA = [
    {
      date: "Aug-2021"
    },
    {
      date: "Aug-2021"
    },
    {
      date: "Aug-2021"
    }
  ];

  const cell = ({ item }) => {
    return <Text style={styles.listText}>{item.date}</Text>;
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={30}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.padding}>
            <Back onPress={handleNavigationPop} />
            <UserAvatar
              size={80}
              // src={}
              name="Umair Mustafa"
              style={styles.avatar}
            />
            <Separator margin={10} />
            <TouchableOpacity style={styles.imageContainer} onPress={() => {}}>
              <Image
                style={styles.image}
                source={require("../../assets/images/camera.png")}
              />
              <Text style={styles.editPhotoText}>Edit Photo</Text>
            </TouchableOpacity>
            <Separator margin={10} />
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
            <Button mode="outlined" color="grey" onPress={showDatePicker}>
              {date ? date : "Date of Birth"}
            </Button>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleDateConfirm}
              onCancel={hideDatePicker}
            />
            <Separator margin={20} />
            <Button mode="outlined" color="grey" onPress={() => {}}>
              Update Account
            </Button>
            <Separator margin={20} />
            {true && (
              <View>
                <Card>
                  <Card.Content>
                    <Title>Your Salary is</Title>
                    <Paragraph>0.00 Rs</Paragraph>
                  </Card.Content>
                </Card>
                <Separator margin={20} />
                <CompleteFlatList
                  searchKey={["name", "status", "time", "date"]}
                  highlightColor="yellow"
                  // pullToRefreshCallback={() => {
                  //   alert('refreshing');
                  // }}
                  placeholder={"Search paid Salary months"}
                  data={DATA}
                  // ref={c => this.completeFlatList = c}
                  renderSeparator={null}
                  renderItem={cell}
                  // onEndReached={() => console.log("reach end")}
                  onEndReachedThreshold={0}
                />
              </View>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  editPhotoText: {
    fontSize: 15,
    flexDirection: "column",
    marginLeft: 10,
    alignSelf: "center"
  },
  image: {
    width: 20,
    height: 20
  },
  imageContainer: {
    flexDirection: "row",
    justifyContent: "center"
  },
  padding: {
    padding: 30
  },
  listText: {
    padding: 20,
    backgroundColor: "#f2f2f2",
    marginTop: 20
  },
  avatar: {
    height: 80,
    width: 80,
    alignSelf: "center"
  },
  inputStyle: {
    backgroundColor: "white"
  }
});

export default UpdateAccount;
