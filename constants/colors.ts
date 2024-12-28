const primary = '#FFC107';
const secondary = '#8B78E6';
const tertiary = '#6BC5FA';

const Colors = {
    PRIMARY: primary,
    SECONDARY: secondary,
    TERTIARY: tertiary,
};

export function getRandomColor(currentColor:string) {
    const colorValues = Object.values(Colors);
    const availableColors = colorValues.filter((color) => color !== currentColor);
    const randomIndex = Math.floor(Math.random() * availableColors.length);
    return availableColors[randomIndex];
}

export default Colors;