import { Image, Tag } from "antd";
import React, { useContext } from "react";
import { bonusDictionaryList } from "../localization/index";
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
  const { bonusDictionary } = bonusDictionaryList[userLanguage];

  const { creator, category, createDate, members = [], approvers, amount, status, referenceNo, member } = props.item;

  return (
    <SingleItem>
      <div
        className="new"
        id={props.id}
        onClick={() => {
          props.getBonusId(props.id);
        }}
      />
      <ItemHeader>
        <div className="left">
          {/* <UserInfo
            avatarSrc={creator.image}
            name={creator.name}
            Subline={<SublineDesigWithTime designation={creator.designation ? creator.designation : ""} time={moment(createDate).fromNow()} />}
          /> */}
        </div>
        <div className="right">
          <Tag className="IdTag">{referenceNo}</Tag>
          <StatusTag status={status}></StatusTag>
        </div>
      </ItemHeader>
      <div className="flex justify-between mt-4">
          <div className="innerCard w-full">
            <div className="innerCard__header">
              <div className="left">
                Category :
                <span className="" style={{ color: "#757D86" }}>
                  &nbsp;{category}
                </span>
              </div>
              <div className="right">
                <div className="left">
                  Amount :
                  <span className="" style={{ color: "#757D86" }}>
                    &nbsp;{amount}
                  </span>
                </div>
              </div>
            </div>
            <div className="innerCard__footer">
              <div className="left">
                Reason :
                <span className="" style={{ color: "#757D86" }}>
                  &nbsp;{}
                </span>
              </div>
            </div>
          </div>
        </div>
      <div className="ListItemInner">
        <div className="ItemDetails">
          <div className="innerDiv">
            <span className="text-black font-extrabold smallHeading">{"Bonus To"}</span>
            {/* <Tag className="IdTag">{ ?  : ""}</Tag> */}
          </div>
          {/* <div className="innerDiv">
            <span className="text-black font-extrabold smallHeading">{"Bonus To"}</span>
            <Avatar
              isAvatarGroup={true}
              isTag={false}
              heading={"Member"}
              membersData={member}
              text={"Danish"}
              image={"https://joeschmoe.io/api/v1/random"}
            />
          </div> */}
          <div className="innerDiv">
            <span className="text-black font-extrabold smallHeading">{bonusDictionary.approvers}</span>
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
