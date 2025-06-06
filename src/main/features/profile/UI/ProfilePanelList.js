import React, { useContext } from 'react';
import { Link, NavLink, useLocation, useParams } from 'react-router-dom';
import { ROUTES } from '../../../../utils/routes';
import { listItem } from '../utils/listItem';
import { LanguageChangeContext } from '../../../../utils/localization/localContext/LocalContext';
import { profileDictionaryList } from '../localization/index';
function ProfilePanelList() {
  const location = useLocation();
  const param = useParams();
  const { pathname } = location;
  console.log('location', pathname + '/about');
  const { userLanguage } = useContext(LanguageChangeContext);
  const { profileDictionary } = profileDictionaryList[userLanguage];

  return (
    <div className="flex flex-col bg-white basis-[300px] border-r border-r-neutral-300 p-3">
      <p className="px-2 text-black text-[18px] font-semibold">
        {profileDictionary.information}
      </p>
      {listItem.map((list) => {
        return (
          <div className="p-2" key={list.id}>
            {/* <NavLink
              to={ROUTES.USER.DEFAULT + param.id + list.to}
              className={({ isActive }) =>
                isActive
                  ? '!text-primary-color p-2 font-bold text-base flex overflow-hidden rounded-[8px] bg-[#526bb13d] hover:!text-primary-color hover:bg-[#526bb13d] transition-all duration-300'
                  : 'text-gray-500 p-2 text-base hover:!bg-[#526bb13d] hover:!text-primary-color rounded-[8px] flex transition-all duration-300 font-semibold'
              }
            >
              {list.name}
            </NavLink> */}

            {/* TODO:// REMOVE IT LATER */}
            <Link
              to={list.to}
              className="!text-primary-color p-2 font-bold text-base flex overflow-hidden rounded-[8px] bg-[#526bb13d] hover:!text-primary-color hover:bg-[#526bb13d] transition-all duration-300"
            >
              {list.name}
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export default ProfilePanelList;
