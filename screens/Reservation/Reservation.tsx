import React, { useState } from "react";
import { StyleSheet, SafeAreaView, KeyboardAvoidingView } from "react-native";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import { Fumi } from "react-native-textinput-effects";
import MultiSelect from "react-native-multiple-select";
import { Button } from "react-native-paper";

import { Text, View } from "../../components/Themed";
import { ScrollView } from "react-native-gesture-handler";
import Separator from "../../components/Separator";

let MULTISELECT: MultiSelect;
const items = [
  {
    id: "92iijs7yta",
    name: "Ondo"
  },
  {
    id: "a0s0a8ssbsd",
    name: "Ogun"
  },
  {
    id: "16hbajsabsd",
    name: "Calabar"
  },
  {
    id: "nahs75a5sg",
    name: "Lagos"
  },
  {
    id: "667atsas",
    name: "Maiduguri"
  },
  {
    id: "hsyasajs",
    name: "Anambra"
  },
  {
    id: "djsjudksjd",
    name: "Benue"
  },
  {
    id: "sdhyaysdj",
    name: "Kaduna"
  },
  {
    id: "suudydjsjd",
    name: "Abuja"
  }
];

export default function ReservationScreen() {
  const [selectedItems, setSelectedItems] = useState<Array<object>>([]);

  const onSelectedItemsChange = (selectedItems) => {
    setSelectedItems(selectedItems);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Reservation Info</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        <KeyboardAvoidingView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardVerticalOffset={100}
          behavior="height"
          style={{ flex: 1 }}
        >
          <Fumi
            label={"Full Name"}
            iconClass={FontAwesomeIcon}
            iconName={"user"}
            iconColor={"#545454"}
            iconSize={20}
            inputPadding={16}
          />
          <Fumi
            label={"Phone Number"}
            iconClass={FontAwesomeIcon}
            iconName={"phone"}
            iconColor={"#545454"}
            iconSize={20}
            inputPadding={16}
          />
          <Fumi
            label={"Party Size"}
            iconClass={FontAwesomeIcon}
            iconName={"group"}
            iconColor={"#545454"}
            iconSize={20}
            inputPadding={16}
          />
          <Fumi
            label={"Date"}
            iconClass={FontAwesomeIcon}
            iconName={"calendar"}
            iconColor={"#545454"}
            iconSize={20}
            inputPadding={16}
          />
          <Fumi
            label={"Time"}
            iconClass={FontAwesomeIcon}
            iconName={"clock-o"}
            iconColor={"#545454"}
            iconSize={20}
            inputPadding={16}
          />
          <View>
            <Text style={styles.title}>Menu Items</Text>
            <MultiSelect
              hideTags
              items={items}
              uniqueKey="id"
              ref={(component) => {
                component && (MULTISELECT = component);
              }}
              onSelectedItemsChange={onSelectedItemsChange}
              selectedItems={selectedItems}
              selectText="Pick Items"
              searchInputPlaceholderText="Search Items..."
              onChangeInput={(text) => console.log(text)}
              altFontFamily="ProximaNova-Light"
              tagRemoveIconColor="#CCC"
              tagBorderColor="#CCC"
              tagTextColor="#CCC"
              selectedItemTextColor="#CCC"
              selectedItemIconColor="#CCC"
              itemTextColor="#000"
              displayKey="name"
              searchInputStyle={{ color: "#CCC" }}
              submitButtonColor="#CCC"
              submitButtonText="Submit"
            />
            <View>{MULTISELECT?.getSelectedItemsExt(selectedItems)}</View>
          </View>
          <Separator margin={20} />
          <Button
            mode="outlined"
            color="grey"
            onPress={() => console.log("Pressed")}
          >
            confirm
          </Button>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
}

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
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%"
  }
});
