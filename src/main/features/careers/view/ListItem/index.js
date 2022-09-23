import { Button, Image } from "antd";
import React from "react";
import UserInfo from "../../../../sharedComponents/UserShortInfo/UserInfo";
import SublineDesigWithTime from "../../../../sharedComponents/UserShortInfo/SubLine/DesigWithTime";
import { getNameForImage } from "../../../../../utils/base";
import ProImage from "../../../../../content/NewContent/careers/proImage.svg";
import moment from "moment";
import { ItemContent, ItemHeader, SingleItem } from "../../../../sharedComponents/Card/CardStyle";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../../../utils/routes";

function ListItem(props) {
  return (
    <>
      <SingleItem className="Card3">
        <ItemHeader className="ItemHeader">
          <UserInfo
            avatarSrc={ProImage}
            name={"Owais Sheikh"}
            Subline={<SublineDesigWithTime designation={"CEO"} time={moment("2022-06-25T17:04:45.43").fromNow()} />}
          />
        </ItemHeader>
        <ItemContent className="ItemContent">
          <h3>React Js Developer</h3>
          <p>Karachi, Pakistan - Full Time</p>
        </ItemContent>
        <div className="ItemFooter">
          <Link className="ThemeBtn" to={"/careers/jobdetail"}>
            View Job
          </Link>
        </div>
      </SingleItem>
    </>
  );
}

export default ListItem;
