import { Image, Tag } from "antd";
import React, { useContext, useState } from "react";
import { rewardDictionaryList } from "../localization/index";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import UserInfo from "../../../sharedComponents/UserShortInfo/UserInfo";
import SublineDesigWithTime from "../../../sharedComponents/UserShortInfo/SubLine/DesigWithTime";
import StatusTag from "../../../sharedComponents/Tag/StatusTag";
import RewardDefaultIcon from "../../../../content/svg/menu/rewardIcon.svg";
import moment from "moment";
import {
  ItemContent,
  ItemHeader,
  SingleItem,
} from "../../../sharedComponents/Card/CardStyle";
import Avatar from "../../../sharedComponents/Avatar/avatar";
import { useDispatch } from "react-redux";
import { data } from "jquery";
import Attachments from "../../travel/view/UI/Attachments";
import "./style/reward.css";

function ListItem(props) {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { rewardDictionary } = rewardDictionaryList[userLanguage];

  const {
    creator,
    name,
    description,
    image = "http://localhost:3000/static/media/rewardIcon.1872d27791f08290da2b85977f16cf07.svg",
    // image = images,
    reason,
    category,
    members = [],
    approvers = [],
    status,
    referenceNo,
    createDate,
    path,
  } = props.item;

  const localTime = moment
    .utc(createDate)
    .local()
    .format();
  return (
    <>
      <SingleItem onClick={props.onClick}>
        <div className="" id={props.id}></div>
        <ItemHeader>
          <div className="left">
            <UserInfo
              avatarSrc={creator?.image}
              name={creator?.name}
              status={creator?.userActiveStatus}
              profileId={creator?.id}
              Subline={
                <SublineDesigWithTime
                  designation={creator?.designation ? creator?.designation : ""}
                  time={moment(localTime).fromNow()}
                />
              }
            />
          </div>
          <div className="right">
            <Tag className="IdTag">{referenceNo && referenceNo}</Tag>
            <StatusTag status={status && status}></StatusTag>
          </div>
        </ItemHeader>
        <ItemContent className="flex">
          <div className="description">
            <p>{description}</p>
          </div>
          <div
            className=" ml-auto attachmentBox"
            style={{ width: "65px", height: "60px" }}
          >
            <Image
              preview={false}
              // width={60}
              // height={60}
              src={image === "" ? "" : image}
            />
            {/* <Attachments
              data={[image]}
              key={{ data: image }}
              toShow={1}
              onClick={() => {}}
            /> */}
          </div>
        </ItemContent>
        <div className="cardSections">
          <div className="cardSectionItem">
            <div className="cardSection__title">
              {rewardDictionary.category}
            </div>
            <div className="cardSection__body">{category}</div>
          </div>
          <div className="cardSectionItem">
            <div className="cardSection__title">{rewardDictionary.name}</div>
            <div className="cardSection__body layout">{name}</div>
          </div>
          <div className="cardSectionItem">
            <div className="cardSection__title">{rewardDictionary.reason}</div>
            <div className="cardSection__body layout">{reason}</div>
          </div>
          <div className="cardSectionItem">
            <div className="cardSection__title">
              {rewardDictionary.rewardTo}
            </div>

            <div className="cardSection__body">
              {members && (
                <Avatar
                  isAvatarGroup={true}
                  isTag={false}
                  heading={"members"}
                  membersData={members ? members : []}
                  text={"Members"}
                  image={"https://joeschmoe.io/api/v1/random"}
                />
              )}
            </div>
          </div>
          <div className="cardSectionItem">
            <div className="cardSection__title">
              {rewardDictionary.approvers}
            </div>
            <div className="cardSection__body">
              {approvers && (
                <Avatar
                  isAvatarGroup={true}
                  isTag={false}
                  heading={"approvers"}
                  membersData={approvers ? approvers : []}
                  text={"Approvers"}
                  image={"https://joeschmoe.io/api/v1/random"}
                />
              )}
            </div>
          </div>
        </div>
      </SingleItem>
    </>
  );
}

export default ListItem;
