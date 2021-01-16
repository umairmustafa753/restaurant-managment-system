import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, FlatList, Alert } from "react-native";
import { SearchBar } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Button } from "react-native-paper";
import UserAvatar from "react-native-user-avatar";
import { Avatar } from "react-native-paper";
// import Modal from "react-native-modal";
import { Modal } from "./Modal";

import { Text, View } from "./Themed";
import Separator from "./Separator";

const List = ({ data }: { data: Array<object> }) => {
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
      <TouchableOpacity style={styles.itemStyle} onPress={() => getItem(item)}>
        <Text>{item?.title}</Text>
      </TouchableOpacity>
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
    // Alert.alert("Id : " + item.id + " Title : " + item.title);
  };

  return (
    <View>
      <View style={styles.container}>
        <Modal visible={isModalVisible} onClose={() => setModalVisible(false)}>
          <View style={styles.row}>
            <UserAvatar
              size={70}
              // src={}
              name="Umair Mustafa"
              style={styles.avatar}
            />
            <Text style={styles.modalTextStyle}>
              Umair Mustafa Order booking date 2021-12-20 8:30 PM
            </Text>
          </View>
          <Separator margin={20} />
          <Text>Menu Items</Text>
          <Text style={styles.modalText}>{modalData?.title}</Text>
          <Separator margin={20} />
          <View style={[styles.row, styles.spaceBetween]}>
            <Button mode="outlined" color="grey" onPress={() => {}}>
              Comfrim
            </Button>
            <Button mode="outlined" color="grey" onPress={() => {}}>
              Delete
            </Button>
          </View>
        </Modal>
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
