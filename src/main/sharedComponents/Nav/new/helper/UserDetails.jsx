import React, { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Avatar from '../../../../sharedComponents/Avatar/avatarOLD';
import navDownIcon from '../../../../../content/svg/menu/newNavBarIcon/navDownIcon.svg';
import navUpIcon from '../../../../../content/svg/menu/newNavBarIcon/navUpIcon.svg';
import { LanguageChangeContext } from '../../../../../utils/localization/localContext/LocalContext';

import { dictionaryList } from '../../../../../utils/localization/languages';
import UserDetailsDropDown from './UserDetailsDropDown';
function UserDetails() {
  const { userLanguage } = useContext(LanguageChangeContext);
  const {
    sharedLabels: { NotDesignated },
  } = dictionaryList[userLanguage];

  const {
    user: { name, profile_picture, designation, id },
  } = useSelector((state) => state.userSlice);

  const { navBarStatus } = useSelector((state) => state.responsiveSlice);
  const [isToggle, setIsToggle] = useState(false);

  useEffect(() => {
    setIsToggle(false);
  }, [navBarStatus === false]);

  const handleToggle = () => {
    setIsToggle(!isToggle);
  };
  return (
    <div className="userDetailsWrapper">
      <div className="userDetails">
        <Avatar
          src={profile_picture}
          name={name}
          active={false}
          round={true}
          style={{ border: '1px solid white' }}
          size={35}
        />
        <div className="userDetails__body">
          <p className="name">{name}</p>
          <span className="job-title">{designation || NotDesignated}</span>
        </div>
        <div className="userDetails__footer" onClick={handleToggle}>
          <img
            src={!isToggle ? navDownIcon : navUpIcon}
            height={15}
            width={15}
            alt="userSettingToggle"
          />
        </div>
      </div>
      <UserDetailsDropDown id={id} isToggle={isToggle} />
    </div>
  );
}

export default UserDetails;
