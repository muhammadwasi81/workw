import { Image, Tag } from "antd";
import React, { useContext, useEffect } from "react";
import { leaveDictionaryList } from "../localization/index";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import UserInfo from "../../../sharedComponents/UserShortInfo/UserInfo";
import SublineDesigWithTime from "../../../sharedComponents/UserShortInfo/SubLine/DesigWithTime";
import { getNameForImage } from "../../../../utils/base";
import StatusTag from "../../../sharedComponents/Tag/StatusTag";
import DefaultIcon from "../../../../content/NewContent/leaves/Leaves.svg";
import moment from "moment";
import {
  ItemContent,
  ItemHeader,
  SingleItem,
} from "../../../sharedComponents/Card/CardStyle";
import Avatar from "../../../sharedComponents/Avatar/avatar";

function ListItem(props) {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { Direction, leaveDictionary } = leaveDictionaryList[userLanguage];

  const {
    creator,
    startDate,
    endDate,
    description,
    image = DefaultIcon,
    members = [],
    approvers,
    status,
    referenceNo,
    createDate,
    leaveTypeName,
    attachments,
  } = props.item;

  var a = moment(startDate);
  var b = moment(endDate);
  const days = b.diff(a, "days");
  console.log(days, "daysssss");

  return (
    //onClick={props.onClick}
    <SingleItem onClick={props.onClick}>
      <div
        className="new"
        id={props.id}
        // onClick={() => {
        //   props.getLeavesApprovalId(props.id);
        // }}
      ></div>
      <ItemHeader>
        <div className="left">
          <UserInfo
            avatarSrc={creator.image}
            name={creator.name}
            Subline={
              <SublineDesigWithTime
                designation={creator.designation}
                time={moment(createDate).fromNow()}
              />
            }
          />
        </div>
        <div className="right">
          <Tag className="IdTag">{referenceNo}</Tag>
          <StatusTag status={status}></StatusTag>
        </div>
      </ItemHeader>
      <ItemContent className="flex description">
        <div className="w-full">
          <p>{description}</p>
        </div>
        <div className="attachmentBox" style={{ width: "75px" }}>
          {attachments.map((i) => {
            return <Image preview={false} src={i.path} />;
          })}
        </div>
      </ItemContent>
      <div className="cardSections">
        <div className="cardSectionItem">
          <div className="cardSection__title">{leaveDictionary.startDate}</div>
          <div className="cardSection__body">
            {moment(startDate).format("ddd,MMM DD,YYYY")}
          </div>
        </div>
        <div className="cardSectionItem">
          <div className="cardSection__title">{leaveDictionary.endDate}</div>
          <div className="cardSection__body">
            {moment(endDate).format("ddd,MMM DD,YYYY")}
          </div>
        </div>
        <div className="cardSectionItem">
          <div className="cardSection__title">{leaveDictionary.days}</div>
          <div className="cardSection__body">{days}</div>
        </div>
        <div className="cardSectionItem">
          <div className="cardSection__title">Leave Type</div>
          <div className="cardSection__body">{leaveTypeName}</div>
        </div>
        <div className="cardSectionItem">
          <div className="cardSection__title">{leaveDictionary.approvers}</div>
          <div className="cardSection__body">
            {approvers && (
              <Avatar
                isAvatarGroup={true}
                isTag={false}
                heading={"Approvers"}
                membersData={approvers}
                text={"Approvers"}
                image={"https://joeschmoe.io/api/v1/random"}
              />
            )}
          </div>
        </div>
      </div>
    </SingleItem>
  );
}

export default ListItem;
