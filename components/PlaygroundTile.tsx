import { ORIGIN } from "@/constants/dimensions";
import React, { useEffect } from "react";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import * as Haptics from "expo-haptics";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  cancelAnimation,
  withSpring,
  DerivedValue,
  runOnJS,
  ReduceMotion,
} from "react-native-reanimated";
import { TILE } from "@/constants/tile";
type Props = {
  top: number;
  right?: number;
  left?: number;
  size: number;
  cornerRadius: number;
  color: DerivedValue<string>;
  rotateAngle: number;
  iconPath: keyof typeof images;
  onDragFinish?: (tile: TILE) => void;
  tile: TILE;
};

const images = {
  icon1: require("@/assets/images/xcode.png"),
  icon2: require("@/assets/images/android-studio.png"),
  icon3: require("@/assets/images/code.png"),
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
  const imageSize = useSharedValue(0);

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
      height: imageSize.value,
      width: imageSize.value,
      top: top.value - 6,
      right: props.right ? right.value - 6 : null,
      left: props.left ? left.value - 6 : null,
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
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
      translationX.value = event.translationX;
      translationY.value = event.translationY;
      // Increment rotation angle for continuous spinning while dragging
      tileImageRotateAngle.value += 25;
    })
    .onTouchesUp(() => {
      if (props?.onDragFinish) {
        runOnJS(props?.onDragFinish)(props.tile);
      }
    })
    .onEnd(() => {
      translationX.value = withSpring(0, {
        damping: 15,
        stiffness: 180,
        overshootClamping: false,
      });

      translationY.value = withSpring(0, {
        damping: 15,
        stiffness: 180,
        overshootClamping: false,
      });
      tileImageRotateAngle.value = withTiming(rotateAngle.value, {
        duration: 100,
      });
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
    imageSize.value = withTiming(props.size + 12, { duration: 800 });
    size.value = withTiming(props.size, { duration: 800 }, () => {
      // stop continues rotation
      cancelAnimation(rotateAngle);
      // convert rotation degree between 0 to 360 e.g.-725 % 360 = -5°
      const currentRotation = rotateAngle.value % 360;
      // same as above but for final expected angle
      let normalizedTarget = props?.rotateAngle % 360;
      // convert negative angle to 0 to 360 positive
      if (normalizedTarget < 0) normalizedTarget += 360;
      // calculate difference between current and target angle
      let diff = normalizedTarget - currentRotation;
      // get shortest rotation path
      if (Math.abs(diff) > 180) {
        diff = diff > 0 ? diff - 360 : diff + 360;
      }
      // animate to final position
      const rotation = withSpring(currentRotation + diff, {
        damping: 15,
        stiffness: 90,
      });
      rotateAngle.value = rotation;
      tileImageRotateAngle.value = rotation;
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
