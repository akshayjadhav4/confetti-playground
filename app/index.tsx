import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import Playground from "@/components/Playground";

const Home = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Playground />
    </SafeAreaView>
  );
};

export default Home;
