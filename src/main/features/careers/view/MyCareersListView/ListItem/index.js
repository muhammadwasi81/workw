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
            <div className="font-bold text-[15px]" >Miletap</div>
          </div>
        </ItemHeader>
        <ItemContent className="ItemContent">
          <h3> React Js Developer </h3>
          <p>  Karachi, Pakistan - Full Time </p>
        </ItemContent>
      </SingleItem>
    </>
  );
}

export default ListItem;
