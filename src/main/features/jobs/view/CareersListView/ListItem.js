import moment from 'moment';
import Avatar from '../../../../sharedComponents/Avatar/avatarOLD';
import React from 'react';
import { useDispatch } from 'react-redux';
import { getCareerByIdAction } from '../../../careers/store/action';
import CardProfileTopView from '../../../travel/view/ListView/CardProfileTopView';

function ListItem({ item }) {
  const dispatch = useDispatch();
  const {
    id,
    designation,
    creator,
    description,
    city,
    country,
    department,
    createDate,
  } = item;

  const onJobClick = (id) => {
    //todo dispatch career by id
    console.log('on jobclick works');
    dispatch(getCareerByIdAction(id));
  };

  console.log(item);
  return (
    <div
      className="careersShortCard item-card cursor-pointer !flex !flex-row gap-3"
      onClick={() => onJobClick(id)}
    >
      <div>
        <Avatar
          name={creator.name}
          src={creator.image}
          round={true}
          width={40}
          height={40}
        />
      </div>

      <div className="w-full">
        <div className="text-[16px] font-bold text-sky-900 mb-1">
          {designation}
        </div>
        <div className="text-primary-color font-bold">{department}</div>
        <div className="shortCardDesc">{description}</div>
        <div className="text-xs">
          {city}, {country}
        </div>
        <div className="text-xs float-right">
          {moment(createDate).fromNow()}
        </div>
      </div>
    </div>
  );
}

export default ListItem;
