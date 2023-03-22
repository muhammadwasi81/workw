import moment from "moment";
import Avatar from "../../../sharedComponents/Avatar/avatar";
import TagAvatar from "../../../sharedComponents/Avatar/TagAvatar";
import {
  ItemHeader,
  SingleItem,
} from "../../../sharedComponents/Card/CardStyle";
import React, { useContext } from "react";
import StatusTag from "../../../sharedComponents/Tag/StatusTag";
import SublineDesigWithTime from "../../../sharedComponents/UserShortInfo/SubLine/DesigWithTime";
import UserInfo from "../../../sharedComponents/UserShortInfo/UserInfo";
import { assetsDictionaryList } from "../localization/index";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";

const AssetsListItem = (props) => {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { assetsDictionary, Direction } = assetsDictionaryList[userLanguage];
  const {
    creator = {
      businessId: "cfe50d8d-7c47-4abb-9154-661daf129cec",
      designation: "",
      email: "owais@miletap.com",
      id: "77546782-aa7a-4984-9388-5fd044c0fb11",
      image:
        "https://58.65.211.234:4436/Resources\\cfe50d8d-7c47-4abb-9154-661daf129cec\\Images\\45f43115-c12f-4fc4-82ec-e570fbc13a70.jpeg",
      name: "Owais Shaikh",
      type: 1,
      userTypeId: 2,
    },
    createDate = moment(),
    category,
    name,
    id,
    approvers = [{}],
    handover = [{}],
    value,
  } = props.item;

  return (
    <>
      <SingleItem onClick={() => props.onClick(id)}>
        <ItemHeader>
          <div className="left">
            <UserInfo
              avatarSrc={
                creator?.image
                  ? creator?.image
                  : "https://58.65.211.234:4436/Resources/cfe50d8d-7c47-4abb-9154-661daf129cec/Images/45f43115-c12f-4fc4-82ec-e570fbc13a70.jpeg"
              }
              name={creator?.name}
              Subline={
                <SublineDesigWithTime
                  designation={creator?.designation ? creator?.designation : ""}
                  time={moment(createDate).fromNow()}
                />
              }
            />
          </div>
          <div className="right">
            <StatusTag status={creator.status}></StatusTag>
          </div>
        </ItemHeader>
        <div className="cardSections" style={{ marginTop: "30px" }}>
          <div className="cardSectionItem">
            <div className="cardSection__title">
              {assetsDictionary.categoryName}
            </div>
            <div className="cardSection__body">
              {category ? category : "N/A"}
            </div>
          </div>
          <div className="cardSectionItem">
            <div className="cardSection__title">
              {" "}
              {assetsDictionary.quantity}
            </div>
            <div className="cardSection__body">{value}</div>
          </div>
          <div className="cardSectionItem">
            <div className="cardSection__title">
              {" "}
              {assetsDictionary.handover}
            </div>
            <div className="cardSection__body">
              <TagAvatar
                text={handover?.name ? handover.name : "Not Assigned"}
                img={
                  handover?.image
                    ? handover?.image
                    : "https://konnect.im/upload/2022/10/88c35581-97aa-4e88-be91-584a667fd5eb.jpg"
                }
              />
            </div>
          </div>
          <div className="cardSectionItem">
            <div className="cardSection__title">
              {" "}
              {assetsDictionary.approvers}
            </div>
            <div className="cardSection__body">
              <Avatar
                isAvatarGroup={true}
                heading={"approvers"}
                membersData={approvers ? approvers : []}
              />
            </div>
          </div>
        </div>
      </SingleItem>
    </>
  );
};

export default AssetsListItem;
