import React, { useContext } from "react";
import systemLogo from "../../../../../content/systemLogo.png";
import { dictionaryList } from "../../../../../utils/localization/languages";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";
function NavigationBottom() {
  const { userLanguage } = useContext(LanguageChangeContext);
  const localDictionary = dictionaryList[userLanguage];
  return (
    <div className="navigationBottom">
      <div className="logo">
        <img src={systemLogo} alt="#" />
      </div>
      <div className="bottomLinks">
        <div className="left">
          <p> {localDictionary.navMenuLabel.privacy}</p>
          <p> {localDictionary.navMenuLabel.TC}</p>
        </div>
        <div className="right">
          <p> {localDictionary.navMenuLabel.more}</p>
          <p>{localDictionary.navMenuLabel.feedBack}</p>
        </div>
      </div>
    </div>
  );
}

export default NavigationBottom;
