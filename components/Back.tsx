import * as React from "react";
import { StyleSheet, Image, TouchableOpacity } from "react-native";

import { View } from "./Themed";

const Back = ({ onPress }: { onPress: () => void }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image
        style={styles.image}
        source={require("../assets/images/left-arrow.png")}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    alignItems: "flex-start"
  },
  image: {
    width: 30,
    height: 30
  }
});

export default Back;
