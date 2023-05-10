import { predefinedColors } from "../utils/colors";
const usedColors = [];

export const getRandomColor = () => {
  let randomColor;
  do {
    const randomColorIndex = Math.floor(
      Math.random() * predefinedColors.length
    );
    randomColor = predefinedColors[randomColorIndex];
  } while (usedColors.includes(randomColor));

  usedColors.push(randomColor);

  if (usedColors.length === predefinedColors.length) {
    usedColors.length = 0; // Clear the array if all colors have been used
  }

  return randomColor;
};
