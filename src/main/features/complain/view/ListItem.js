import { Tag } from "antd";
import React, { useContext } from "react";
import { complainDictionaryList } from "../localization/index";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import UserInfo from "../../../sharedComponents/UserShortInfo/UserInfo";
import SublineDesigWithTime from "../../../sharedComponents/UserShortInfo/SubLine/DesigWithTime";
import StatusTag from "../../../sharedComponents/Tag/StatusTag";
import {
  ItemContent,
  ItemHeader,
  SingleItem,
} from "../../../sharedComponents/Card/CardStyle";
import DefaultAttachment from "../../../../content/NewContent/complain/DefaultAttachment.svg";
import Avatar from "../../../sharedComponents/Avatar/avatar";
import moment from "moment";
import "./complain.css";

function ListItem(props) {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { Direction, complainDictionary } = complainDictionaryList[
    userLanguage
  ];

  const {
    creator,
    description,
    // image = DefaultAttachment,
    category,
    createDate,
    members = [],
    approvers,
    status,
    referenceNo,
  } = props.item;
  return (
    <SingleItem className="ComplainListItem">
      <div id={props.id} onClick={props.onClick}>
        <ItemHeader>
          <div className={"item-header"}>
            <div className="left">
              <UserInfo
                avatarSrc={creator.image}
                name={creator.name}
                Subline={
                  <SublineDesigWithTime
                    designation={creator.designation ? creator.designation : ""}
                    time={moment(createDate).fromNow()}
                  />
                }
              />
            </div>
            <div className="right">
              <Tag className="IdTag">{referenceNo}</Tag>
              <StatusTag status={status}></StatusTag>
            </div>
          </div>
        </ItemHeader>
        <ItemContent className="flex description">
          <div className="description w-full">
            <p>{description}</p>
          </div>
        </ItemContent>
        <div className="cardSections">
          <div className="cardSectionItem">
            <div className="cardSection__title">
              {" "}
              {complainDictionary.category}
            </div>
            <div className="cardSection__body">{category}</div>
          </div>
          <div className="cardSectionItem">
            <div className="cardSection__title">
              {complainDictionary.complainOf}
            </div>
            <div className="cardSection__body">
              {members && (
                <Avatar
                  isAvatarGroup={true}
                  isTag={false}
                  heading={"Members"}
                  membersData={members ? members : []}
                  text={"Members"}
                  image={"https://joeschmoe.io/api/v1/random"}
                />
              )}
            </div>
          </div>
          <div className="cardSectionItem">
            <div className="cardSection__title">
              {complainDictionary.approvers}
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
      </div>
    </SingleItem>
  );
}

export default ListItem;
