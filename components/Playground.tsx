import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";

import { BlurMask, Canvas, Circle, Group } from "@shopify/react-native-skia";
import {
  CIRCULAR_CONTAINER_RADIUS,
  REACTANGLE_CONTAINER_CORNER_RADIUS,
  REACTANGLE_CONTAINER_SIZE,
  ROTATE_ANGLE,
  WINDOW_HEIGHT,
  WINDOW_WIDTH,
} from "@/constants/dimensions";
import Colors from "@/constants/colors";
import PlaygroundTile from "./PlaygroundTile";
import {
  useDerivedValue,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";

const Playground = () => {
  const circularContainerRadius = useSharedValue(0);

  useEffect(() => {
    circularContainerRadius.value = withDelay(
      1000,
      withTiming(
        CIRCULAR_CONTAINER_RADIUS,
        {
          duration: 1000,
        },
        () => {
          //
        }
      )
    );
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Confetti Playground</Text>
      <View style={styles.innerContainer}>
        <Canvas
          style={{
            flex: 1,
          }}
        >
          <Group>
            <Circle
              r={useDerivedValue(() => circularContainerRadius.value)}
              cx={WINDOW_WIDTH * 0.5}
              cy={WINDOW_HEIGHT * 0.7 * 0.5}
              color={Colors.PRIMARY}
              opacity={0.1}
            />
            <BlurMask blur={8} style="normal" />
          </Group>
        </Canvas>
        {/* Left center */}
        <PlaygroundTile
          right={WINDOW_WIDTH * 0.5 + CIRCULAR_CONTAINER_RADIUS * 0.3}
          top={WINDOW_HEIGHT * 0.7 * 0.5 - CIRCULAR_CONTAINER_RADIUS * 0.2}
          size={REACTANGLE_CONTAINER_SIZE}
          cornerRadius={REACTANGLE_CONTAINER_CORNER_RADIUS}
          color={Colors.PRIMARY}
          rotateAngle={ROTATE_ANGLE}
          iconPath="icon1"
        />

        {/* right bottom */}
        <PlaygroundTile
          left={WINDOW_WIDTH * 0.5}
          top={WINDOW_HEIGHT * 0.7 * 0.5 + CIRCULAR_CONTAINER_RADIUS / 3}
          size={REACTANGLE_CONTAINER_SIZE}
          cornerRadius={REACTANGLE_CONTAINER_CORNER_RADIUS}
          color={Colors.PRIMARY}
          rotateAngle={ROTATE_ANGLE}
          iconPath="icon2"
        />

        {/* right top */}

        <PlaygroundTile
          right={WINDOW_WIDTH * 0.2}
          top={WINDOW_HEIGHT * 0.2}
          size={REACTANGLE_CONTAINER_SIZE}
          cornerRadius={REACTANGLE_CONTAINER_CORNER_RADIUS}
          color={Colors.PRIMARY}
          rotateAngle={-ROTATE_ANGLE}
          iconPath="icon3"
        />
      </View>
    </View>
  );
};

export default Playground;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
  },
  title: {
    alignSelf: "center",
    color: "#99AAAB",
    fontSize: 18,
  },
});
