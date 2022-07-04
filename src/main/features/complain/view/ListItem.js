import { Tag } from "antd";
import React, { useContext } from "react";
import { complainDictionaryList } from "../localization/index";
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
  const { Direction, complainDictionary } = complainDictionaryList[userLanguage];

  const { creator, description, category, createDate, members = [], approvers, status } = props.item;

  // console.log(props.item, "imagessss")
  return (
    <SingleItem>
      <div
        className="new"
        id={props.id}
        onClick={() => {
          props.getRewardId(props.id);
        }}
      />
      <ItemHeader>
        <div className={"item-header"}>
          <div className="left">
            <UserInfo
              avatarSrc={creator.image}
              name={creator.name}
              Subline={
                <SublineDesigWithTime
                  designation={creator.designation ? creator.designation : "Default Designation"}
                  time={moment(createDate).format("DD/MM/YYYY")}
                />
              }
            />
          </div>
          <div className="right">
            <Tag className="IdTag">TRA-000085</Tag>
            <StatusTag status={status}></StatusTag>
          </div>
        </div>
      </ItemHeader>
      <ItemContent>
        <p>{description}</p>
      </ItemContent>
      <div className="ListItemInner">
        <div className="ItemDetails">
          <div className="innerDiv">
            <span className="text-black font-extrabold smallHeading">{complainDictionary.category}</span>
            <Tag className="IdTag">{category}</Tag>
          </div>
          <div className="innerDiv">
            <span className="text-black font-extrabold smallHeading">{complainDictionary.complainOf}</span>
            {/* {props.members} */}
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
