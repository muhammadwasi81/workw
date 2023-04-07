import { Image, Tag } from "antd";
import React, { useContext } from "react";
import { resignationDictionaryList } from "../localization/index";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import UserInfo from "../../../sharedComponents/UserShortInfo/UserInfo";
import SublineDesigWithTime from "../../../sharedComponents/UserShortInfo/SubLine/DesigWithTime";
import StatusTag from "../../../sharedComponents/Tag/StatusTag";
import Attachments from "../../travel/view/UI/Attachments";
import ResignationDefaultIcon from "../../../../content/svg/menu/newNavBarIcon/resignation.svg";
import moment from "moment";
import {
  ItemContent,
  ItemHeader,
  SingleItem,
} from "../../../sharedComponents/Card/CardStyle";
import Avatar from "../../../sharedComponents/Avatar/avatar";
import { useDispatch } from "react-redux";
import { ResignationPurposeEnum, ResignationTypeEnum } from "../enums";
import "./style.css";

function ListItem(props) {
  const disptach = useDispatch();
  const { userLanguage } = useContext(LanguageChangeContext);
  const { Direction, resignationDictionary } = resignationDictionaryList[
    userLanguage
  ];

  const {
    creator,
    description,
    finance,
    image = ResignationDefaultIcon,
    purposeId,
    type,
    user,
    it,
    approvers = [],
    status,
    referenceNo,
    createDate,
  } = props.item;
  console.log(props.item, "props.item");
  const localTime = moment
    .utc(createDate)
    .local()
    .format();

  const handleImageView = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <>
      <SingleItem onClick={props.onClick} className="resignationListItem">
        <div className="new" id={props.id}></div>
        <ItemHeader>
          <div className="left">
            <UserInfo
              avatarSrc={creator?.image}
              name={creator?.name}
              status={creator.userActiveStatus}
              profileId={"asd13123zxczxc"}
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
              width={60}
              height={60}
              onClick={handleImageView}
              src={image === "" ? ResignationDefaultIcon : image}
            />
          </div>
        </ItemContent>
        <div className="cardSections">
          <div className="cardSectionItem">
            <div className="cardSection__title">
              {resignationDictionary.reason}{" "}
            </div>
            <div className="cardSection__body">
              {ResignationPurposeEnum.map((item) => {
                if (item.value === purposeId) {
                  return item.label;
                }
              })}
            </div>
          </div>
          <div className="cardSectionItem">
            <div className="cardSection__title">
              {ResignationTypeEnum.map((item) => {
                if (item.value === type) {
                  return item.label;
                }
              })}
            </div>
            <div className="cardSection__body tagDiv">
              {user && (
                <div className="singleTag">
                  {user.image ? (
                    <div className="imageDiv">
                      <img src={user.image} alt={user.name} />
                    </div>
                  ) : (
                    ""
                  )}
                  <div className="tagText">
                    <p>{user.name}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="cardSectionItem">
            <div className="cardSection__title">
              {" "}
              {resignationDictionary.finance}
            </div>
            <div className="cardSection__body">
              {finance && (
                <Avatar
                  isAvatarGroup={true}
                  isTag={false}
                  heading={"approvers"}
                  membersData={finance}
                  text={"approvers"}
                  image={"https://joeschmoe.io/api/v1/random"}
                />
              )}
            </div>
          </div>
          <div className="cardSectionItem">
            <div className="cardSection__title">
              {" "}
              {resignationDictionary.IT}
            </div>
            <div className="cardSection__body">
              {it && (
                <Avatar
                  isAvatarGroup={true}
                  isTag={false}
                  heading={"approvers"}
                  membersData={it ? it : []}
                  text={"Approvers"}
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

export default ListItem;
