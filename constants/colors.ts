const primary = '#FFC107';
const secondary = '#8B78E6';
const tertiary = '#6BC5FA';

const Colors = {
    PRIMARY: primary,
    SECONDARY: secondary,
    TERTIARY: tertiary,
};
export const CONFETTI_COLORS = [
    "#CC6677",
    "#85D9C9",
    "#68BFD1", 
    "#A8D4B7",
    "#FFE9C2",
    "#C8A9A9",
    "#B58ACF",
    "#6E9EC7",
  ];
export function getRandomColor(currentColor:string) {
    const colorValues = Object.values(Colors);
    const availableColors = colorValues.filter((color) => color !== currentColor);
    const randomIndex = Math.floor(Math.random() * availableColors.length);
    return availableColors[randomIndex];
}

export default Colors;