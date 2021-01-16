import * as React from "react";
import { StyleSheet, Text, View } from "react-native";

const ResestPassword = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset Password</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    padding: 20
  },
  title: {
    fontSize: 20,
    fontWeight: "bold"
  }
});

export default ResestPassword;
