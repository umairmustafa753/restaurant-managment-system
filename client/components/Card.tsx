import React from "react";
import { StyleSheet } from "react-native";
import { Button, Title } from "react-native-paper";

const Card = ({ titile, onPress }: { titile: string; onPress: () => void }) => {
  return (
    <Button
      style={styles.container}
      mode="outlined"
      color="grey"
      onPress={onPress}
    >
      {titile}
    </Button>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 7,
    marginBottom: 20
  }
});

export default Card;
