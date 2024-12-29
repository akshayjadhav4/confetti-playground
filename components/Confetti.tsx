import { CONFETTI_COLORS } from "@/constants/colors";
import {
  CONFETTI_FIDGET_SIZE,
  WINDOW_HEIGHT,
  WINDOW_WIDTH,
} from "@/constants/dimensions";
import {
  Group,
  processTransform3d,
  RoundedRect,
  Skia,
  toMatrix3,
  vec,
} from "@shopify/react-native-skia";
import React, { useEffect } from "react";
import {
  useDerivedValue,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const Confetti = ({
  isExploding = true,
  center,
}: {
  isExploding: boolean;
  center: { x: number; y: number };
}) => {
  if (!isExploding) {
    return null;
  }
  return Array.from({ length: 100 }).map((_, index) => {
    return (
      <ConfettiFidget
        key={index}
        x={center.x}
        y={center.y}
        color={CONFETTI_COLORS[index % CONFETTI_COLORS.length]}
        delay={Math.random() * 200}
        index={index}
      />
    );
  });
};

const ConfettiFidget = ({
  x,
  y,
  color,
  delay,
  index,
}: {
  x: number;
  y: number;
  color: string;
  delay: number;
  index: number;
}) => {
  const translationX = useSharedValue(x);
  const translationY = useSharedValue(y);
  const rotation = useSharedValue(0);
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);

  const centerY = useSharedValue(0);
  const rotateX = useSharedValue(Math.random() * 360);
  const rotateY = useSharedValue(Math.random() * 360);
  const rotateZ = useSharedValue(Math.random() * 360);

  const origin = useDerivedValue(() => {
    centerY.value = translationY.value + CONFETTI_FIDGET_SIZE / 2;
    const centerX = translationX.value + CONFETTI_FIDGET_SIZE / 2;
    return vec(centerX, centerY.value);
  });

  const matrix = useDerivedValue(() => {
    const mat3 = toMatrix3(
      processTransform3d([
        { rotateX: rotateX.value },
        { rotateY: rotateY.value },
        { rotateZ: rotateZ.value },
      ])
    );
    return Skia.Matrix(mat3);
  });

  useEffect(() => {
    opacity.value = 1;

    const randomAngle = Math.random() * Math.PI * 2;
    const distance = Math.random() * WINDOW_WIDTH * 1.5 + WINDOW_WIDTH * 0.5;
    const deltaX = Math.cos(randomAngle) * distance;
    const deltaY = Math.sin(randomAngle) * distance - WINDOW_HEIGHT * 0.2;
    // duration for animation
    const duration = 1000 + Math.random() * 500;

    scale.value = withDelay(
      delay,
      withSpring(1, {
        damping: 5,
        stiffness: 200,
        mass: 0.5,
      })
    );

    rotation.value = withDelay(
      delay,
      withTiming((Math.random() - 0.5) * Math.PI * 8, {
        duration: duration * 0.8,
      })
    );

    translationX.value = withDelay(
      delay,
      withTiming(x + deltaX, {
        duration: duration * 0.8,
      })
    );

    translationY.value = withDelay(
      delay,
      withTiming(y + deltaY + WINDOW_HEIGHT * 0.5, {
        duration: duration,
      })
    );

    opacity.value = withDelay(
      delay + duration * 0.6,
      withTiming(0, {
        duration: duration * 0.2,
      })
    );

    rotateX.value = withTiming(Math.random() * 360, { duration: 4000 });
    rotateY.value = withTiming(Math.random() * 360, { duration: 4000 });
    rotateZ.value = withTiming(Math.random() * 360, { duration: 4000 });
  }, []);

  return (
    <Group origin={origin} matrix={matrix}>
      <RoundedRect
        x={translationX}
        y={translationY}
        height={CONFETTI_FIDGET_SIZE * 2}
        width={CONFETTI_FIDGET_SIZE}
        r={2}
        color={color}
        opacity={opacity}
      />
    </Group>
  );
};

export default Confetti;
