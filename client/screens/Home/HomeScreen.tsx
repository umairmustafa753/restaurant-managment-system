import React, { useEffect, useState } from "react";
import { StyleSheet, SafeAreaView, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Spinner from "react-native-loading-spinner-overlay";
import { connect } from "react-redux";

import { Text, View } from "../../components/Themed";
import HorizontalList from "../../components/HorizentalList";
import Separator from "../../components/Separator";
import FeaturedItemAction from "../../store/Actions/featuredItems";

const HomeScreen = (props) => {
  const [items, setItems] = useState<any>([]);

  useEffect(() => {
    props.getFeaturedItems();
  }, []);

  useEffect(() => {
    setItems(props?.featuredItems);
  }, [props?.featuredItems]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {items?.length ? (
          <View>
            <Text style={styles.title}>New Arrivals</Text>
            <Separator margin={20} />
            <HorizontalList
              data={items[0]?.newArrival}
              type="default"
              style={styles.listStyle}
              width={300}
            />

            <Separator margin={50} />
            <Text style={styles.title}>Specialities</Text>
            <Separator margin={20} />
            <HorizontalList
              data={items[0]?.specialities}
              type="default"
              style={styles.listStyle}
              width={300}
            />

            <Separator margin={50} />
            <Text style={styles.title}>Top Deals</Text>
            <Separator margin={20} />
            <HorizontalList
              data={items[0]?.topDeals}
              type="default"
              style={styles.listStyle}
              width={300}
            />
            <Separator margin={20} />
          </View>
        ) : (
          <Spinner
            visible={!items?.length}
            textContent={"Loading..."}
            textStyle={styles.spinnerTextStyle}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => {
  return {
    featuredItems: state?.featuredItemsReducer?.featuredItems?.featuredItems
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getFeaturedItems: () => {
      dispatch(FeaturedItemAction.GetFeaturedItems());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 50
  },
  spinnerTextStyle: {
    color: "#fff"
  },
  title: {
    fontSize: 20,
    marginHorizontal: 20,
    fontWeight: "bold"
  },
  listStyle: {
    flexDirection: "row",
    justifyContent: "center",
    height: 170
  }
});
