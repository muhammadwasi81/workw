import { Image, Tag } from "antd";
import React, { useContext } from "react";
import { requisitionDictionaryList } from "../localization/index";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import UserInfo from "../../../sharedComponents/UserShortInfo/UserInfo";
import SublineDesigWithTime from "../../../sharedComponents/UserShortInfo/SubLine/DesigWithTime";
import StatusTag from "../../../sharedComponents/Tag/StatusTag";
import RequistionDefaultIcon from "../../../../content/NewContent/requisition/requistion.svg";
import moment from "moment";
import {
  ItemContent,
  ItemHeader,
  SingleItem,
} from "../../../sharedComponents/Card/CardStyle";
import Avatar from "../../../sharedComponents/Avatar/avatar";
import { useDispatch } from "react-redux";
import { data } from "jquery";

function ListItemMyRequisition(props) {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { Direction, requisitionDictionary } = requisitionDictionaryList[
    userLanguage
  ];
  const disptach = useDispatch();

  const {
    creator,
    name,
    description,
    image = RequistionDefaultIcon,
    reason,
    budget,
    deadline,
    finalApprovers = [],
    approvers = [],
    status,
    referenceNo,
    createDate,
  } = props.item;
  console.log(budget, "props.itmmm");
  const localTime = moment
    .utc(createDate)
    .local()
    .format();

  return (
    <>
      <SingleItem onClick={props.onClick}>
        <div className="new" id={props.id}></div>
        <ItemHeader>
          <div className="left">
            <UserInfo
              avatarSrc={creator?.image}
              name={creator?.name}
              Subline={
                <SublineDesigWithTime
                  designation={creator?.designation ? creator?.designation : ""}
                  time={moment(localTime).fromNow()}
                />
              }
            />
          </div>
          <div className="right">
            <Tag className="IdTag">{referenceNo && referenceNo}</Tag>
            <StatusTag status={status && status}></StatusTag>
          </div>
        </ItemHeader>
        <ItemContent className="flex">
          <div className="description w-full">
            <p>{description}</p>
          </div>
          <div className="attachmentBox">
            <Image
              preview={false}
              width={60}
              height={60}
              src={image === "" ? RequistionDefaultIcon : image}
            />
          </div>
        </ItemContent>
        <div className="cardSections">
          <div className="cardSectionItem">
            <div className="cardSection__title">Budget</div>
            <div className="cardSection__body">{budget}</div>
          </div>
          <div className="cardSectionItem">
            <div className="cardSection__title">Name</div>
            <div className="cardSection__body">{name}</div>
          </div>
          <div className="cardSectionItem">
            <div className="cardSection__title">Reason</div>
            <div className="cardSection__body">{reason}</div>
          </div>
          <div className="cardSectionItem">
            <div className="cardSection__title">
              {requisitionDictionary.approvers}
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
          <div className="cardSectionItem">
            <div className="cardSection__title">
              {requisitionDictionary.FinalApprovers}
            </div>
            <div className="cardSection__body">
              {finalApprovers && (
                <Avatar
                  isAvatarGroup={true}
                  isTag={false}
                  heading={"approvers"}
                  membersData={finalApprovers ? finalApprovers : []}
                  text={"Final Approvers"}
                  image={"https://joeschmoe.io/api/v1/random"}
                />
              )}
            </div>
          </div>
        </div>
      </SingleItem>
    </>
  );
}

export default ListItemMyRequisition;
