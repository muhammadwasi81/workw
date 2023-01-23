import React, { useContext, useEffect, useState } from 'react';
import userIcon from '../../../../../content/NewContent/NavBar/UserSettingToggle/profileIcon.svg';
import userLogout from '../../../../../content/NewContent/NavBar/UserSettingToggle/logoutIcon.svg';
import userSettings from '../../../../../content/NewContent/NavBar/UserSettingToggle/settingsIcon.svg';
import { STRINGS, logout } from '../../../../../utils/base';
import { NavLink } from 'react-router-dom';
import { FontSizeOutlined } from '@ant-design/icons';
import { userSettingToggleFun } from '../../../../../store/appReducer/responsiveSlice';
import { LanguageChangeContext } from '../../../../../utils/localization/localContext/LocalContext';
import { dictionaryList } from '../../../../../utils/localization/languages';
import { useDispatch } from 'react-redux';
import {
  defualtThemeColor,
  ThemeColorEnum,
} from '../../../../../utils/Shared/enums/enums';
import { ROUTES } from '../../../../../utils/routes';

function UserDetailsDropDown({ id, isToggle, onClickClose }) {
  const getCurrentTheme = () => {
    return localStorage.getItem('theme');
  };
  const [currentTheme, setCurrentTheme] = useState(
    getCurrentTheme() || defualtThemeColor
  );
  const { userLanguage, userLanguageChange } = useContext(
    LanguageChangeContext
  );
  const {
    sharedLabels: {
      Profile,
      Settings,
      Logout,
      SelectLanguage,
      theme,
      English,
      Hindi,
      Turkish,
      Urdu,
      Arabic,
    },
  } = dictionaryList[userLanguage];

  const dispatch = useDispatch();
  const handleLanguageChange = (e) => {
    userLanguageChange(e);
    dispatch(userSettingToggleFun(false));
  };
  const handleTheme = (currentTheme) => {
    setCurrentTheme(currentTheme);
    document.documentElement.style.setProperty(
      '--currentThemeColor',
      currentTheme
    );
    localStorage.setItem('theme', currentTheme);
  };

  useEffect(() => {
    document.documentElement.style.setProperty(
      '--currentThemeColor',
      currentTheme
    );
  }, []);

  let classes = 'dropDown ';
  classes += !isToggle ? 'close' : 'open';

  return (
    <div className={classes}>
      <ul className="list">
        <li className="list__item">
          <NavLink 
            to={`${ROUTES.USER.LINK}${id}`}
            onClick={onClickClose}
          >
            <img src={userIcon} alt="userIcon" loading="lazy" />
            <p>{Profile}</p>
          </NavLink>
        </li>
        <li className="list__item">
          <NavLink 
            to={`${STRINGS.ROUTES.USER.SETTINGS}`}
            onClick={onClickClose}  
          >
            <img src={userLogout} alt="userSettings" loading="lazy" />
            <p>{Settings}</p>
          </NavLink>
        </li>
        <li className="list__item" onClick={logout}>
          <img src={userSettings} alt="userSettings" loading="lazy" />
          <p>{Logout}</p>
        </li>
      </ul>

      <span>{SelectLanguage}</span>
      <ul className="list lang">
        <li
          className="list__item"
          onClick={() => {
            handleLanguageChange('en');
            onClickClose();
          }
        }
          style={{
            backgroundColor: userLanguage === 'en' && '#e5e5e5',
          }}
        >
          <p>{English}</p>
          <FontSizeOutlined />
        </li>

        <li
          className="list__item"
          onClick={() => {
            handleLanguageChange('urdu'); 
            onClickClose();
          }
           }
          style={{
            backgroundColor: userLanguage === 'urdu' && '#e5e5e5',
          }}
        >
          <p>{Urdu}</p>
          <FontSizeOutlined />
        </li>
        <li
          className="list__item"
          onClick={() => {
            handleLanguageChange('arabic');
            onClickClose();
          }
        }
          style={{
            backgroundColor: userLanguage === 'arabic' && '#e5e5e5',
          }}
        >
          <p>{Arabic}</p>
          <FontSizeOutlined />
        </li>
        <li
          className="list__item"
          onClick={() => {
            handleLanguageChange('hindi');
            onClickClose();
          }}
          style={{
            backgroundColor: userLanguage === 'hindi' && '#e5e5e5',
          }}
        >
          <p>{Hindi}</p>
          <FontSizeOutlined />
        </li>
        <li
          className="list__item"
          onClick={() => {
            handleLanguageChange('turkish');
            onClickClose();
          }}
          style={{
            backgroundColor: userLanguage === 'turkish' && '#e5e5e5',
          }}
        >
          <p>{Turkish}</p>
          <FontSizeOutlined />
        </li>
      </ul>
      <span>{theme}</span>
      <ul className="theme">
        {ThemeColorEnum.map((color, index) => (
          <li
            key={index}
            style={{ background: color }}
            className={currentTheme === color ? 'color active' : 'color'}
            onClick={() => {
              handleTheme(color);
              onClickClose();
            }}
          ></li>
        ))}
      </ul>
    </div>
  );
}

export default UserDetailsDropDown;
