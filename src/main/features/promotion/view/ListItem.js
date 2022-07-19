import { Image, Tag } from "antd";
import React, { useContext } from "react";
import { promotionDictionaryList } from "../localization/index";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import UserInfo from "../../../sharedComponents/UserShortInfo/UserInfo";
import SublineDesigWithTime from "../../../sharedComponents/UserShortInfo/SubLine/DesigWithTime";
import { getNameForImage } from "../../../../utils/base";
import StatusTag from "../../../sharedComponents/Tag/StatusTag";
import { ItemContent, ItemHeader, SingleItem } from "../../../sharedComponents/Card/CardStyle";
import Avatar from "../../../sharedComponents/Avatar/avatar";
import moment from "moment";

function ListItem(props) {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { promotionDictionary } = promotionDictionaryList[userLanguage];

  const { creator, description, category, createDate, members = [], approvers, status, referenceNo, grade } = props.item;

  return (
    <SingleItem>
      <div
        className="new"
        id={props.id}
        onClick={() => {
          props.getPromotionId(props.id);
        }}
      />
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
      <ItemContent>
        <p>{description}</p>
      </ItemContent>
      <div className="ListItemInner">
        <div className="ItemDetails">
          <div className="innerDiv">
            <span className="text-black font-extrabold smallHeading">{promotionDictionary.grade}</span>
            <Tag className="IdTag">{grade ? grade : "Default Grade"}</Tag>
          </div>
          <div className="innerDiv">
            <span className="text-black font-extrabold smallHeading">{promotionDictionary.promotionTo}</span>
            {/* <Avatar
              isAvatarGroup={true}
              isTag={false}
              heading={"Members"}
              membersData={members}
              text={"Danish"}
              image={"https://joeschmoe.io/api/v1/random"}
            /> */}
          </div>
          <div className="innerDiv">
            <span className="text-black font-extrabold smallHeading">{promotionDictionary.approvers}</span>
            <Avatar
              isAvatarGroup={true}
              isTag={false}
              heading={"Approvers"}
              membersData={approvers}
              text={"Danish"}
              image={"https://joeschmoe.io/api/v1/random"}
            />
          </div>
        </div>
      </div>
    </SingleItem>
  );
}

export default ListItem;
