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
    value,
  } = props.item;

  console.log(member, "APPROVERS");

  const localTime = moment
    .utc(createDate)
    .local()
    .format();
  console.log(member, "mmmmmbbbeerrr");
  console.log(approvers, "aapppprrrooo");

  // const arr = [];
  // arr.push(member);
  // console.log(arr);

  return (
    <SingleItem onClick={props.onClick}>
      <div className="new" id={props.id}></div>
      <ItemHeader>
        <div className="left">
          <UserInfo
            avatarSrc={creator.image}
            name={creator.name}
            status={creator.userActiveStatus}
            Subline={
              <SublineDesigWithTime
                designation={creator?.designation ? creator?.designation : ""}
                time={moment
                  .utc(createDate)
                  .local()
                  .fromNow()}
              />
            }
          />
        </div>
        <div className="right">
          <Tag className="IdTag">{referenceNo && referenceNo}</Tag>
          <StatusTag status={status && status}></StatusTag>
        </div>
      </ItemHeader>
      <div className="cardSections" style={{ marginTop: "20px" }}>
        {amount > 0 && (
          <div className="cardSectionItem">
            <div className="cardSection__title">{bonusDictionary.amount}</div>
            <div className="cardSection__body">{amount}</div>
          </div>
        )}
        {value > 0 && (
          <div className="cardSectionItem">
            <div className="cardSection__title">{"Percent"}</div>
            <div className="cardSection__body">{`${value}%`}</div>
          </div>
        )}
        <div className="cardSectionItem">
          <div className="cardSection__title">{bonusDictionary.bonusTo}</div>
          <div className="cardSection__body">{member && member.name}</div>
        </div>
        <div className="cardSectionItem">
          <div className="cardSection__title">{bonusDictionary.members}</div>
          <div className="cardSection__body cursor-pointer">
            <img
              src={member.image}
              alt={member.name}
              style={{
                width: "20px",
                height: "20px",
                borderRadius: "50%",
              }}
            />
          </div>
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
