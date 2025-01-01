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
  return Array.from({ length: 100 }).map((_, index) => {
    return (
      <ConfettiFidget
        key={index}
        x={center.x}
        y={center.y}
        color={CONFETTI_COLORS[index % CONFETTI_COLORS.length]}
        delay={Math.random() * 50}
        index={index}
        setPopConfetti={setPopConfetti}
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

    const quadrant = Math.floor(index / 25); // Divides 100 pieces into 4 quadrants (25 pieces each)
    const quadrantAngle = (Math.PI / 2) * quadrant; // Converts quadrant to base angle
    const randomAngle =
      quadrantAngle + (Math.PI / 2) * (Math.random() * 0.8 + 0.1);

    const initialVelocity =
      Math.random() * WINDOW_WIDTH * 0.4 + WINDOW_WIDTH * 0.2;

    const deltaX = Math.cos(randomAngle) * initialVelocity;
    const deltaY = Math.sin(randomAngle) * initialVelocity;

    const burstDuration = 500 + Math.random() * 300;
    const fallDuration = 800 + Math.random() * 400;

    scale.value = withDelay(
      delay,
      withSpring(1, {
        damping: 3,
        stiffness: 300,
        mass: 0.3,
      })
    );

    rotation.value = withDelay(
      delay,
      withTiming((Math.random() - 0.5) * Math.PI * 16, {
        duration: burstDuration,
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
      withTiming(
        y + deltaY,
        {
          duration: burstDuration,
        },
        () => {
          translationY.value = withTiming(y + deltaY + WINDOW_HEIGHT * 0.5, {
            duration: fallDuration,
          });
        }
      )
    );

    opacity.value = withDelay(
      delay + burstDuration * 0.8,
      withTiming(
        0,
        {
          duration: fallDuration * 0.4,
        },
        () => {
          if (index === 99) {
            runOnJS(setPopConfetti)(false);
          }
        }
      )
    );

    rotateX.value = withTiming(Math.random() * 720, { duration: 1500 });
    rotateY.value = withTiming(Math.random() * 720, { duration: 1500 });
    rotateZ.value = withTiming(Math.random() * 720, { duration: 1500 });
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
