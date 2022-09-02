import { Image, Tag } from "antd";
import React, { useContext } from "react";
import { rewardDictionaryList } from "../localization/index";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import UserInfo from "../../../sharedComponents/UserShortInfo/UserInfo";
import SublineDesigWithTime from "../../../sharedComponents/UserShortInfo/SubLine/DesigWithTime";
import StatusTag from "../../../sharedComponents/Tag/StatusTag";
import RewardDefaultIcon from "../../../../content/svg/menu/rewardIcon.svg";
import moment from "moment";
import { ItemContent, ItemHeader, SingleItem } from "../../../sharedComponents/Card/CardStyle";
import Avatar from "../../../sharedComponents/Avatar/avatar";
import { useDispatch } from "react-redux";

function ListItem(props) {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { Direction, rewardDictionary } = rewardDictionaryList[userLanguage];
  const disptach = useDispatch();

  const {
    creator,
    name,
    description,
    image = "http://localhost:3000/static/media/rewardIcon.1872d27791f08290da2b85977f16cf07.svg",
    reason,
    category,
    members = [],
    approvers = [],
    status,
    referenceNo,
    createDate,
  } = props.item;

  return (
    <>
      <SingleItem onClick={props.onClick}>
        <div className="new" id={props.id}></div>
        <ItemHeader>
          <div className="left">
            <UserInfo
              avatarSrc={creator.image}
              name={creator.name}
              Subline={<SublineDesigWithTime designation={creator.designation ? creator.designation : ""} time={moment(createDate).fromNow()} />}
            />
          </div>
          <div className="right">
            <Tag className="IdTag">
              {referenceNo}</Tag>
            <StatusTag status={status}></StatusTag>
          </div>
        </ItemHeader>
        <ItemContent className="flex">
          <div className="description w-full">
            <p>{description}</p>
          </div>
          <div className="attachmentBox">
            <Image preview={false} width={60} src={image === "" ? RewardDefaultIcon : image} />
          </div>
        </ItemContent>
        <div className="cardSections">
          <div className="cardSectionItem">
            <div className="cardSection__title">{"Category"}</div>
            <div className="cardSection__body">{category}</div>
          </div>
          <div className="cardSectionItem">
            <div className="cardSection__title">{"Name"}</div>
            <div className="cardSection__body">
              {name}
            </div>
          </div>
          <div className="cardSectionItem">
            <div className="cardSection__title">{"Reason"}</div>
            <div className="cardSection__body">
              {reason}
            </div>
          </div>
          <div className="cardSectionItem">
            <div className="cardSection__title">{rewardDictionary.rewardTo}</div>
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
            <div className="cardSection__title">{rewardDictionary.approvers}</div>
            <div className="cardSection__body">
              {approvers &&
                <Avatar
                  isAvatarGroup={true}
                  isTag={false}
                  heading={"approvers"}
                  membersData={approvers ? approvers : []}
                  text={"Approvers"}
                  image={"https://joeschmoe.io/api/v1/random"}
                />
              }
            </div>
          </div>
        </div>
      </SingleItem>
    </>
  );
}

export default ListItem;
