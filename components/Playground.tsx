import { StyleSheet, Text, View } from "react-native";
import React from "react";

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

const Playground = () => {
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
              r={CIRCULAR_CONTAINER_RADIUS}
              cx={WINDOW_WIDTH * 0.5}
              cy={WINDOW_HEIGHT * 0.7 * 0.5}
              color={Colors.PRIMARY}
              opacity={0.1}
            />
            <BlurMask blur={8} style="normal" />
          </Group>

          <PlaygroundTile
            x={WINDOW_WIDTH * 0.5 + CIRCULAR_CONTAINER_RADIUS * 0.2}
            y={WINDOW_HEIGHT * 0.7 * 0.5 - CIRCULAR_CONTAINER_RADIUS}
            origin={{
              x: WINDOW_WIDTH * 0.5 + CIRCULAR_CONTAINER_RADIUS * 0.2,
              y: WINDOW_HEIGHT * 0.7 * 0.5 - CIRCULAR_CONTAINER_RADIUS,
            }}
            size={REACTANGLE_CONTAINER_SIZE}
            cornerRadius={REACTANGLE_CONTAINER_CORNER_RADIUS}
            color={Colors.PRIMARY}
            rotateAngle={ROTATE_ANGLE}
          />

          <PlaygroundTile
            x={WINDOW_WIDTH * 0.5}
            y={WINDOW_HEIGHT * 0.7 * 0.5 + CIRCULAR_CONTAINER_RADIUS / 3}
            origin={{
              x: WINDOW_WIDTH * 0.5,
              y: WINDOW_HEIGHT * 0.7 * 0.5 + CIRCULAR_CONTAINER_RADIUS / 3,
            }}
            size={REACTANGLE_CONTAINER_SIZE}
            cornerRadius={REACTANGLE_CONTAINER_CORNER_RADIUS}
            color={Colors.PRIMARY}
            rotateAngle={-ROTATE_ANGLE}
          />
          <PlaygroundTile
            x={WINDOW_WIDTH * 0.5 - CIRCULAR_CONTAINER_RADIUS * 0.8}
            y={WINDOW_HEIGHT * 0.7 * 0.5 - CIRCULAR_CONTAINER_RADIUS * 0.4}
            origin={{
              x: WINDOW_WIDTH * 0.5 - CIRCULAR_CONTAINER_RADIUS * 0.8,
              y: WINDOW_HEIGHT * 0.7 * 0.5 - CIRCULAR_CONTAINER_RADIUS * 0.4,
            }}
            size={REACTANGLE_CONTAINER_SIZE}
            cornerRadius={REACTANGLE_CONTAINER_CORNER_RADIUS}
            color={Colors.PRIMARY}
            rotateAngle={ROTATE_ANGLE}
          />
        </Canvas>
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
