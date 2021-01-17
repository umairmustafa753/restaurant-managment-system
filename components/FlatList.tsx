import React, { useState, useEffect } from "react";
import { StyleSheet, FlatList } from "react-native";
import { SearchBar } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";

import { Text, View } from "./Themed";

const List = ({
  data,
  children
}: {
  data: Array<object>;
  children: (
    data: any,
    isModalVisible: boolean,
    isVisisble: () => void
  ) => React.ReactNode;
}) => {
  const [search, setSearch] = useState<string>("");
  const [filteredDataSource, setFilteredDataSource] = useState<Array<object>>(
    []
  );
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [masterDataSource, setMasterDataSource] = useState<Array<object>>([]);
  const [modalData, setModalData] = useState<any>();

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((responseJson) => {
        setFilteredDataSource(responseJson);
        setMasterDataSource(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const searchFilterFunction = (text: string) => {
    if (text) {
      const newData = masterDataSource.filter((item: any) => {
        const itemData = item?.title
          ? item?.title.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  const ItemView = ({ item }) => {
    return (
      <View style={styles.itemStyle}>
        <TouchableOpacity onPress={() => getItem(item)}>
          <Text>{item?.title}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const ItemSeparatorView = () => {
    return (
      <View
        style={{
          height: 0.5,
          width: "100%",
          backgroundColor: "#C8C8C8"
        }}
      />
    );
  };

  const getItem = (item: any) => {
    setModalData(item);
    setModalVisible(true);
  };

  return (
    <View>
      <View style={styles.container}>
        {children(modalData, isModalVisible, toggleModal)}
        <SearchBar
          round
          onChangeText={(text) => searchFilterFunction(text)}
          placeholder={`Search here from ${filteredDataSource.length} items`}
          inputContainerStyle={{
            backgroundColor: "white",
            borderColor: "white"
          }}
          lightTheme={true}
          value={search}
        />
        <FlatList
          data={filteredDataSource}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white"
  },
  itemStyle: {
    padding: 30
  },
  avatar: {
    height: 70,
    width: 70,
    alignSelf: "center"
  },
  row: {
    flexDirection: "row"
  },
  spaceBetween: {
    justifyContent: "space-between"
  },
  modalTextStyle: {
    alignSelf: "center",
    width: "70%",
    marginLeft: 10
  },
  modalText: {
    width: "80%"
  }
});

export default List;
