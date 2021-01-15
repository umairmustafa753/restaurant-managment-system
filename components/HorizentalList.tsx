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
        source={item.image}
        // source={{
        //   uri:
        //     "https://reactnativecode.com/wp-content/uploads/2017/05/react_thumb_install.png"
        // }}
      />
      <View style={styles.textContainer}>
        <Text style={[styles.textStyle]}>{item.title}</Text>
        <Text>{item.text}</Text>
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
    backgroundColor: "#f2f2f2",
    borderRadius: 5,
    height: "100%",
    padding: 5,
    top: 20,
    marginLeft: 25,
    marginRight: 25
  },
  image: {
    width: "40%",
    height: "35%",
    right: 40,
    top: 20,
    position: "absolute",
    borderRadius: 50
  },
  textStyle: {
    fontSize: 30
  },
  textContainer: {
    position: "absolute",
    backgroundColor: "#f2f2f2",
    bottom: 30,
    left: 30
  }
});

export default HorizontalList;
