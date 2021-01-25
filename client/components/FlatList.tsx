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

  const showModal = () => {
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    setFilteredDataSource(data);
    setMasterDataSource(data);
  }, [data]);

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
          <Text>
            {data?.length
              ? `${item?.firstName} ${item?.lastName}`
              : item?.title}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const ItemSeparatorView = () => {
    return <View style={styles.ItemSeparatorView} />;
  };

  const getItem = (item: any) => {
    setModalData(item);
    showModal();
  };

  return (
    <View>
      <View style={styles.container}>
        {children(modalData, isModalVisible, hideModal)}
        <SearchBar
          round
          onChangeText={(text) => searchFilterFunction(text)}
          placeholder={`Search here from ${filteredDataSource?.length} items`}
          inputContainerStyle={styles.inputContainerStyle}
          lightTheme={true}
          value={search}
        />
        <FlatList
          data={filteredDataSource}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView}
          ListEmptyComponent={
            <View style={styles.noResultView}>
              <Text style={styles.noResultText}>No Result Found</Text>
            </View>
          }
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
  noResultView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 50
  },
  noResultText: {
    fontSize: 20,
    top: 5
  },
  ItemSeparatorView: {
    height: 0.5,
    width: "100%",
    backgroundColor: "#C8C8C8"
  },
  inputContainerStyle: {
    backgroundColor: "white",
    borderColor: "white"
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
