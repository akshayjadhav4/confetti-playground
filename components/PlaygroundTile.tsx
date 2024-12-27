import { ORIGIN } from "@/constants/dimensions";
import React, { useEffect } from "react";
import { Image } from "react-native";

import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  cancelAnimation,
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
  const tileAnimatedStyle = useAnimatedStyle(() => {
    return {
      top: top.value,
      right: props.right ? right.value : null,
      left: props.left ? left.value : null,
      scale: size.value,
      transform: [{ rotate: `${rotateAngle.value}deg` }],
    };
  }, []);

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
      <Image
        source={images[props.iconPath]}
        style={{
          height: "100%",
          width: "100%",
          borderRadius: props.cornerRadius,
          position: "absolute",
          resizeMode: "cover",
        }}
      />
    </Animated.View>
  );
};

export default PlaygroundTile;
