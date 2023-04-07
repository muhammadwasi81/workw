import { Image, Tag, message, Button } from "antd";
import React, { useContext, useState } from "react";
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
import Attachments from "../../travel/view/UI/Attachments";
import CopyToClipboard from "react-copy-to-clipboard";
import { ROUTES } from "../../../../utils/routes";
import { LinkOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import ApplyRequisition from "./publicRoutes/ApplyRequisition";

function ListItem(props) {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { Direction, requisitionDictionary } = requisitionDictionaryList[
    userLanguage
  ];
  const disptach = useDispatch();
  const [copy, setCopy] = useState(false);
  let navigate = useNavigate();

  const {
    creator,
    name,
    description,
    image,
    reason,
    budget,
    deadline,
    finalApprovers = [],
    approvers = [],
    status,
    referenceNo,
    createDate,
    attachments,
    id,
  } = props.item;

  const localTime = moment
    .utc(createDate)
    .local()
    .format();
  const copyfunc = () => {
    setCopy(true);
    message.success("Copied");
  };
  const linkHandler = (id) => {
    window.open(
      `${window.location.origin}${ROUTES.REQUISITION.APPLYREQUISITION}/${id}`,
      "_blank"
    );
  };
  return (
    <>
      <SingleItem onClick={props.onClick}>
        <div className="new" id={props.id}></div>
        <ItemHeader>
          <div className="left">
            <UserInfo
              avatarSrc={creator?.image}
              name={creator?.name}
              status={creator.userActiveStatus}
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
            <CopyToClipboard
              text={`${window.location.origin}${ROUTES.REQUISITION.APPLYREQUISITION}/${id}`}
              onCopy={copyfunc}
            >
              <Tag className="LinkTag ThemeBtn">
                <LinkOutlined /> {requisitionDictionary.copyLink}
              </Tag>
            </CopyToClipboard>
            <Button className="ThemeBtn" onClick={() => linkHandler(id)}>
              {requisitionDictionary.link}
            </Button>
          </div>
        </ItemHeader>
        <ItemContent className="flex">
          <div className="description w-full">
            <p>{description}</p>
          </div>
          <div className="!w-max m-4 ml-auto attachmentBox">
            <Attachments
              data={attachments}
              key={{ data: attachments }}
              toShow={1}
              onClick={() => {}}
              size={"50px"}
            />
          </div>
        </ItemContent>
        <div className="cardSections">
          <div className="cardSectionItem">
            <div className="cardSection__title">
              {" "}
              {requisitionDictionary.Budget}
            </div>
            <div className="cardSection__body">{budget}</div>
          </div>
          <div className="cardSectionItem">
            <div className="cardSection__title">
              {" "}
              {requisitionDictionary.name}
            </div>
            <div className="cardSection__body">{name}</div>
          </div>
          <div className="cardSectionItem">
            <div className="cardSection__title">
              {" "}
              {requisitionDictionary.reason}
            </div>
            <div className="cardSection__body">{reason}</div>
          </div>
          <div className="cardSectionItem">
            <div className="cardSection__title">
              {requisitionDictionary.deadline}
            </div>
            <div className="cardSection__body">
              {" "}
              {moment(deadline).format("ddd,MMM DD,YYYY")}
            </div>
          </div>
          {props.isDetail ? (
            <>
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
                      text={requisitionDictionary.approvers}
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
                      text={requisitionDictionary.forFinalApproval}
                      image={"https://joeschmoe.io/api/v1/random"}
                    />
                  )}
                </div>
              </div>
            </>
          ) : (
            ""
          )}
        </div>
      </SingleItem>
    </>
  );
}

export default ListItem;
