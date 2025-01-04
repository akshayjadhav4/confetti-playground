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
  runOnJS,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const Confetti = ({
  isExploding = true,
  center,
  setPopConfetti,
}: {
  isExploding: boolean;
  center: { x: number; y: number };
  setPopConfetti: (value: boolean) => void;
}) => {
  if (!isExploding) {
    return null;
  }
  return Array.from({ length: 150 }).map((_, index) => (
    <ConfettiFidget
      key={index}
      x={center.x}
      y={center.y}
      color={CONFETTI_COLORS[index % CONFETTI_COLORS.length]}
      delay={Math.random() * 30}
      index={index}
      setPopConfetti={setPopConfetti}
    />
  ));
};

const ConfettiFidget = ({
  x,
  y,
  color,
  delay,
  index,
  setPopConfetti,
}: {
  x: number;
  y: number;
  color: string;
  delay: number;
  index: number;
  setPopConfetti: (value: boolean) => void;
}) => {
  const translationX = useSharedValue(x);
  const translationY = useSharedValue(y);
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);

  const rotateX = Math.random() * 360;
  const rotateY = Math.random() * 360;
  const rotateZ = Math.random() * 360;

  const origin = useDerivedValue(() => {
    const centerX = translationX.value + CONFETTI_FIDGET_SIZE / 2;
    const centerY = translationY.value + CONFETTI_FIDGET_SIZE / 2;
    return vec(centerX, centerY);
  });

  const matrix = useDerivedValue(() => {
    const mat3 = toMatrix3(
      processTransform3d([{ rotateX }, { rotateY }, { rotateZ }])
    );
    return Skia.Matrix(mat3);
  });

  useEffect(() => {
    opacity.value = 1;

    const angle = Math.random() * Math.PI * 2;
    const initialVelocity =
      Math.random() * WINDOW_WIDTH * 0.4 + WINDOW_WIDTH * 0.2;

    const deltaX = Math.cos(angle) * initialVelocity;
    const deltaY = Math.sin(angle) * initialVelocity;

    const burstDuration = 400 + Math.random() * 200;

    scale.value = withDelay(
      delay,
      withSpring(1, {
        damping: 5,
        stiffness: 180,
        mass: 0.5,
      })
    );

    translationX.value = withDelay(
      delay,
      withTiming(x + deltaX, {
        duration: burstDuration,
      })
    );

    translationY.value = withDelay(
      delay,
      withTiming(y + deltaY, {
        duration: burstDuration,
      })
    );

    opacity.value = withDelay(
      delay + burstDuration * 0.5,
      withTiming(
        0,
        {
          duration: burstDuration * 0.5,
        },
        () => {
          if (index === 149) {
            runOnJS(setPopConfetti)(false);
          }
        }
      )
    );
  }, []);

  return (
    <Group origin={origin} matrix={matrix}>
      <RoundedRect
        x={translationX}
        y={translationY}
        height={CONFETTI_FIDGET_SIZE * 1.5}
        width={CONFETTI_FIDGET_SIZE}
        r={2}
        color={color}
        opacity={opacity}
      />
    </Group>
  );
};

export default Confetti;
