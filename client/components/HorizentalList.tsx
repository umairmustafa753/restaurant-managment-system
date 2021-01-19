import * as React from "react";
import { StyleSheet, Image } from "react-native";
import { withSafeAreaInsets } from "react-native-safe-area-context";
import Carousel from "react-native-snap-carousel";

import { Text, View } from "./Themed";

const renderItem = ({ item }) => {
  return (
    <View style={styles.renderItem}>
      <Image
        style={styles.image}
        source={{
          uri: item?.picture
        }}
      />
      <View style={styles.textContainer}>
        <Text style={[styles.textStyle]}>{item?.title}</Text>
        <Text>{item?.price} Rs</Text>
      </View>
    </View>
  );
};

const HorizontalList = ({
  data,
  type,
  style,
  width
}: {
  data: Array<object>;
  type: string;
  style?: object;
  width?: number;
}) => {
  return (
    <View style={[styles.conatiner, style]}>
      <Carousel
        layout={"default"}
        data={data}
        sliderWidth={width}
        itemWidth={width}
        renderItem={renderItem}
        layout={type}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  conatiner: {
    flex: 1
  },
  renderItem: {
    borderRadius: 5,
    height: "100%",
    padding: 5,
    marginLeft: 25,
    marginRight: 25,
    borderColor: "#e3e3e3",
    borderWidth: 5,
    overflow: "hidden",
    shadowColor: "#e3e3e3",
    shadowRadius: 1,
    shadowOpacity: 1
  },
  image: {
    width: "40%",
    height: "60%",
    right: 40,
    top: 5,
    position: "absolute",
    borderRadius: 50
  },
  textStyle: {
    fontSize: 12
  },
  textContainer: {
    position: "absolute",
    bottom: 30,
    left: 30
  }
});

export default HorizontalList;
