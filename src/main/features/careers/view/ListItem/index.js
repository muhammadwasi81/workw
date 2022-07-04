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
  //   const { userLanguage } = useContext(LanguageChangeContext);
  //   const { Direction, rewardDictionary } = rewardDictionaryList[userLanguage];

  //   const {
  //     creator,
  //     name,
  //     description,
  //     image = "http://localhost:3000/static/media/rewardIcon.1872d27791f08290da2b85977f16cf07.svg",
  //     reason,
  //     category,
  //     members = [],
  //     approvers = [],
  //     status,
  //     referenceNo,
  //     createDate,
  //   } = props.item;

  // console.log(props.item, "imagessss")
  return (
    <>
      <SingleItem className="Card3">
        {/* <div
          className="new"
          id={props.id}
          onClick={() => {
            props.getRewardId(props.id);
          }}></div> */}
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
