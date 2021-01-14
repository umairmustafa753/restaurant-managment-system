import * as React from "react";
import { StyleSheet } from "react-native";
import BeautifulHorizontalList from "react-native-beautiful-horizontal-list";

import EditScreenInfo from "../../components/EditScreenInfo";
import { Text, View } from "../../components/Themed";

const staticData = [
  {
    title: "Karahi",
    value: "8,984",
    unit: "Rs",
    primaryColor: "#10CFE4",
    imageSource: require("../../assets/images/favicon.png")
  },
  {
    title: "Kabab",
    value: "2.6",
    unit: "Rs",
    primaryColor: "#c84cf0",
    imageSource: require("../../assets/images/favicon.png")
  },
  {
    title: "Tikka",
    value: "9501",
    unit: "Rs",
    primaryColor: "#10E471",
    imageSource: require("../../assets/images/favicon.png")
  }
];

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Home</Text> */}
      <BeautifulHorizontalList data={staticData} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "flex-end"
  },
  title: {
    fontSize: 20,
    fontWeight: "bold"
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%"
  }
});
