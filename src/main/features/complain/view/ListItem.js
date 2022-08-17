import { Image, Tag } from "antd";
import React, { useContext } from "react";
import { complainDictionaryList } from "../localization/index";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import UserInfo from "../../../sharedComponents/UserShortInfo/UserInfo";
import SublineDesigWithTime from "../../../sharedComponents/UserShortInfo/SubLine/DesigWithTime";
import StatusTag from "../../../sharedComponents/Tag/StatusTag";
import { ItemContent, ItemHeader, SingleItem } from "../../../sharedComponents/Card/CardStyle";
import DefaultAttachment from "../../../../content/NewContent/complain/DefaultAttachment.svg";
import Avatar from "../../../sharedComponents/Avatar/avatar";
import moment from "moment";
import "./complain.css"

function ListItem(props) {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { Direction, complainDictionary } = complainDictionaryList[userLanguage];

  const { creator, description, image = DefaultAttachment, category, createDate, members = [], approvers, status } = props.item;
  return (
    <SingleItem className="ComplainListItem">
      <div
        className="new"
        id={props.id}
        onClick={() => {
          props.getComplainById(props.id);
        }}
      />
      <ItemHeader>
        <div className={"item-header"}>
          <div className="left">
            <UserInfo
              avatarSrc={creator.image}
              name={creator.name}
              Subline={<SublineDesigWithTime designation={creator.designation ? creator.designation : ""} time={moment(createDate).fromNow()} />}
            />
          </div>
          <div className="right">
            <Tag className="IdTag">TRA-000085</Tag>
            <StatusTag status={status}></StatusTag>
          </div>
        </div>
      </ItemHeader>
      <ItemContent className="flex description">
        <div className="description w-full">
          <p>{description}</p>
        </div>
        {/* <div className="attachmentBox">
          <Image preview={false} width={60} src={image === "" ? DefaultAttachment : image} />
        </div> */}
      </ItemContent>
      <div className="flex justify-between">
          <div className="innerCard w-full">
            <div className="innerCard__header">
              <div className="left">
                Category :
                <span className="" style={{ color: "#757D86" }}>
                  &nbsp;{category}
                </span>
              </div>
            </div>
          </div>
        </div>
      <div className="ListItemInner">
        <div className="ItemDetails">
          <div className="innerDiv">
            <span className="text-black font-extrabold smallHeading">{complainDictionary.complainOf}</span>
            <Avatar
              isAvatarGroup={true}
              isTag={false}
              heading={"Members"}
              membersData={members}
              text={"Danish"}
              image={"https://joeschmoe.io/api/v1/random"}
            />
          </div>
          <div className="innerDiv">
            <span className="text-black font-extrabold smallHeading">{complainDictionary.approvers}</span>
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
