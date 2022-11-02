import { Image, Tag } from "antd";
import React, { useContext } from "react";
import { bonusDictionaryList } from "../localization/index";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import UserInfo from "../../../sharedComponents/UserShortInfo/UserInfo";
import SublineDesigWithTime from "../../../sharedComponents/UserShortInfo/SubLine/DesigWithTime";
import { getNameForImage } from "../../../../utils/base";
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
  const { bonusDictionary } = bonusDictionaryList[userLanguage];

  const {
    creator,
    createDate,
    member,
    approvers,
    amount,
    status,
    referenceNo,
  } = props.item;

  const localTime = moment
    .utc(createDate)
    .local()
    .format();

  return (
    <SingleItem onClick={props.onClick}>
      <div className="new" id={props.id}></div>
      <ItemHeader>
        <div className="left">
          <UserInfo
            avatarSrc={creator.image}
            name={creator.name}
            Subline={
              <SublineDesigWithTime
                designation={creator?.designation ? creator?.designation : ""}
                time={moment(localTime).fromNow()}
              />
            }
          />
        </div>
        <div className="right">
          <Tag className="IdTag">{referenceNo}</Tag>
          <StatusTag status={status && status}></StatusTag>
        </div>
      </ItemHeader>
      <div className="cardSections" style={{ marginTop: "20px" }}>
        <div className="cardSectionItem">
          <div className="cardSection__title">{"Amount"}</div>
          <div className="cardSection__body">{amount}</div>
        </div>
        <div className="cardSectionItem">
          <div className="cardSection__title">{"Bonus To"}</div>
          <div className="cardSection__body">{member && member.name}</div>
        </div>
        <div className="cardSectionItem">
          <div className="cardSection__title">{bonusDictionary.approvers}</div>
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
  );
}

export default ListItem;
