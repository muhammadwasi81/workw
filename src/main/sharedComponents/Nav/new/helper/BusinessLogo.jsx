import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { STRINGS } from '../../../../../utils/base';
import blackLogo from '../../../../../content/blackLogo.svg';
import whiteLogo from '../../../../../content/whiteLogo.svg';
import { darkModeHandler } from '../../../../../utils/Shared/store/slice';
import { useDispatch } from 'react-redux';

function BusinessLogo() {
  const dispatch = useDispatch();
  const { isDarkMode } = useSelector((state) => state.sharedSlice);

  useEffect(() => {
    dispatch(darkModeHandler());
    console.log('darkModeHandler', isDarkMode);
  }, [isDarkMode]);

  return (
    <div className="businessLogo">
      <NavLink to={STRINGS.ROUTES.ROOT}>
        <img src={isDarkMode ? blackLogo : whiteLogo} alt="dark-icon" />
      </NavLink>
    </div>
  );
}

export default BusinessLogo;
