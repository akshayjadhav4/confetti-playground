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
  DerivedValue,
} from "react-native-reanimated";
type Props = {
  top: number;
  right?: number;
  left?: number;
  size: number;
  cornerRadius: number;
  color: DerivedValue<string>;
  rotateAngle: number;
  iconPath: keyof typeof images;
  changeTheme?: () => void;
};

const images = {
  icon1: require("@/assets/images/icon.png"),
  icon2: require("@/assets/images/icon.png"),
  icon3: require("@/assets/images/icon.png"),
};

const PlaygroundTile = (props: Props) => {
  const rotateAngle = useSharedValue(props.rotateAngle);
  const tileImageRotateAngle = useSharedValue(props.rotateAngle);
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
      top: top.value,
      right: props.right ? right.value : null,
      left: props.left ? left.value : null,
      transform: [
        { translateX: translationX.value },
        { translateY: translationY.value },
        { rotate: `${tileImageRotateAngle.value}deg` },
      ],
    };
  });

  const pan = Gesture.Pan()
    .minDistance(1)
    .onStart(() => {
      tileImageRotateAngle.value = 0;
    })
    .onUpdate((event) => {
      translationX.value = event.translationX;
      translationY.value = event.translationY;
      // Increment rotation angle for continuous spinning while dragging
      tileImageRotateAngle.value += 5;
    })
    .onEnd(() => {
      translationX.value = withSpring(0);
      translationY.value = withSpring(0);
      tileImageRotateAngle.value = withTiming(rotateAngle.value);
      if (props?.changeTheme) {
        props?.changeTheme();
      }
    })
    .runOnJS(true);

  useEffect(() => {
    const intialRotation = withRepeat(
      withTiming(props?.right ? 360 : -360, {
        duration: 1000,
        easing: Easing.linear,
      }),
      -1,
      false
    );
    rotateAngle.value = intialRotation;
    tileImageRotateAngle.value = intialRotation;

    top.value = withTiming(props.top, { duration: 800 });
    if (props?.right) {
      right.value = withTiming(props.right, { duration: 800 });
    }

    if (props?.left) {
      left.value = withTiming(props.left, { duration: 800 });
    }

    size.value = withTiming(props.size, { duration: 800 }, () => {
      cancelAnimation(rotateAngle);
      tileImageRotateAngle.value = rotateAngle.value;
    });
  }, []);

  return (
    <>
      <Animated.View
        style={[
          {
            width: size,
            height: size,
            backgroundColor: props.color,
            borderRadius: props.cornerRadius,
            position: "absolute",
            opacity: 0.1,
          },
          tileAnimatedStyle,
        ]}
      />
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
    </>
  );
};

export default PlaygroundTile;
