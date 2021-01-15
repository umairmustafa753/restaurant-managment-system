import * as React from "react";
import { StyleSheet, SafeAreaView, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { Text, View } from "../../components/Themed";
import HorizontalList from "../../components/HorizentalList";
import Separator from "../../components/Separator";

const entries = [
  {
    title: "Biryani",
    text: "Rs 250",
    image: require("../../assets/images/restaurant.png")
  },
  {
    title: "Biryani",
    text: "Rs 250",
    image: require("../../assets/images/restaurant.png")
  },
  {
    title: "Biryani",
    text: "Rs 250",
    image: require("../../assets/images/restaurant.png")
  },
  {
    title: "Biryani",
    text: "Rs 250",
    image: require("../../assets/images/restaurant.png")
  },
  {
    title: "Biryani",
    text: "Rs 250",
    image: require("../../assets/images/restaurant.png")
  }
];

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>New Arrivals</Text>
        <HorizontalList
          data={entries}
          type="default"
          style={styles.listStyle}
          width={200}
        />

        <Separator margin={50} />
        <Text style={styles.title}>Specialities</Text>
        <HorizontalList
          data={entries}
          type="default"
          style={styles.listStyle}
          width={200}
        />

        <Separator margin={50} />
        <Text style={styles.title}>Top Deals</Text>
        <HorizontalList
          data={entries}
          type="default"
          style={styles.listStyle}
          width={200}
        />

        <Separator margin={50} />
        <Text style={styles.title}>Birthday Sepical</Text>
        <HorizontalList
          data={entries}
          type="default"
          style={styles.listStyle}
          width={200}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 50
  },
  title: {
    fontSize: 20,
    marginHorizontal: 20,
    fontWeight: "bold"
  },
  listStyle: {
    flexDirection: "row",
    justifyContent: "center",
    height: 170
  }
});

export default HomeScreen;
