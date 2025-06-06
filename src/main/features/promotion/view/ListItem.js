import { Image, Tag } from "antd";
import React, { useContext } from "react";
import { promotionDictionaryList } from "../localization/index";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import UserInfo from "../../../sharedComponents/UserShortInfo/UserInfo";
import SublineDesigWithTime from "../../../sharedComponents/UserShortInfo/SubLine/DesigWithTime";
import StatusTag from "../../../sharedComponents/Tag/StatusTag";
import {
  ItemContent,
  ItemHeader,
  SingleItem,
} from "../../../sharedComponents/Card/CardStyle";
import Avatar from "../../../sharedComponents/Avatar/avatar";
import moment from "moment";

function ListItem(props) {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { promotionDictionary } = promotionDictionaryList[userLanguage];

  const {
    id,
    creator,
    description,
    createDate,
    member = {},
    approvers,
    status,
    referenceNo,
    grade,
  } = props.item;
  const localTime = moment
    .utc(createDate)
    .local()
    .format();
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
            avatarSrc={creator?.image}
            name={creator?.name}
            status={creator.userActiveStatus}
            Subline={
              <SublineDesigWithTime
                designation={creator?.designation ? creator.designation : ""}
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
      <ItemContent className="description w-full">
        <p>{description}</p>
      </ItemContent>
      <div className="cardSections">
        <div className="cardSectionItem">
          <div className="cardSection__title">{promotionDictionary.grade}</div>
          <div className="cardSection__body">
            <Tag className="IdTag">{grade ? grade : "Default Grade"}</Tag>
          </div>
        </div>
        <div className="cardSectionItem">
          <div className="cardSection__title">
            {promotionDictionary.promotionTo}
          </div>
          <div className="cardSection__body">{member && member.name}</div>
        </div>
        <div className="cardSectionItem">
          <div className="cardSection__title">
            {promotionDictionary.approvers}
          </div>
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
