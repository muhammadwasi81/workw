import React, { useState } from "react";
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
import { Button, message } from "antd";
import "./style.css";
import { ROUTES } from "../../../../../../utils/routes";
import { useSelector } from "react-redux";

function ListItem(props) {
  const { user } = useSelector((state) => state.userSlice);
  const { item, id, onListItem = () => {} } = props;
  const [copy, setCopy] = useState(false);

  const copyfunc = () => {
    setCopy(true);
  };

  return (
    <>
      {copy && message.success("Copied")}
      <SingleItem
        className="Card3 formShortCard"
        onClick={() => {
          onListItem(props.item.id);
        }}
      >
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
          <Button
            className="ThemeBtn"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setCopy(false);
              {
                navigator.clipboard.writeText(
                  `${window.location.origin}${ROUTES.FORMS.SUBMIT_FORM}` +
                    `/?id=${id}`
                );
              }
              console.log("clicked");
              setCopy(true);
            }}
          >
            Copy Link
          </Button>

          {/* <Link to={ROUTES.FORMS.SUBMIT_FORM + `/?id=${id}`}>
            <Button className="ThemeBtn">Copy Link</Button>
          </Link> */}
          {/* {item.creator.id === user.id && (
            // <Link to={ROUTES.FORMS.EDIT_FORM + `/?id=${id}`}>
            <Link to={ROUTES.FORMS.ROOT + ROUTES.FORMS.EDIT_FORM + `/${id}`}>
              <Button className="ThemeBtn">Edit</Button>
            </Link>
          )} */}

          <Link to={ROUTES.FORMS.SUBMIT_FORM + `/?id=${id}`}>
            <Button className="ThemeBtn">Attempt</Button>
          </Link>
        </div>
      </SingleItem>
    </>
  );
}

export default ListItem;
