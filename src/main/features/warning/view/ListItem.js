import { Image, Tag } from "antd";
import React, { useContext } from "react";
import { warningDictionaryList } from "../localization/index";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import UserInfo from "../../../sharedComponents/UserShortInfo/UserInfo";
import SublineDesigWithTime from "../../../sharedComponents/UserShortInfo/SubLine/DesigWithTime";
import { getNameForImage } from "../../../../utils/base";
import StatusTag from "../../../sharedComponents/Tag/StatusTag";
import { ItemContent, ItemHeader, SingleItem } from "../../../sharedComponents/Card/CardStyle";
import Avatar from "../../../sharedComponents/Avatar/avatar";
import moment from "moment";
import DefaultAttachment from "../../../../content/NewContent/warning/warningsDefaultAttachment.svg";

function ListItem(props) {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { warningDictionary } = warningDictionaryList[userLanguage];

  const { creator, description, category, image = DefaultAttachment, createDate, members = [], approvers, status, referenceNo } = props.item;

  // console.log(props.item, "imagessss")
  return (
    <SingleItem>
      <div
        className="new"
        id={props.id}
        onClick={() => {
          props.getWarningId(props.id);
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
      <ItemContent className="flex">
        <div className="description w-full">
          <p>{description}</p>
        </div>
      </ItemContent>
      <div className="cardSections">
        <div className="cardSectionItem">
          <div className="cardSection__title">{warningDictionary.category}</div>
          <div className="cardSection__body"><Tag className="IdTag">{category ? category : "Default Category"}</Tag></div>
        </div>
        <div className="cardSectionItem">
          <div className="cardSection__title">{warningDictionary.warningTo}</div>
          <div className="cardSection__body">
            {members &&
              <Avatar
                isAvatarGroup={true}
                isTag={false}
                heading={"Members"}
                membersData={members}
                text={"Members"}
                image={"https://joeschmoe.io/api/v1/random"}
              />
            }
          </div>
        </div>
        <div className="cardSectionItem">
          <div className="cardSection__title">{warningDictionary.approvers}</div>
          <div className="cardSection__body">
            {approvers &&
              <Avatar
                isAvatarGroup={true}
                isTag={false}
                heading={"Approvers"}
                membersData={approvers}
                text={"Approvers"}
                image={"https://joeschmoe.io/api/v1/random"}
              />
            }
          </div>
        </div>

      </div>
    </SingleItem>
  );
}

export default ListItem;
