import React from "react";
import { Dimensions, StyleSheet, ViewStyle } from "react-native";
import NativeModal, {
  Direction,
  OnSwipeCompleteParams
} from "react-native-modal";

import { Text, View } from "./Themed";

export const Modal = ({
  visible,
  onClose,
  children,
  style,
  modalStyle,
  swipeDirection,
  onSwipeComplete
}: {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  style?: ViewStyle;
  modalStyle?: ViewStyle;
  swipeDirection?: Direction | Array<Direction>;
  onSwipeComplete?: (params: OnSwipeCompleteParams) => void;
}) => {
  return (
    <NativeModal
      animationIn="slideInUp"
      animationInTiming={500}
      animationOutTiming={800}
      avoidKeyboard
      swipeDirection={swipeDirection || ["down", "up"]}
      swipeThreshold={200}
      onSwipeComplete={onSwipeComplete}
      onDismiss={onClose}
      isVisible={visible}
      onBackdropPress={onClose}
      deviceWidth={Dimensions.get("window").width}
      style={[styles.container, modalStyle]}
      onBackButtonPress={onClose}
    >
      <View
        style={[
          styles.modalView,
          style,
          { backgroundColor: "white", width: "100%" }
        ]}
      >
        {children}
      </View>
    </NativeModal>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 0,
    margin: 0,
    justifyContent: "flex-end"
  },
  modalView: {
    width: "100%",
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    minHeight: 400
  }
});
