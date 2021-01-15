import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import { Card, Title, Paragraph } from "react-native-paper";

import { Text, View } from "../../components/Themed";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import Separator from "../../components/Separator";

const AccountScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Separator margin={30} />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={30}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.padding}>
            <Card>
              <Card.Content>
                <Title>Edit Accoount</Title>
              </Card.Content>
            </Card>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center"
  },
  padding: {
    padding: 30
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%"
  }
});

export default AccountScreen;
