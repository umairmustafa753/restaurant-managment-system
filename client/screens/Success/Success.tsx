import * as React from "react";
import { StyleSheet, SafeAreaView, Animated } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";

import Separator from "../../components/Separator";
import { Text } from "../../components/Themed";

const Success = () => {
  const navigator = useNavigation();
  const route = useRoute();

  const handleNavigate = () => {
    navigator.reset({ routes: [{ name: route?.params?.navigateTo }] });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Horray !</Text>
      <Separator margin={20} />
      <Text style={styles.title}>{route?.params?.msg}</Text>
      <Separator margin={20} />
      <CountdownCircleTimer
        isPlaying
        duration={3}
        size={180}
        colors={[
          ["#004777", 0.4],
          ["#F7B801", 0.4],
          ["#A30000", 0.2]
        ]}
        onComplete={handleNavigate}
      >
        {({ remainingTime }) => (
          <>
            <Animated.Text>Redirecting in</Animated.Text>
            <Separator margin={15} />
            <Animated.Text style={styles.AnimatedText}>
              {remainingTime}
            </Animated.Text>
            <Separator margin={15} />
            <Animated.Text>seconds</Animated.Text>
          </>
        )}
      </CountdownCircleTimer>
    </SafeAreaView>
  );
};

export default Success;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    padding: 20
  },
  title: {
    fontSize: 20,
    fontWeight: "bold"
  },
  padding: {
    padding: 30
  },
  AnimatedText: {
    fontSize: 40
  }
});
