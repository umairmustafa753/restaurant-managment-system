import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  Image
} from "react-native";
import { useNavigation, StackActions } from "@react-navigation/native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import UserAvatar from "react-native-user-avatar";
import { Button, TextInput, Card, Title, Paragraph } from "react-native-paper";
import CompleteFlatList from "react-native-complete-flatlist";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons";
import Spinner from "react-native-loading-spinner-overlay";
import { NAVIGATIONS } from "../../constants/navigator";
import Toast from "react-native-toast-message";
import { connect } from "react-redux";
import moment from "moment";

import Back from "../../components/Back";
import UserAction from "../../store/Actions/user";
import { Text, View } from "../../components/Themed";
import { Modal } from "../../components/Modal";
import Separator from "../../components/Separator";
import { MESSAGE, ROLE, TYPE } from "../constant";

const UpdateAccount = (props) => {
  const navigator = useNavigation();

  const [isDatePickerVisible, setDatePickerVisibility] = useState<boolean>(
    false
  );
  const [showSpiner, setShowSpiner] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [image, setImage] = useState({
    uri: "",
    base64Image: ""
  });
  const [enableToast, setEnableToast] = useState({
    visible: false
  });
  const [input, setInput] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dob: "",
    Salary: "",
    paidSalaryMonths: []
  });

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleDateConfirm = (date) => {
    setInput((prevState) => ({
      ...prevState,
      dob: moment(date, "YYYY-MM-DD").format("YYYY-MM-DD")
    }));
    hideDatePicker();
  };

  const handleNavigationPop = () => {
    navigator.dispatch(StackActions.popToTop());
  };

  const handleLaunchImageLibrary = () => {
    setVisible(false);
    setTimeout(async () => {
      const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (permission.granted === false) {
        return;
      }
      const picker = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
        base64: true
      });
      if (picker.cancelled === true) {
        return;
      }
      setImage({
        uri: picker.uri,
        base64Image: `data:image/jpg;base64,${picker.base64}`
      });
    }, 1000);
  };

  const handleLaunchCamera = () => {
    setVisible(false);
    setTimeout(async () => {
      const permission = await ImagePicker.requestCameraPermissionsAsync();
      if (permission.granted === false) {
        return;
      }
      const picker = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        base64: true
      });
      if (picker.cancelled === true) {
        return;
      }
      setImage({
        uri: picker.uri,
        base64Image: `data:image/jpg;base64,${picker.base64}`
      });
    }, 1000);
  };

  const handleNavigate = () => {
    navigator.reset({
      routes: [
        {
          name: NAVIGATIONS.SUCCESS,
          params: {
            msg: MESSAGE.SUCCESS_ACCOUNT_UPDATE_MESSAGE,
            navigateTo: NAVIGATIONS.ACCOUNT
          }
        }
      ]
    });
  };

  const submit = () => {
    setDisabled(true);
    if (
      input?.firstName === props?.user?.data?.user?.firstName &&
      input?.lastName === props?.user?.data?.user?.lastName &&
      input?.email === props?.user?.data?.user?.email &&
      input?.dob === props?.user?.data?.user?.dob &&
      image?.uri === props?.user?.data?.user?.picture
    ) {
      showToast(MESSAGE.FAILED_NO_CHANGED_FOUND, TYPE.INFO);
      setDisabled(false);
    } else {
      const obj = {
        _id: props?.user?.data?.user?._id,
        token: props?.user?.data?.token,
        firstName: input?.firstName,
        lastName: input?.lastName,
        email: input?.email,
        dob: input?.dob,
        salary: props?.user?.data?.user?.salary,
        paidSalariesMonth: props?.user?.data?.user?.paidSalariesMonth,
        base64Image: image?.base64Image,
        picture: image?.uri
      };
      props.updateUser(obj);
    }
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
    if (!props.loading && enableToast?.visible) {
      const message = props?.requsted?.message;
      const isMatch = MESSAGE.SUCCESS_USER_UPDATED_MESSAGE === message;
      const type = isMatch ? TYPE.SUCCESS : TYPE.ERROR;
      showToast(message, type);
      setDisabled(false);
      updateState();
      if (isMatch) {
        handleNavigate();
      }
    }
  }, [props.loading]);

  useEffect(() => {
    const unsubscribe = navigator.addListener("focus", () => {
      setEnableToast((prevState) => ({ ...prevState, visible: true }));
    });

    return unsubscribe;
  }, [navigator]);

  const updateState = () => {
    setInput({
      firstName: props?.user?.data?.user?.firstName,
      lastName: props?.user?.data?.user?.lastName,
      email: props?.user?.data?.user?.email,
      dob: props?.user?.data?.user?.dob,
      Salary: props?.user?.data?.user?.salary,
      paidSalaryMonths: props?.user?.data?.user?.paidSalariesMonth
    });
    setImage((prevState) => ({
      ...prevState,
      uri: props?.user?.data?.user?.picture
    }));
  };

  useEffect(() => {
    updateState();
  }, []);

  const onRefresh = () => {
    props.getUser({
      _id: props?.user?.data?.user?._id,
      token: props?.user?.data?.token
    });
  };

  const cell = ({ item }) => {
    return <Text style={styles.listText}>{item?.date}</Text>;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Toast ref={(ref) => Toast.setRef(ref)} style={styles.zIndex} />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={30}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={showSpiner} onRefresh={onRefresh} />
          }
        >
          <View style={styles.padding}>
            <Modal
              visible={visible}
              style={styles.modalStyle}
              onClose={() => setVisible(false)}
            >
              <TouchableOpacity style={styles.row} onPress={handleLaunchCamera}>
                <MaterialIcons name="camera-alt" size={40} color="black" />
                <Text style={styles.rowText}>Take Photo</Text>
              </TouchableOpacity>
              <Separator margin={20} />
              <TouchableOpacity
                style={styles.row}
                onPress={handleLaunchImageLibrary}
              >
                <MaterialIcons
                  name="add-photo-alternate"
                  size={40}
                  color="black"
                />
                <Text style={styles.rowText}>Choose from Library</Text>
              </TouchableOpacity>
            </Modal>
            <Back onPress={handleNavigationPop} />
            <UserAvatar
              size={80}
              key={image?.uri}
              src={image?.uri}
              name={`${input?.firstName} ${input?.lastName}`}
              style={styles.avatar}
            />
            <Separator margin={10} />
            <TouchableOpacity
              style={styles.imageContainer}
              onPress={() => setVisible(true)}
            >
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
            <Button mode="outlined" color="grey" onPress={showDatePicker}>
              {input?.dob ? input?.dob : "Date of Birth"}
            </Button>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleDateConfirm}
              onCancel={hideDatePicker}
            />
            <Separator margin={20} />
            <Button
              mode="outlined"
              color="grey"
              onPress={submit}
              disabled={disabled}
            >
              Update Account
            </Button>
            <Separator margin={20} />
            {props?.user?.data?.user?.role === ROLE.EMPLOYEE && (
              <View>
                <Card>
                  <Card.Content>
                    <Title>Your Salary is</Title>
                    <Paragraph>{input?.Salary} Rs</Paragraph>
                  </Card.Content>
                </Card>
                <Separator margin={20} />
                <CompleteFlatList
                  searchKey={["name", "status", "time", "date"]}
                  highlightColor="yellow"
                  placeholder={"Search paid Salary months"}
                  data={input?.paidSalaryMonths || []}
                  renderSeparator={null}
                  renderItem={cell}
                  onEndReachedThreshold={0}
                />
              </View>
            )}
          </View>
          <Spinner
            visible={showSpiner || props?.loading}
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
    requsted: state.userReducer.requsted,
    loading: state.userReducer.loading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateUser: (obj) => {
      dispatch(UserAction.UpdateUser(obj));
    },
    getUser: (obj) => {
      dispatch(UserAction.GetUser(obj));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateAccount);

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
  zIndex: {
    zIndex: 1
  },
  row: {
    flexDirection: "row",
    height: 40
  },
  rowText: {
    flexDirection: "column",
    alignSelf: "center",
    marginLeft: 10
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
  },
  spinnerTextStyle: {
    color: "#fff"
  },
  modalStyle: {
    minHeight: 150
  }
});
