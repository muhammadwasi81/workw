import { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import blackLogo from '../../../../../content/blackLogo.svg';
import whiteLogo from '../../../../../content/whiteLogo.svg';
import { dictionaryList } from '../../../../../utils/localization/languages';
import { LanguageChangeContext } from '../../../../../utils/localization/localContext/LocalContext';
import { darkModeHandler } from '../../../../../utils/Shared/store/slice';

function NavigationBottom() {
  const dispatch = useDispatch();
  const { userLanguage } = useContext(LanguageChangeContext);
  const localDictionary = dictionaryList[userLanguage];
  const { isDarkMode } = useSelector((state) => state.sharedSlice);

  const [theme, setTheme] = useState(
    window.localStorage.getItem('darkMode') === '1'
  );

  useEffect(() => {
    setTheme(isDarkMode);
    dispatch(darkModeHandler(isDarkMode));
  }, [isDarkMode]);

  return (
    <div className="navigationBottom">
      <div className="logo">
        <img src={theme ? whiteLogo : blackLogo} alt="dark-icon" />
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
