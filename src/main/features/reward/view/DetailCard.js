import React, { useContext, useEffect, useState } from "react";
import { Drawer, Tag, Image, Button, Skeleton } from "antd";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { rewardDictionaryList } from "../localization/index";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";

import UserInfo from "../../../sharedComponents/UserShortInfo/UserInfo";
import SublineDesigWithTime from "../../../sharedComponents/UserShortInfo/SubLine/DesigWithTime";
import StatusTag from "../../../sharedComponents/Tag/StatusTag";
import RewardDefaultIcon from "../../../../content/svg/menu/rewardIcon.svg";
import Avatar from "../../../sharedComponents/Avatar/avatar";
import {
  ItemContent,
  ItemHeader,
} from "../../../sharedComponents/Card/CardStyle";
import RemarksApproval from "../../../sharedComponents/AppComponents/Approvals/view";
import moment from "moment";
import "./style/reward.css";
import { cancelReward, GetRewardById } from "../store/actions";
import {
  ApprovalsModule,
  ApprovalStatus,
} from "../../../sharedComponents/AppComponents/Approvals/enums";
import ConfirmationRemarkModal from "../../../sharedComponents/ConfirmationRemarkModal/ConfirmationRemarkModal";

function RewardDetailCard(props) {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { rewardDictionary } = rewardDictionaryList[userLanguage];
  const [isOpen, setIsOpen] = useState(false);
  const { rewardDetail, loadingData } = useSelector(
    (state) => state.rewardSlice
  );
  const { user } = useSelector((state) => state.userSlice);
  const [updatedStatus, setUpdatedStatus] = useState(null);

  const dispatch = useDispatch();

  let { Approved, Declined, Resend } = ApprovalStatus;
  let userId = user.id;

  useEffect(() => {
    props.id && dispatch(GetRewardById(props.id));
  }, [props.id]);

  if (loadingData || !rewardDetail.id) return <Skeleton />;

  const {
    creator,
    name,
    description,
    image = "http://localhost:3000/static/media/rewardIcon.1872d27791f08290da2b85977f16cf07.svg",
    reason,
    category,
    status,
    createDate,
    referenceNo,
    members = [],
    approvers,
  } = rewardDetail;

  const handleCancel = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  const onFinish = (values) => {
    let id = rewardDetail.id;
    let reason = values.remarks;
    setIsOpen(false);
    dispatch(cancelReward({ id: id, reason: reason }));
  };

  const isTablet = false;
  const localTime = moment
    .utc(createDate)
    .local()
    .format();
  return (
    <>
      {rewardDetail.id && (
        <div id={props.id} className="detailedViewComposer">
          <ItemHeader>
            <div className="left">
              <UserInfo
                avatarSrc={creator.image}
                name={creator.name}
                status={creator.userActiveStatus}
                profileId={creator?.id}
                Subline={
                  <SublineDesigWithTime
                    designation={creator.designation ? creator.designation : ""}
                    time={moment(localTime).fromNow()}
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
                    {rewardDictionary.cancel}
                  </Button>
                ) : (
                  ""
                )
              ) : (
                ""
              )}
            </div>
          </ItemHeader>
          <ItemContent className="flex">
            <div className="description w-full">
              <p>{description}</p>
            </div>
            <div
              className="ml-auto attachmentBox"
              style={{ width: "65px", height: "60px" }}
            >
              {/* {attatchments.map((i) => {
                return ( */}
              <Image
                preview={false}
                width={60}
                src={image === "" ? "" : image}
                // src={i.path}
              />
              {/* );
              })} */}
            </div>
          </ItemContent>
          <div className="cardSections">
            <div className="cardSectionItem">
              <div className="cardSection__title">
                {rewardDictionary.category}
              </div>
              <div className="cardSection__body">{category}</div>
            </div>
            <div className="cardSectionItem">
              <div className="cardSection__title"> {rewardDictionary.name}</div>
              <div className="cardSection__body layout">{name}</div>
            </div>
            <div className="cardSectionItem">
              <div className="cardSection__title">
                {" "}
                {rewardDictionary.reason}
              </div>
              <div className="cardSection__body layout">{reason}</div>
            </div>
            <div className="cardSectionItem">
              <div className="cardSection__title">
                {rewardDictionary.rewardTo}
              </div>
              <div className="cardSection__body">
                {members && (
                  <Avatar
                    isAvatarGroup={true}
                    isTag={false}
                    heading={"Members"}
                    membersData={members}
                    text={"Members"}
                    image={"https://joeschmoe.io/api/v1/random"}
                  />
                )}
              </div>
            </div>
            <div className="cardSectionItem">
              <div className="cardSection__title">
                {rewardDictionary.approvers}
              </div>
              <div className="cardSection__body">
                {approvers && (
                  <Avatar
                    isAvatarGroup={true}
                    isTag={false}
                    heading={rewardDictionary.approvers}
                    membersData={approvers ? approvers : []}
                    text={"Approvers"}
                    image={"https://joeschmoe.io/api/v1/random"}
                  />
                )}
              </div>
            </div>
          </div>
          <RemarksApproval
            module={ApprovalsModule.RewardApproval}
            reference={rewardDetail.id}
            status={status}
            onStatusChanged={(status) => {
              setUpdatedStatus((prev) => {
                return { ...prev, ...status };
              });
            }}
            data={approvers}
            title={rewardDictionary.approvers}
          />
        </div>
      )}
      <ConfirmationRemarkModal
        isOpen={isOpen}
        onCancel={onClose}
        onFinish={onFinish}
      />
    </>
  );
}

export default RewardDetailCard;
