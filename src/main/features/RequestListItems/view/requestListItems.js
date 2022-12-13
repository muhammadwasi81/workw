import {
  ItemHeader,
  SingleItem,
} from "../../../sharedComponents/Card/CardStyle";
import React, { useContext } from "react";
import UserInfo from "../../../sharedComponents/UserShortInfo/UserInfo";
import moment from "moment";
import SublineDesigWithTime from "../../../sharedComponents/UserShortInfo/SubLine/DesigWithTime";
import { Tag } from "antd";
import StatusTag from "../../../sharedComponents/Tag/StatusTag";
import Avatar from "../../../sharedComponents/Avatar/avatar";
import { requestListDictionaryList } from "../localization/index";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";

const RequestListItems = (props) => {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { Direction, requestListDictionary } = requestListDictionaryList[
    userLanguage
  ];
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
    quantity,
    status,
    referenceNo,
    id,
    approvers = [{}],
    assetController = [{}],
  } = props.item;

  return (
    <SingleItem onClick={() => props.onClick(id)}>
      <ItemHeader>
        <div className="left">
          <UserInfo
            avatarSrc={
              creator?.image
                ? creator?.image
                : "https://58.65.211.234:4436/Resources\\cfe50d8d-7c47-4abb-9154-661daf129cec\\Images\\45f43115-c12f-4fc4-82ec-e570fbc13a70.jpeg"
            }
            name={creator?.name ? creator?.name : "Owais Shaikh"}
            Subline={
              <SublineDesigWithTime
                designation={
                  creator?.designation ? creator?.designation : "CEO"
                }
                time={moment(createDate).fromNow()}
              />
            }
          />
        </div>
        <div className="right">
          <Tag className="IdTag">{referenceNo}</Tag>
          <StatusTag status={status}></StatusTag>
        </div>
      </ItemHeader>
      <div className="cardSections" style={{ marginTop: "30px" }}>
        <div className="cardSectionItem">
          <div className="cardSection__title">
            {requestListDictionary.categoryName}
          </div>
          <div className="cardSection__body">{category}</div>
        </div>
        <div className="cardSectionItem">
          <div className="cardSection__title">
            {" "}
            {requestListDictionary.quantity}
          </div>
          <div className="cardSection__body">{quantity}</div>
        </div>
        <div className="cardSectionItem">
          <div className="cardSection__title">
            {" "}
            {requestListDictionary.assetController}
          </div>
          <div className="cardSection__body">
            <Avatar
              isAvatarGroup={true}
              heading={"approvers"}
              membersData={assetController ? assetController : []}
            />
          </div>
        </div>
        <div className="cardSectionItem">
          <div className="cardSection__title">
            {" "}
            {requestListDictionary.approvers}
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
  );
};

export default RequestListItems;
