import * as React from "react";
import { StyleSheet, Image } from "react-native";

import { View } from "./Themed";

const Logo = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("../assets/images/restaurant.png")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center"
  },
  image: {
    width: 100,
    height: 100
  }
});

export default Logo;
