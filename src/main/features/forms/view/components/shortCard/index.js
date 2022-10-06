import React from "react";
import UserInfo from "../../../../../sharedComponents/UserShortInfo/UserInfo";
import SublineDesigWithTime from "../../../../../sharedComponents/UserShortInfo/SubLine/DesigWithTime";
import ProImage from "../../../../../../content/NewContent/careers/proImage.svg";
import moment from "moment";
import {
  ItemContent,
  ItemHeader,
  SingleItem,
} from "../../../../../sharedComponents/Card/CardStyle";
import { Link } from "react-router-dom";
import { Button } from "antd";
import "./style.css";
import { ROUTES } from "../../../../../../utils/routes";
import { useSelector } from "react-redux";

function ListItem(props) {
  const { user } = useSelector((state) => state.userSlice);
  const { item, id } = props;
  return (
    <>
      <SingleItem className="Card3 formShortCard">
        <ItemHeader className="ItemHeader">
          <UserInfo
            avatarSrc={item.creator.image}
            name={item.creator.name}
            Subline={
              <SublineDesigWithTime
                designation={item.creator.designation}
                time={moment(item.createDate).fromNow()}
              />
            }
          />
        </ItemHeader>
        <ItemContent className="ItemContent">
          <h3>{item.subject}</h3>
          {/* <p>{item.description}</p> */}
          <h3>{item.referenceNo}</h3>
        </ItemContent>
        <div className="ItemFooter">
          <Link to={ROUTES.FORMS.SUBMIT_FORM + "/dfdfdf"}>
            <Button className="ThemeBtn">Copy Link</Button>
          </Link>
          {item.creator.id === user.id && (
            <Link to={ROUTES.FORMS.EDIT_FORM + `/?id=${id}`}>
              <Button className="ThemeBtn">Edit</Button>
            </Link>
          )}

          <Link to={ROUTES.FORMS.SUBMIT_FORM + `/?id=${id}`}>
            <Button className="ThemeBtn">Attempt</Button>
          </Link>
        </div>
      </SingleItem>
    </>
  );
}

export default ListItem;
