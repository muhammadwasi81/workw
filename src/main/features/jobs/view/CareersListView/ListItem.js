import { Avatar } from "antd";
import moment from "moment";
import React from "react";
import { useDispatch } from "react-redux";
import { getCareerByIdAction } from "../../../careers/store/action";
import UserInfo from "../../../../sharedComponents/UserShortInfo/UserInfo";

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
    console.log("on jobclick works");
    dispatch(getCareerByIdAction(id));
  };
  return (
    <div
      className="careersShortCard item-card cursor-pointer !flex !flex-row gap-3"
      onClick={() => onJobClick(id)}
    >
      <div>
        <Avatar size={40} src={creator?.image} />
      </div>

      <div className="w-full">
        <div className="text-[16px] font-bold text-sky-900 mb-1">
          {designation}
        </div>
        <div className="shortCardDesc">{description}</div>
        <div className="font-bold">{department}</div>
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
