import * as React from "react";
import { StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { Text } from "../../components/Themed";
import Separator from "../../components/Separator";
import HorizontalList from "../../components/horizentalList";

const staticData = [
  {
    title: "Karahi",
    value: "8,984",
    unit: "Rs",
    imageSource: require("../../assets/images/favicon.png")
  },
  {
    title: "Kabab",
    value: "2.6",
    unit: "Rs",
    imageSource: require("../../assets/images/favicon.png")
  },
  {
    title: "Tikka",
    value: "9501",
    unit: "Rs",
    imageSource: require("../../assets/images/favicon.png")
  }
];

const HomeScreen = () => {
  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Separator topMargin={50} />
      <Text style={styles.title}>Vegtarian</Text>
      <HorizontalList data={staticData} />
      <Text style={styles.title}>Non Vegtarian</Text>
      <HorizontalList data={staticData} />
      <Text style={styles.title}>Drinks</Text>
      <HorizontalList data={staticData} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "white"
  },
  title: {
    fontSize: 20,
    marginHorizontal: 20,
    marginTop: 10,
    fontWeight: "bold",
    color: "#8e8f8e"
  },
  itemContainerStyle: {
    backgroundColor: "#f2f2f2"
  },
  itemTextColor: {
    color: "#adadad"
  },
  separator: {
    marginVertical: 20
  }
});

export default HomeScreen;
