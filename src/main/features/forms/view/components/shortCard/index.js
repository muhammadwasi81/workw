import React from "react";
import UserInfo from "../../../../../sharedComponents/UserShortInfo/UserInfo";
import SublineDesigWithTime from "../../../../../sharedComponents/UserShortInfo/SubLine/DesigWithTime";
import ProImage from "../../../../../../content/NewContent/careers/proImage.svg";
import moment from "moment";
import { ItemContent, ItemHeader, SingleItem } from "../../../../../sharedComponents/Card/CardStyle";
import { Link } from "react-router-dom";
import { Button } from "antd";
import './style.css';
import { ROUTES } from "../../../../../../utils/routes";

function ListItem(props) {
  return (
    <>
      <SingleItem className="Card3 formShortCard">
        <ItemHeader className="ItemHeader">
          <UserInfo
            avatarSrc={ProImage}
            name={"Owais Sheikh"}
            Subline={<SublineDesigWithTime designation={"CEO"} time={moment("2022-06-25T17:04:45.43").fromNow()} />}
          />
        </ItemHeader>
        <ItemContent className="ItemContent">
          <h3>My Form Card</h3>
          <p>My Form Short Description here</p>
          <h3 >FR-00032</h3>
        </ItemContent>
        <div className="ItemFooter">
          <Link to={ROUTES.FORMS.SUBMIT_FORM+"/dfdfdf"}>
            <Button className="ThemeBtn">
              Copy Link
            </Button>
          </Link>
          <Link to={ROUTES.FORMS.SUBMIT_FORM+"/dfd"}>
            <Button className="ThemeBtn">
              Attempt
            </Button>
          </Link>
        </div>
      </SingleItem>
    </>
  );
}

export default ListItem;
