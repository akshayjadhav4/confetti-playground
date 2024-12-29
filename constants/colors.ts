const primary = '#FFC107';
const secondary = '#8B78E6';
const tertiary = '#6BC5FA';

const Colors = {
    PRIMARY: primary,
    SECONDARY: secondary,
    TERTIARY: tertiary,
};
export const CONFETTI_COLORS = [
    "#FF6B6B",
    "#4ECDC4",
    "#45B7D1",
    "#96CEB4",
    "#FFEEAD",
    "#D4A5A5",
    "#9B59B6",
    "#3498DB",
  ];
export function getRandomColor(currentColor:string) {
    const colorValues = Object.values(Colors);
    const availableColors = colorValues.filter((color) => color !== currentColor);
    const randomIndex = Math.floor(Math.random() * availableColors.length);
    return availableColors[randomIndex];
}

export default Colors;