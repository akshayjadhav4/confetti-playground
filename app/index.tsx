import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import Playground from "@/components/Playground";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const Home = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <Playground />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default Home;
