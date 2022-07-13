import { Image, Tag } from "antd";
import React, { useContext } from "react";
import { customApprovalDictionaryList } from "../localization/index";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import UserInfo from "../../../sharedComponents/UserShortInfo/UserInfo";
import SublineDesigWithTime from "../../../sharedComponents/UserShortInfo/SubLine/DesigWithTime";
import { getNameForImage } from "../../../../utils/base";
import StatusTag from "../../../sharedComponents/Tag/StatusTag";
import RewardDefaultIcon from "../../../../content/svg/menu/rewardIcon.svg";
import { PieChartOutlined, GlobalOutlined } from "@ant-design/icons";
import moment from "moment";
import { ItemContent, ItemHeader, SingleItem } from "../../../sharedComponents/Card/CardStyle";
import Avatar from "../../../sharedComponents/Avatar/avatar";

function ListItem(props) {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { Direction, customApprovalDictionary } = customApprovalDictionaryList[userLanguage];

  const {
    creator,
    description,
    image = "http://localhost:3000/static/media/rewardIcon.1872d27791f08290da2b85977f16cf07.svg",
    category,
    subject,
    approvers = [],
    status,
    referenceNo,
    createDate,
  } = props.item;

  // console.log(props.item, "imagessss")
  return (
    <>
      <SingleItem>
        <div
          className="new"
          id={props.id}
          onClick={() => {
            props.getRewardId(props.id);
          }}></div>
        <ItemHeader>
          <div className="left">
            <UserInfo
              avatarSrc={creator.image}
              name={creator.name}
              Subline={
                <SublineDesigWithTime designation={creator.designation ? creator.designation : ""} time={moment(createDate).format("DD/MM/YYYY")} />
              }
            />
          </div>
          <div className="right">
            <Tag className="IdTag">{referenceNo}</Tag>
            <StatusTag status={status}></StatusTag>
          </div>
        </ItemHeader>
        <ItemContent className="flex">
          <div className="description w-full">
            <p>{description}</p>
          </div>
          <div className="attachmentBox">
            <Image preview={false} width={75} src={image === "" ? RewardDefaultIcon : image} />
          </div>
        </ItemContent>
        <div className="flex justify-between gap-4">
          <div className="innerCard w-full">
            <div className="innerCard__header">
              <div className="left">
                <span className="primaryTag">
                  <PieChartOutlined />
                  {"Subject"}
                </span>
                <span className="secondaryTag">{"In Process"}</span>
              </div>
              <div className="right">
                <p>Rs. 10000</p>
              </div>
            </div>
            <div className="innerCard__footer">
              <div className="left">
                <span>{"Date"}</span>
                <span> Thu,Oct 14 ,2021</span>
              </div>
              <div className="right">
                <span>{"Header"}:</span>
                <span> CEO Office</span>
              </div>
            </div>
          </div>
        </div>
      </SingleItem>
    </>
  );
}

export default ListItem;
