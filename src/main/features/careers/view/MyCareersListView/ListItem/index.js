import React, { useState, useEffect } from "react";

import { Button, Image } from "antd";
import UserInfo from "../../../../../sharedComponents/UserShortInfo/UserInfo";
import SublineDesigWithTime from "../../../../../sharedComponents/UserShortInfo/SubLine/DesigWithTime";
import { getNameForImage } from "../../../../../../utils/base";
import moment from "moment";
import {
  ItemContent,
  ItemHeader,
  SingleItem,
} from "../../../../../sharedComponents/Card/CardStyle";
import { Link } from "react-router-dom";
import Avatar from "../../../../../sharedComponents/Avatar/avatarOLD";
import JobDetails from "../../DetailView/DetailComposer/JobDetails";
import { useDispatch } from "react-redux";
import { getAllCareerAction } from "../../DetailView/store/action";

function ListItem({ item, onClick }) {
  return (
    <>
      <SingleItem onClick={onClick}>
        <ItemHeader className="ItemHeader">
          <div className="flex items-center gap-3">
            <Avatar
              src={undefined}
              className="addPostAvatar"
              name={"Test Test"}
              width={40}
              height={40}
              round={true}
            />
            <div className="font-bold text-[15px] text-primary-color">
              {/* Miltap */}
              {item.department}
            </div>
          </div>
        </ItemHeader>
        <ItemContent className="!h-[100px] !max-h-[100px]">
          <div className="font-bold text-[14px] text-primary-color">
            {/* {" "}
            React Js Developer */}
            {item.designation}
          </div>
          <p className="careersDescShort">
            {/* Karachi, Pakistan - Full Time Karachi, Pakistan - Full Time Karachi,
            Pakistan - Full Time Karachi, Pakistan - Full Time Karachi, Pakistan
            - Full Time Karachi, Pakistan - Full TimeKarachi, Pakistan - Full
            TimeKarachi, Pakistan - Full TimeKarachi, Pakistan - Full
            TimeKarachi, Pakistan - Full TimeKarachi, Pakistan - Full Time
            Karachi, Pakistan - Full TimeKarachi, Pakistan - Full TimeKarachi,
            Pakistan - Full TimeKarachi, Pakistan - Full TimeKarachi, Pakistan -
            Full TimeKarachi, Pakistan - Full Time Karachi, Pakistan - Full
            TimeKarachi, Pakistan - Full TimeKarachi, Pakistan - Full
            TimeKarachi, Pakistan - Full Time */}
            {item.description}
          </p>
        </ItemContent>
      </SingleItem>
    </>
  );
}

export default ListItem;
