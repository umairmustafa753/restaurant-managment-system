import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  LayoutAnimation,
  StyleSheet,
  View,
  Text,
  ScrollView,
  UIManager,
  TouchableOpacity,
  Platform
} from "react-native";

const ExpandableComponent = ({ item, onClickFunction }) => {
  //Custom Component for the Expandable List
  const [layoutHeight, setLayoutHeight] = useState<number>(0);

  useEffect(() => {
    if (item.isExpanded) {
      setLayoutHeight(null);
    } else {
      setLayoutHeight(0);
    }
  }, [item.isExpanded]);

  return (
    <View style={styles.listContainer}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onClickFunction}
        style={styles.header}
      >
        <Text style={styles.headerText}>{item.category_name}</Text>
      </TouchableOpacity>
      <View
        style={{
          height: layoutHeight,
          overflow: "hidden"
        }}
      >
        {item.subcategory.map((item, key) => (
          <View key={key} style={styles.content}>
            <Text style={styles.text}>
              {key}. {item.val}
            </Text>
            <View style={styles.separator} />
          </View>
        ))}
      </View>
    </View>
  );
};

const ExpandableList = ({ data }: { data: Array<object> }) => {
  const [listDataSource, setListDataSource] = useState<Array<object>>(data);
  const [multiSelect, setMultiSelect] = useState<boolean>(false);

  if (Platform.OS === "android") {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  const updateLayout = (index) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const array = [...listDataSource];
    if (multiSelect) {
      array[index]["isExpanded"] = !array[index]["isExpanded"];
    } else {
      array.map((value, placeindex) =>
        placeindex === index
          ? (array[placeindex]["isExpanded"] = !array[placeindex]["isExpanded"])
          : (array[placeindex]["isExpanded"] = false)
      );
    }
    setListDataSource(array);
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <Text style={styles.titleText}>Our Menu</Text>
          <TouchableOpacity onPress={() => setMultiSelect(!multiSelect)}>
            <Text
              style={{
                textAlign: "center",
                justifyContent: "center"
              }}
            >
              {multiSelect
                ? "Enable Single \n Expand"
                : "Enalble Multiple \n Expand"}
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          {listDataSource.map((item, key) => (
            <ExpandableComponent
              key={item.category_name}
              onClickFunction={() => {
                updateLayout(key);
              }}
              item={item}
            />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ExpandableList;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  safeAreaView: {
    flex: 1,
    backgroundColor: "white"
  },
  listContainer: {
    backgroundColor: "#f2f2f2"
  },
  innerContainer: {
    flexDirection: "row",
    padding: 10
  },
  titleText: {
    flex: 1,
    fontSize: 22,
    fontWeight: "bold"
  },
  header: {
    padding: 20
  },
  headerText: {
    fontSize: 16,
    fontWeight: "500"
  },
  separator: {
    height: 0.5,
    backgroundColor: "#e3e3e3",
    width: "95%",
    marginLeft: 16,
    marginRight: 16
  },
  text: {
    fontSize: 16,
    color: "#606070",
    padding: 10
  },
  content: {
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "#f7f7f7"
  }
});
