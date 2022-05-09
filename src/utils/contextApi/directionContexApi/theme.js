import React, { useContext } from "react";
import { ThemeProvider } from "styled-components";
import { LanguageChangeContext } from "../../localization/localContext/LocalContext";
import { dictionaryList } from "../../localization/languages";


const size = {
    mobileS: "320px",
    mobileM: "375px",
    mobileL: "425px",
    tablet: "768px",
    laptop: "1024px",
    laptopL: "1440px",
    desktop: "2560px",
  };
   const device = {
    mobileS: `(max-width: ${size.mobileS})`,
    mobileM: `(max-width: ${size.mobileM})`,
    mobileL: `(max-width: ${size.mobileL})`,
    tablet: `(max-width: ${size.tablet})`,
    laptop: `(max-width: ${size.laptop})`,
    laptopL: `(max-width: ${size.laptopL})`,
    desktop: `(max-width: ${size.desktop})`,
    desktopL: `(max-width: ${size.desktop})`,
  };
// const themes = {
//     dark: {
//         background: "#272823",
//         title: "#6495ed",
//         text: "#fff",
//
//     },
//     light: {
//         background: "#fff",
//         title: "#ff6347",
//         text: "#000",
//         width: "20px",
//         height: "20px",
//     },
// };

// const GlobalStyle = createGlobalStyle`
//   * {
//     margin: 0;
//     padding: 0;
//     transition: all 0.5s;
//   }
// `;

const Theme = ({ children }) => {
  const { userLanguage } = useContext(LanguageChangeContext);
  const label = dictionaryList[userLanguage].Direction;
  const theme = {
    Direction: label ,
    Device: device,
    
  };
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default Theme;
