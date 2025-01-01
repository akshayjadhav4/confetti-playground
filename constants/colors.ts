const primary = '#FFC107';
const secondary = '#8B78E6';
const tertiary = '#6BC5FA';

const Colors = {
    PRIMARY: primary,
    SECONDARY: secondary,
    TERTIARY: tertiary,
};
export const CONFETTI_COLORS = [
    "#FF6B6B",  // Bright Red
    "#4ECDC4",  // Turquoise
    "#FFD93D",  // Bright Yellow
    "#6A5ACD",  // Slate Blue
    "#20B2AA",  // Light Sea Green
    "#FF4500",  // Orange Red
    "#7B68EE",  // Medium Slate Blue
    "#00CED1",  // Dark Turquoise
];
export function getRandomColor(currentColor:string) {
    const colorValues = Object.values(Colors);
    const availableColors = colorValues.filter((color) => color !== currentColor);
    const randomIndex = Math.floor(Math.random() * availableColors.length);
    return availableColors[randomIndex];
}

export default Colors;