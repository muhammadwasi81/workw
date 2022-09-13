import React, { useContext, useEffect, useState } from "react";
import { Drawer, Tag, Image } from "antd";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { promotionDictionaryList } from "../localization/index";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import UserInfo from "../../../sharedComponents/UserShortInfo/UserInfo";
import SublineDesigWithTime from "../../../sharedComponents/UserShortInfo/SubLine/DesigWithTime";
import StatusTag from "../../../sharedComponents/Tag/StatusTag";
import Avatar from "../../../sharedComponents/Avatar/avatar";
import moment from "moment";
import RemarksApproval from "../../../sharedComponents/AppComponents/Approvals/view";
import {
  ApprovalsModule,
  ApprovalStatus,
} from "../../../sharedComponents/AppComponents/Approvals/enums";

function DetailedView(props) {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { Direction, promotionDictionary } = promotionDictionaryList[userLanguage];

  const [updatedStatus, setUpdatedStatus] = useState();

  const { promotionDetail } = useSelector((state) => state.promotionSlice);

  const { creator, description, status, createDate, grade, member, approvers } = promotionDetail;
  let { InProcess, Approved, Declined, Resend, Inactive, NotRequired, Cancelled, ApprovalRequired, Hold, NoStatus } = ApprovalStatus
  const isTablet = useMediaQuery({ maxWidth: 800 });

  return (
    <Drawer
      title={<h1 style={{ fontSize: "20px", margin: 0 }}>{promotionDictionary.promotion}</h1>}
      width="768"
      placement={(Direction === "ltr" ? "left" : "right", isTablet ? "bottom" : "right")}
      onClose={props.onClose}
      visible={props.visible}
      className="detailedViewComposer drawerSecondary">
      <div className="detailedCard ">
        <div className="item-header">
          <div className="left">
            <UserInfo
              avatarSrc={creator.image}
              name={creator.name}
              Subline={<SublineDesigWithTime designation={creator.designation ? creator.designation : ""} time={moment(createDate).fromNow()} />}
            />
          </div>
          <div className="right">
            <Tag className="IdTag">TRA-000085</Tag>
            <StatusTag
              status={updatedStatus?.Approvals}
            ></StatusTag>
          </div>
        </div>
        <div className="item-content">
          <p>{description}</p>
        </div>
        <div className="cardSections" style={{ marginTop: "10px" }}>
          <div className="cardSectionItem">
            <div className="cardSection__title">{"New Grade"}</div>
            <div className="cardSection__body"><Tag className="IdTag">{grade ? grade : "Default Grade"}</Tag></div>
          </div>
          <div className="cardSectionItem">
            <div className="cardSection__title">{promotionDictionary.promotionTo}</div>
            <div className="cardSection__body">
              {member && member.name
              }
            </div>
          </div>
          <div className="cardSectionItem">
            <div className="cardSection__title">{promotionDictionary.approvers}</div>
            <div className="cardSection__body">
              {approvers &&
                <Avatar
                  isAvatarGroup={true}
                  isTag={false}
                  heading={"Approvers"}
                  membersData={approvers}
                  text={"Approvers"}
                  image={"https://joeschmoe.io/api/v1/random"}
                />
              }
            </div>
          </div>
        </div>
        <RemarksApproval
          module={ApprovalsModule.RewardApproval}
          status={status}
          onStatusChanged={statusChanged =>
            setUpdatedStatus(statusChanged)
          }
          data={approvers}
          title="Approvals"
        />
      </div>
    </Drawer>
  );
}

export default DetailedView;
