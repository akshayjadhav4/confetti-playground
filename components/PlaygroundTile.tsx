import React from "react";
import { RoundedRect } from "@shopify/react-native-skia";
type Props = {
  x: number;
  y: number;
  origin: {
    x: number;
    y: number;
  };
  size: number;
  cornerRadius: number;
  color: string;
  rotateAngle: number;
};

const PlaygroundTile = ({
  color,
  origin,
  rotateAngle,
  size,
  x,
  y,
  cornerRadius,
}: Props) => {
  return (
    <RoundedRect
      x={x}
      y={y}
      origin={{
        x: origin.x,
        y: origin.y,
      }}
      width={size}
      height={size}
      r={cornerRadius}
      color={color}
      opacity={0.1}
      transform={[{ rotate: rotateAngle }]}
    />
  );
};

export default PlaygroundTile;
