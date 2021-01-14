import * as React from "react";
import { StyleSheet } from "react-native";
import BeautifulHorizontalList from "react-native-beautiful-horizontal-list";

import { View } from "./Themed";

const HorizontalList = ({ data }: { data: Array<object> }) => {
  return (
    <View style={styles.separator}>
      <BeautifulHorizontalList
        data={data}
        itemContainerStyle={styles.itemContainerStyle}
        valueTextStyle={styles.itemTextColor}
        unitTextStyle={styles.itemTextColor}
        titleTextStyle={styles.itemTextColor}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
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
export default HorizontalList;
