import React, { useContext, useEffect, useState } from "react";
import { Drawer, Image, Button, Skeleton } from "antd";
import { useSelector } from "react-redux";
import UserInfo from "../../../sharedComponents/UserShortInfo/UserInfo";
import { Tag } from "antd";
import SublineDesigWithTime from "../../../sharedComponents/UserShortInfo/SubLine/DesigWithTime";
import StatusTag from "../../../sharedComponents/Tag/StatusTag";
import Avatar from "../../../sharedComponents/Avatar/avatar";
import moment from "moment";
import RemarksApproval from "../../../sharedComponents/AppComponents/Approvals/view";
import {
  ApprovalsModule,
  ApprovalStatus,
} from "../../../sharedComponents/AppComponents/Approvals/enums";
import { promotionDictionaryList } from "../localization";

import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";

import { useDispatch } from "react-redux";
import { GetPromotionById, cancelPromotion } from "../store/actions";

function PromotionDetail(props) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userSlice);
  const { id } = props;
  const [updatedStatus, setUpdatedStatus] = useState();
  const { promotionDetail, loadingData } = useSelector(
    (state) => state.promotionSlice
  );
  console.log("loadingDataaaa",loadingData);
  
  console.log(promotionDetail, "promotion detail");
  const { userLanguage } = useContext(LanguageChangeContext);
  const { Direction, promotionDictionary } = promotionDictionaryList[
    userLanguage
  ];
  let userId = user.id;
  console.log(props.id, "propsss id");

  useEffect(() => {
    console.log(props.id, "props iddd");
    props.id && dispatch(GetPromotionById(props.id));
  }, [props.id]);

  if (loadingData) return <Skeleton />;

  console.log("FROM DETAIL");

  const {
    InProcess,
    Approved,
    Declined,
    Resend,
    Inactive,
    NotRequired,
    Cancelled,
    ApprovalRequired,
    Hold,
    NoStatus,
  } = ApprovalStatus;

  const {
    creator = {},
    status,
    approvers,
    description,
    createDate,
    member = {},
    referenceNo,
  } = promotionDetail;

  const handleCancel = (e, payload) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(cancelPromotion(payload));
  };

  return (
    <>
      {promotionDetail.id && (
        <div className="detailedCard ">
          <div className="item-header">
            <div className="left">
              <UserInfo
                avatarSrc={creator && creator.image}
                name={creator && creator.name}
                Subline={
                  <SublineDesigWithTime
                    designation={creator.designation ? creator.designation : ""}
                    time={moment(creator.createDate).fromNow()}
                  />
                }
              />
            </div>
            <div className="right">
              <Tag className="IdTag">{referenceNo}</Tag>
              <StatusTag
                status={updatedStatus ? updatedStatus.Approvers : status}
              ></StatusTag>
              {userId === creator.id ? (
                status != Declined && status != Resend && status != Approved ? (
                  <Button
                    className="ThemeBtn"
                    onClick={(e) => handleCancel(e, props.id)}
                  >
                    Cancel
                  </Button>
                ) : (
                  ""
                )
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="item-content">
            <p>{promotionDetail?.description}</p>
          </div>
          <div className="cardSections" style={{ marginTop: "10px" }}>
            <div className="cardSectionItem">
              <div className="cardSection__title">
                {promotionDictionary.grade}
              </div>
              <div className="cardSection__body">
                <Tag className="IdTag">
                  {/* {creator.grade ? creator.grade : "Default Grade"} */}
                  {promotionDetail?.grade}
                </Tag>
              </div>
            </div>
            <div className="cardSectionItem">
              <div className="cardSection__title">
                {promotionDictionary.promotionTo}
              </div>
              <div className="cardSection__body">{member && member.name}</div>
            </div>
            <div className="cardSectionItem">
              <div className="cardSection__title">
                {promotionDictionary.approvers}
              </div>
              <div className="cardSection__body">
                {approvers && (
                  <Avatar
                    isAvatarGroup={true}
                    isTag={false}
                    heading={"Approvers"}
                    membersData={approvers ? approvers : []}
                    text={"Approvers"}
                  />
                )}
              </div>
            </div>
          </div>
          <RemarksApproval
            module={ApprovalsModule.PromotionApproval}
            status={status}
            onStatusChanged={(statusChanged) => setUpdatedStatus(statusChanged)}
            data={approvers}
            title="Approvals"
          />
        </div>
      )}
    </>
  );
}

export default PromotionDetail;
