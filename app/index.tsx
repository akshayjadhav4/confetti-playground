import { StyleSheet, Text, View } from "react-native";
import React from "react";

type Props = {};

const Home = (props: Props) => {
  return (
    <View style={styles.container}>
      <Text>Home</Text>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
