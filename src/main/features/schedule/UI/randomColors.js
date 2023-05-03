export const getRandomColor = () => {
  // console.log("function workedd");
  // const colors = [
  //   "#FFC300",
  //   "#FF5733",
  //   "#C70039",
  //   "#900C3F",
  //   "#581845",
  //   "#3498DB",
  //   "#16A085",
  //   "#27AE60",
  //   "#8E44AD",
  //   "#F1C40F",
  //   "#E67E22",
  //   "#E74C3C",
  // ];
  // console.log(colors, "colorss function");
  // const color = colors[Math.floor(Math.random() * colors.length)];
  // console.log(color, "color in randommm");
  // return color;
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

  const randomColorIndex = Math.floor(Math.random() * 16);
  console.log(randomColorIndex, "randomColorIndexx");
  if (randomColorIndex < predefinedColors.length) {
    console.log(predefinedColors[randomColorIndex], "color codeee");
    return predefinedColors[randomColorIndex];
  } else {
    const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
    return randomColor;
  }
};
