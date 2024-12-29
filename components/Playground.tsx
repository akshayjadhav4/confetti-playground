import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";

import { BlurMask, Canvas, Circle, Group } from "@shopify/react-native-skia";
import {
  CIRCULAR_CONTAINER_RADIUS,
  ORIGIN,
  REACTANGLE_CONTAINER_CORNER_RADIUS,
  REACTANGLE_CONTAINER_SIZE,
  ROTATE_ANGLE,
  WINDOW_HEIGHT,
  WINDOW_WIDTH,
} from "@/constants/dimensions";
import Colors, { getRandomColor } from "@/constants/colors";
import PlaygroundTile from "./PlaygroundTile";
import {
  runOnJS,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import Confetti from "./Confetti";
import { TILE } from "@/constants/tile";

const Playground = () => {
  const circularContainerRadius = useSharedValue(0);
  const activeTheme = useSharedValue(Colors.PRIMARY);
  const theme = useDerivedValue(() => activeTheme.value);
  const [popConfetti, setPopConfetti] = useState(false);
  const [confettiOrigin, setConfettiOrigin] = useState({
    x: ORIGIN.x,
    y: ORIGIN.y,
  });
  function triggerConfetti(tile: TILE) {
    switch (tile) {
      case TILE.Xcode:
        setConfettiOrigin({ x: ORIGIN.x - 80, y: ORIGIN.y });
        break;
      case TILE.Code:
        setConfettiOrigin({ x: ORIGIN.x + 80, y: ORIGIN.y - 80 });
        break;
      case TILE.AndroidStudio:
        setConfettiOrigin({ x: ORIGIN.x + 80 / 2, y: ORIGIN.y + 80 });
        break;
      default:
        break;
    }
    setPopConfetti(true);
    setTimeout(() => {
      setPopConfetti(false);
    }, 1500);
  }
  function dragFinish(tile: TILE) {
    activeTheme.value = withTiming(getRandomColor(activeTheme.value), {
      duration: 500,
    });
    runOnJS(triggerConfetti)(tile);
  }

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
              color={theme}
              opacity={0.1}
            />
            <BlurMask blur={8} style="normal" />
          </Group>
          <Confetti center={confettiOrigin} isExploding={popConfetti} />
        </Canvas>
        {/* Left center */}
        <PlaygroundTile
          right={WINDOW_WIDTH * 0.5 + CIRCULAR_CONTAINER_RADIUS * 0.3}
          top={WINDOW_HEIGHT * 0.7 * 0.5 - CIRCULAR_CONTAINER_RADIUS * 0.2}
          size={REACTANGLE_CONTAINER_SIZE}
          cornerRadius={REACTANGLE_CONTAINER_CORNER_RADIUS}
          color={theme}
          rotateAngle={ROTATE_ANGLE}
          iconPath="icon1"
          onDragFinish={dragFinish}
          tile={TILE.Xcode}
        />

        {/* right bottom */}
        <PlaygroundTile
          left={WINDOW_WIDTH * 0.5}
          top={WINDOW_HEIGHT * 0.7 * 0.5 + CIRCULAR_CONTAINER_RADIUS / 3}
          size={REACTANGLE_CONTAINER_SIZE}
          cornerRadius={REACTANGLE_CONTAINER_CORNER_RADIUS}
          color={theme}
          rotateAngle={-ROTATE_ANGLE}
          iconPath="icon2"
          onDragFinish={dragFinish}
          tile={TILE.AndroidStudio}
        />

        {/* right top */}

        <PlaygroundTile
          right={WINDOW_WIDTH * 0.2}
          top={WINDOW_HEIGHT * 0.2}
          size={REACTANGLE_CONTAINER_SIZE}
          cornerRadius={REACTANGLE_CONTAINER_CORNER_RADIUS}
          color={theme}
          rotateAngle={ROTATE_ANGLE}
          iconPath="icon3"
          onDragFinish={dragFinish}
          tile={TILE.Code}
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
