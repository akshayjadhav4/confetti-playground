import { Dimensions } from "react-native";

const { height: WINDOW_HEIGHT, width: WINDOW_WIDTH } = Dimensions.get("window");
const CIRCULAR_CONTAINER_RADIUS = 150;
const REACTANGLE_CONTAINER_CORNER_RADIUS = 18;
const REACTANGLE_CONTAINER_SIZE = 80;
const ROTATE_ANGLE = 12 ;
const CONFETTI_FIDGET_SIZE = 10
const ORIGIN = {
    x: WINDOW_WIDTH * 0.5,
    y: WINDOW_HEIGHT * 0.7 * 0.5
}
export {
    WINDOW_HEIGHT,
    WINDOW_WIDTH,
    CIRCULAR_CONTAINER_RADIUS,
    REACTANGLE_CONTAINER_CORNER_RADIUS,
    REACTANGLE_CONTAINER_SIZE,
    ROTATE_ANGLE,
    ORIGIN,
    CONFETTI_FIDGET_SIZE
}