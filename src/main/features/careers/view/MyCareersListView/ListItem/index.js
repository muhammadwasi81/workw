import React from "react";

import { Button, Image } from "antd";
import UserInfo from "../../../../../sharedComponents/UserShortInfo/UserInfo";
import SublineDesigWithTime from "../../../../../sharedComponents/UserShortInfo/SubLine/DesigWithTime";
import { getNameForImage } from "../../../../../../utils/base";
import moment from "moment";
import { ItemContent, ItemHeader, SingleItem } from "../../../../../sharedComponents/Card/CardStyle";
import { Link } from "react-router-dom";
import Avatar from "../../../../../sharedComponents/Avatar/avatarOLD";

function ListItem(props) {
  return (
    <>
      <SingleItem>
        <ItemHeader className="ItemHeader">
          <div className="flex items-center gap-3">
            <Avatar src={undefined} className="addPostAvatar" name={"Test Test"} width={40} height={40} round={true} />
            <div className="font-bold text-[15px] text-primary-color" >Miletap</div>
          </div>
        </ItemHeader>
        <ItemContent className="!h-[100px] !max-h-[100px]" >
          <div className="font-bold text-[14px] text-primary-color"> React Js Developer </div >
          <p className="careersDescShort" >
            Karachi,
            Pakistan - Full Time Karachi,
            Pakistan - Full Time Karachi,
            Pakistan - Full Time Karachi,
            Pakistan - Full Time Karachi,
            Pakistan - Full Time  Karachi,
            Pakistan - Full TimeKarachi,
            Pakistan - Full TimeKarachi,
            Pakistan - Full TimeKarachi,
            Pakistan - Full TimeKarachi,
            Pakistan - Full TimeKarachi,
            Pakistan - Full Time  Karachi,
            Pakistan - Full TimeKarachi,
            Pakistan - Full TimeKarachi,
            Pakistan - Full TimeKarachi, Pakistan - Full TimeKarachi, Pakistan - Full TimeKarachi, Pakistan - Full Time
            Karachi, Pakistan - Full TimeKarachi, Pakistan - Full TimeKarachi, Pakistan - Full TimeKarachi, Pakistan - Full Time </p>
        </ItemContent>
        
      </SingleItem>
    </>
  );
}

export default ListItem;
