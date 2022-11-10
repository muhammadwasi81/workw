import React, { useContext, useEffect, useState } from 'react';
import userIcon from '../../../../../content/NewContent/NavBar/UserSettingToggle/userIcon.svg';
import userLogout from '../../../../../content/NewContent/NavBar/UserSettingToggle/userLogout.svg';
import userSettings from '../../../../../content/NewContent/NavBar/UserSettingToggle/userSettings.svg';
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
import { SettingFilled } from '@ant-design/icons';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { LogoutOutlined } from '@ant-design/icons';

function UserDetailsDropDown({ id, isToggle }) {
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
          <NavLink to={`${ROUTES.USER.LINK}${id}`}>
            {/* <img src={userIcon} alt="userIcon" /> */}
            <Avatar
              icon={
                <UserOutlined
                  style={{ position: 'absolute', top: ' 5px', left: ' 5px' }}
                />
              }
              size={20}
              style={{
                backgroundColor: '#000000',
                verticalAlign: 'middle',
              }}
            />
            <p>{Profile}</p>
          </NavLink>
        </li>
        <li className="list__item">
          <NavLink to={`${STRINGS.ROUTES.USER.SETTINGS}`}>
            {/* <img src={userLogout} alt="userSettings" /> */}
            <SettingFilled
              style={{
                fontSize: '16px',
              }}
            />
            <p>{Settings}</p>
          </NavLink>
        </li>
        <li className="list__item" onClick={logout}>
          {/* <img src={userLogout} alt="userSettings" />
           */}
          <LogoutOutlined
            style={{
              fontSize: '16px',
            }}
          />
          <p>{Logout}</p>
        </li>
      </ul>

      <span>{SelectLanguage}</span>
      <ul className="list lang">
        <li
          className="list__item"
          onClick={() => handleLanguageChange('en')}
          style={{
            backgroundColor: userLanguage === 'en' && '#e5e5e5',
          }}
        >
          <p>{English}</p>
          <FontSizeOutlined />
        </li>

        <li
          className="list__item"
          onClick={() => handleLanguageChange('urdu')}
          style={{
            backgroundColor: userLanguage === 'urdu' && '#e5e5e5',
          }}
        >
          <p>{Urdu}</p>
          <FontSizeOutlined />
        </li>
        <li
          className="list__item"
          onClick={() => handleLanguageChange('arabic')}
          style={{
            backgroundColor: userLanguage === 'arabic' && '#e5e5e5',
          }}
        >
          <p>{Arabic}</p>
          <FontSizeOutlined />
        </li>
        <li
          className="list__item"
          onClick={() => handleLanguageChange('hindi')}
          style={{
            backgroundColor: userLanguage === 'hindi' && '#e5e5e5',
          }}
        >
          <p>{Hindi}</p>
          <FontSizeOutlined />
        </li>
        <li
          className="list__item"
          onClick={() => handleLanguageChange('turkish')}
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
            }}
          ></li>
        ))}
      </ul>
    </div>
  );
}

export default UserDetailsDropDown;
