import { Image, Tag } from "antd";
import React, { useContext } from "react";
import { customApprovalDictionaryList } from "../localization/index";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import UserInfo from "../../../sharedComponents/UserShortInfo/UserInfo";
import SublineDesigWithTime from "../../../sharedComponents/UserShortInfo/SubLine/DesigWithTime";
import StatusTag from "../../../sharedComponents/Tag/StatusTag";
import customApprovalIcon from "../../../../content/svg/menu/newNavBarIcon/Custom Approval.svg";
import { PieChartOutlined } from "@ant-design/icons";
import moment from "moment";
import Avatar from "../../../sharedComponents/Avatar/avatar";
import { ItemContent, ItemHeader, SingleItem } from "../../../sharedComponents/Card/CardStyle";

function ListItem(props) {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { Direction, customApprovalDictionary } = customApprovalDictionaryList[userLanguage];

  const { creator, description, image = customApprovalIcon, approvers = [], status, referenceNo, createDate } = props.item;

  return (
    <>
      <SingleItem>
        <div
          className="new"
          id={props.id}
          onClick={() => {
            props.getCustomApprovalId(props.id);
          }}></div>
        <ItemHeader>
          <div className="left">
            <UserInfo
              avatarSrc={creator.image}
              name={creator.name}
              Subline={<SublineDesigWithTime designation={creator.designation ? creator.designation : ""} time={moment(createDate).fromNow()} />}
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
            <Image preview={false} width={50} src={image === "" ? customApprovalIcon : image} />
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
        {/* <div className="ListItemInner">
          <div className="ItemDetails">
            <div className="innerDiv">
              <span className="text-black font-extrabold smallHeading">{customApprovalDictionary.approvers}</span>
              <Avatar
                isAvatarGroup={true}
                isTag={false}
                heading={"Approvers"}
                membersData={approvers ? approvers : []}
                text={"Danish"}
                image={"https://joeschmoe.io/api/v1/random"}
              />
            </div>
          </div>
        </div> */}
      </SingleItem>
    </>
  );
}

export default ListItem;
