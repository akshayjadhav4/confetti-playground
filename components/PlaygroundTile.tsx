import { ORIGIN } from "@/constants/dimensions";
import React, { useEffect } from "react";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  cancelAnimation,
  withSpring,
} from "react-native-reanimated";
type Props = {
  top: number;
  right?: number;
  left?: number;
  size: number;
  cornerRadius: number;
  color: string;
  rotateAngle: number;
  iconPath: keyof typeof images;
};

const images = {
  icon1: require("@/assets/images/icon.png"),
  icon2: require("@/assets/images/icon.png"),
  icon3: require("@/assets/images/icon.png"),
};

const PlaygroundTile = (props: Props) => {
  const rotateAngle = useSharedValue(props.rotateAngle);
  const top = useSharedValue(ORIGIN.y);
  const right = useSharedValue(ORIGIN.x);
  const left = useSharedValue(ORIGIN.x);
  const size = useSharedValue(0);
  const translationX = useSharedValue(0);
  const translationY = useSharedValue(0);

  const tileAnimatedStyle = useAnimatedStyle(() => {
    return {
      top: top.value,
      right: props.right ? right.value : null,
      left: props.left ? left.value : null,
      scale: size.value,
      transform: [{ rotate: `${rotateAngle.value}deg` }],
    };
  }, []);

  const tileImage = useAnimatedStyle(() => {
    return {
      height: size.value,
      width: size.value,
      transform: [
        { translateX: translationX.value },
        { translateY: translationY.value },
      ],
    };
  });

  const pan = Gesture.Pan()
    .minDistance(1)
    .onStart(() => {})
    .onUpdate((event) => {
      // Convert degrees to radians
      const angleInRadians = (rotateAngle.value * Math.PI) / 180;
      /**
       * consider rotation of the tile when updating its translation
       * rotatedX = translationX * cos(angle) + translationY * sin(angle);
       * rotatedY = -translationX * sin(angle) + translationY * cos(angle);
       */
      const rotatedX =
        event.translationX * Math.cos(angleInRadians) +
        event.translationY * Math.sin(angleInRadians);

      const rotatedY =
        -event.translationX * Math.sin(angleInRadians) +
        event.translationY * Math.cos(angleInRadians);

      translationX.value = rotatedX;
      translationY.value = rotatedY;
    })
    .onEnd(() => {
      translationX.value = withSpring(0);
      translationY.value = withSpring(0);
    })
    .runOnJS(true);

  useEffect(() => {
    rotateAngle.value = withRepeat(
      withTiming(props?.right ? 360 : -360, {
        duration: 1000,
        easing: Easing.linear,
      }),
      -1,
      false
    );

    top.value = withTiming(props.top, { duration: 800 });
    if (props?.right) {
      right.value = withTiming(props.right, { duration: 800 });
    }

    if (props?.left) {
      left.value = withTiming(props.left, { duration: 800 });
    }

    size.value = withTiming(props.size, { duration: 800 }, () => {
      cancelAnimation(rotateAngle);
    });
  }, []);

  return (
    <Animated.View
      style={[
        {
          width: size,
          height: size,
          backgroundColor: props.color,
          borderRadius: props.cornerRadius,
          position: "absolute",
          // opacity: 0.1,
        },
        tileAnimatedStyle,
      ]}
    >
      <GestureDetector gesture={pan}>
        <Animated.Image
          source={images[props.iconPath]}
          style={[
            {
              borderRadius: props.cornerRadius,
              position: "absolute",
              resizeMode: "cover",
            },
            tileImage,
          ]}
        />
      </GestureDetector>
    </Animated.View>
  );
};

export default PlaygroundTile;
