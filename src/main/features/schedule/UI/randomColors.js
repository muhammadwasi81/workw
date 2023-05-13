import { predefinedColors } from "../utils/colors";
const usedColors = [];

// export const getRandomColor = () => {
//   let randomColor;
//   do {
//     const randomColorIndex = Math.floor(
//       Math.random() * predefinedColors.length
//     );
//     randomColor = predefinedColors[randomColorIndex];
//   } while (usedColors.includes(randomColor));

//   usedColors.push(randomColor);

//   if (usedColors.length === predefinedColors.length) {
//     usedColors.length = 0; // Clear the array if all colors have been used
//   }

//   return randomColor;
// };
export const getRandomColor = () => {
  let randomColor;

  if (usedColors.length < 10) {
    // Use the next predefined color if available
    randomColor = predefinedColors[usedColors.length];
  } else {
    do {
      randomColor = generateRandomColor();
    } while (usedColors.includes(randomColor));
  }

  usedColors.push(randomColor);

  return randomColor;
};

const generateRandomColor = () => {
  const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
  return randomColor;
};
