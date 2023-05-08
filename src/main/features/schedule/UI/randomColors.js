const usedColors = [];

export const getRandomColor = () => {
  const predefinedColors = [
    "#FF0000",
    "#00FF00",
    "#0000FF",
    "#FFFF00",
    "#FF00FF",
    "#00FFFF",
    "#C0C0C0",
    "#FFA500",
    "#800080",
    "#008080",
  ];

  // const randomColorIndex = Math.floor(Math.random() * 16);
  // if (randomColorIndex < predefinedColors.length) {
  //   return predefinedColors[randomColorIndex];
  // } else {
  //   const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
  //   return randomColor;
  // }

  // If all colors have been used, reset the usedColors array
  // let randomColor;

  // do {
  //   const randomColorIndex = Math.floor(
  //     Math.random() * predefinedColors.length
  //   );
  //   randomColor = predefinedColors[randomColorIndex];
  // } while (usedColors.includes(randomColor));

  // usedColors.push(randomColor);

  // if (usedColors.length === predefinedColors.length) {
  //   usedColors.length = 0; // Clear the array if all colors have been used
  // }

  // return randomColor;

  const randomColorIndex = Math.floor(Math.random() * predefinedColors.length);
  return predefinedColors[randomColorIndex];
};
