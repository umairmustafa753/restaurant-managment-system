import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { connect } from "react-redux";

import ExpandableList from "../../components/ExpandableList";
import Spinner from "react-native-loading-spinner-overlay";
import Menu from "../../store/Actions/menu";

const MenuScreen = (props) => {
  const [items, setItems] = useState<any>([]);

  useEffect(() => {
    props.getFeaturedItems();
  }, []);

  useEffect(() => {
    setItems(props?.menuItems);
  }, [props?.menuItems]);

  return (
    <>
      {items?.length ? (
        <ExpandableList data={items[0]?.menu} />
      ) : (
        <Spinner
          visible={!items?.length}
          textContent={"Loading..."}
          textStyle={styles.spinnerTextStyle}
        />
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    menuItems: state?.menuReducer?.menu?.MenuList
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getFeaturedItems: () => {
      dispatch(Menu.GetMenuItems());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuScreen);

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: "#fff"
  }
});
