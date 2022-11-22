import React, { useContext, useEffect, useState } from "react";
import { Drawer, Tag, Image } from "antd";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { customApprovalDictionaryList } from "../localization/index";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import customApprovalIcon from "../../../../content/svg/menu/newNavBarIcon/Custom Approval.svg";
import UserInfo from "../../../sharedComponents/UserShortInfo/UserInfo";
import SublineDesigWithTime from "../../../sharedComponents/UserShortInfo/SubLine/DesigWithTime";
import StatusTag from "../../../sharedComponents/Tag/StatusTag";
import Avatar from "../../../sharedComponents/Avatar/avatar";
import RemarksApproval from "../../../sharedComponents/AppComponents/Approvals/view";
import {
  ApprovalsModule,
  ApprovalStatus,
} from "../../../sharedComponents/AppComponents/Approvals/enums";

import moment from "moment";
import {
  ItemContent,
  ItemHeader,
} from "../../../sharedComponents/Card/CardStyle";
import Attachments from "../../travel/view/UI/Attachments";

function DetailedView(props) {
  const [updatedStatus, setUpdatedStatus] = useState(null);

  const { userLanguage } = useContext(LanguageChangeContext);
  const { Direction, customApprovalDictionary } = customApprovalDictionaryList[
    userLanguage
  ];

  const { customApprovalDetail } = useSelector(
    (state) => state.customApprovalSlice
  );

  const {
    creator,
    description,
    image = customApprovalIcon,
    approvers = [],
    status,
    referenceNo,
    subject,
    category,
    value,
    createDate,
    attachments,
  } = customApprovalDetail;

  const isTablet = useMediaQuery({ maxWidth: 800 });

  return (
    <Drawer
      title={
        <h1 style={{ fontSize: "20px", margin: 0 }}>{"Custom Approval"}</h1>
      }
      width="768"
      placement={
        (Direction === "ltr" ? "left" : "right", isTablet ? "bottom" : "right")
      }
      onClose={props.onClose}
      visible={props.visible}
      className="detailedViewComposer drawerSecondary"
      destroyOnClose={true}
    >
      <div className="detailedCard ">
        <ItemHeader>
          <div className="left">
            <UserInfo
              avatarSrc={creator.image}
              name={creator.name}
              Subline={
                <SublineDesigWithTime
                  designation={creator.designation ? creator.designation : ""}
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
        <ItemContent className="flex item-content">
          <div className="description w-full">
            <p>{description}</p>
          </div>
          <div className="attachmentBox">
            <Attachments
              data={attachments}
              key={{ data: attachments }}
              toShow={1}
              onClick={() => {}}
              size={"50px"}
            />
            {/* {attachments.map((i) => {
              return (
                <Image preview={false} width={50} height={50} src={i.path} />
              );
            })} */}
          </div>
        </ItemContent>
        <div className="cardSections">
          <div className="cardSectionItem">
            <div className="cardSection__title">{"Subject"}</div>
            <div className="cardSection__body">{subject}</div>
          </div>
          <div className="cardSectionItem">
            <div className="cardSection__title">{"Category"}</div>
            <div className="cardSection__body">{category}</div>
          </div>
          <div className="cardSectionItem">
            <div className="cardSection__title">{"Amount"}</div>
            <div className="cardSection__body">{value}</div>
          </div>
          <div className="cardSectionItem">
            <div className="cardSection__title">
              {customApprovalDictionary.approvers}
            </div>
            <div className="cardSection__body">
              {approvers && (
                <Avatar
                  isAvatarGroup={true}
                  isTag={false}
                  heading={"Approvers"}
                  membersData={approvers}
                  text={"Approvers"}
                  image={"https://joeschmoe.io/api/v1/random"}
                />
              )}
            </div>
          </div>
        </div>
        <RemarksApproval
          module={ApprovalsModule.CustomApproval}
          status={status}
          onStatusChanged={(statusChanged) => {
            setUpdatedStatus(statusChanged);
            console.log(statusChanged);
          }}
          data={approvers}
          title="Approvers"
        />
      </div>
    </Drawer>
  );
}

export default DetailedView;
