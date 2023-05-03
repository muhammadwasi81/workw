import React, { useContext, useEffect, useState } from "react";
import { Tag, Image, Button, Skeleton } from "antd";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { resignationDictionaryList } from "../localization/index";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";

import UserInfo from "../../../sharedComponents/UserShortInfo/UserInfo";
import SublineDesigWithTime from "../../../sharedComponents/UserShortInfo/SubLine/DesigWithTime";
import StatusTag from "../../../sharedComponents/Tag/StatusTag";
import ResignationDefaultIcon from "../../../../content/svg/menu/newNavBarIcon/resignation.svg";
import Avatar from "../../../sharedComponents/Avatar/avatar";
import {
  ItemContent,
  ItemHeader,
} from "../../../sharedComponents/Card/CardStyle";
import RemarksApproval from "../../../sharedComponents/AppComponents/Approvals/view";
import moment from "moment";
// import { cancelReward } from "../store/actions";
import {
  ApprovalsModule,
  ApprovalStatus,
} from "../../../sharedComponents/AppComponents/Approvals/enums";
import { cancelResignationAction, GetResignationById } from "../store/action";
import { ResignationPurposeEnum, ResignationTypeEnum } from "../enums";
import DetailTabs from "./detailTabs";

function DetailCard(props) {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { resignationDictionary } = resignationDictionaryList[userLanguage];
  const { detail, loadingData } = useSelector(
    (state) => state.resignationSlice
  );
  const { userData } = useSelector((state) => state.userSlice);
  const [updatedStatus, setUpdatedStatus] = useState(null);

  const dispatch = useDispatch();

  let {
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
  // let userId = userData.id

  useEffect(() => {
    props.id && dispatch(GetResignationById(props.id));
  }, [props.id]);

  const {
    creator = {},
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
  } = detail;

  console.log("detailprops",props.id);
  
  const handleCancel = (e, payload) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(cancelResignationAction(payload));
  };

  const isTablet = false;
  if (loadingData) return <Skeleton />;

  return (
    <>
      {detail.id && (
        <>
          <div id={props.id} className="detailedViewComposer">
            <ItemHeader>
              <div className="left">
                <UserInfo
                  avatarSrc={creator.image}
                  name={creator.name}
                  status={creator.userActiveStatus}
                  profileId={creator.id}
                  Subline={
                    <SublineDesigWithTime
                      designation={
                        creator.designation ? creator.designation : ""
                      }
                      time={moment(createDate).fromNow()}
                    />
                  }
                />
              </div>
              <div className="right">
                <Tag className="IdTag">{referenceNo}</Tag>
                <StatusTag
                  status={updatedStatus ? updatedStatus.Approvers : status}
                ></StatusTag>
                {/* <Button className="ThemeBtn" onClick={(e) => handleCancel(e, props.id)}>
                                    Cancel
                                </Button> */}
                {/* {
                                userId === creator.id ? status != Declined && status != Resend && status != Approved ? <Button className="ThemeBtn" onClick={(e) => handleCancel(e, props.id)}>Cancel</Button> :
                                    "" : ""
                            } */}
              </div>
            </ItemHeader>
            <ItemContent className="flex">
              <div className="description w-full">
                <p>{description}</p>
              </div>
              <div
                className="attachmentBox"
                style={{ width: "65px", height: "60px" }}
              >
                <Image
                  preview={false}
                  width={60}
                  src={image === "" ? ResignationDefaultIcon : image}
                />
              </div>
            </ItemContent>
            <div className="cardSections">
              <div className="cardSectionItem">
                <div className="cardSection__title">
                  {resignationDictionary.reason}
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
                          <img src={user.image} />
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
              {it && it.length > 0 ? (
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
              ) : (
                ""
              )}
            </div>
          </div>
          <DetailTabs
            detailId={props.id}
            RemarksApproval={
              <>
                {approvers && approvers.length > 0 ? (
                  <RemarksApproval
                    module={ApprovalsModule.RequisitionApproval}
                    status={status}
                    onStatusChanged={(statusChanged) => {
                      setUpdatedStatus(statusChanged);
                      console.log(statusChanged);
                    }}
                    data={approvers}
                    title={
                      approvers && approvers.length === 0
                        ? "No Approvers available"
                        : "Approvers"
                    }
                    className="ApproversRow"
                  />
                ) : (
                  ""
                )}
                <RemarksApproval
                  module={ApprovalsModule.ResignationFinanceApproval}
                  status={status}
                  onStatusChanged={(statusChanged) => {
                    setUpdatedStatus(statusChanged);
                    console.log(statusChanged);
                  }}
                  data={finance}
                  title={resignationDictionary.finance}
                />
                <RemarksApproval
                  module={ApprovalsModule.ResignationItApproval}
                  status={status}
                  onStatusChanged={(statusChanged) => {
                    setUpdatedStatus(statusChanged);
                    console.log(statusChanged);
                  }}
                  data={it}
                  title={resignationDictionary.IT}
                />
              </>
            }
          />
        </>
      )}
    </>
  );
}

export default DetailCard;
