import React, { useContext, useEffect, useState } from "react";
import { Drawer, Tag, Image, Button } from "antd";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { bonusDictionaryList } from "../localization/index";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";

import UserInfo from "../../../sharedComponents/UserShortInfo/UserInfo";
import SublineDesigWithTime from "../../../sharedComponents/UserShortInfo/SubLine/DesigWithTime";
import StatusTag from "../../../sharedComponents/Tag/StatusTag";
import Avatar from "../../../sharedComponents/Avatar/avatar";
import RemarksApproval from "../../../sharedComponents/AppComponents/Approvals/view";
import moment from "moment";
import { cancelBonus, GetBonusById } from "../store/actions";
import {
  ApprovalsModule,
  ApprovalStatus,
} from "../../../sharedComponents/AppComponents/Approvals/enums";

function BonusDetailCard(props) {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { Direction, bonusDictionary } = bonusDictionaryList[userLanguage];
  const [updatedStatus, setUpdatedStatus] = useState();

  const { bonusDetail } = useSelector((state) => state.bonusSlice);
  const { user } = useSelector((state) => state.userSlice);
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
  let userId = user.id;

  useEffect(() => {
    props.id && dispatch(GetBonusById(props.id));
  }, [props.id]);

  const {
    creator,
    createDate,
    member,
    approvers,
    amount,
    status,
    referenceNo,
    disburseAmount,
  } = bonusDetail;

  const handleCancel = (e, payload) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(cancelBonus(payload));
  };

  const isTablet = false;

  return (
    <>
      {bonusDetail.id && (
        <div id={props.id} className="detailedViewComposer">
          <div className="detailedCard ">
            <div className="item-header">
              <div className="left">
                {creator && (
                  <UserInfo
                    avatarSrc={creator.image}
                    name={creator.name}
                    Subline={
                      <SublineDesigWithTime
                        designation={
                          creator.designation ? creator.designation : ""
                        }
                        time={moment(createDate).fromNow()}
                      />
                    }
                  />
                )}
              </div>
              <div className="right">
                <Tag className="IdTag">TRA-000085</Tag>
                <StatusTag status={updatedStatus?.Approvals}></StatusTag>
                {userId === creator.id ? (
                  status != Declined &&
                  status != Resend &&
                  status != Approved ? (
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
            <div className="cardSections" style={{ marginTop: "20px" }}>
              <div className="cardSectionItem">
                <div className="cardSection__title">{"Amount"}</div>
                <div className="cardSection__body">{amount}</div>
              </div>
              <div className="cardSectionItem">
                <div className="cardSection__title">{"Bonus To"}</div>
                <div className="cardSection__body">{member && member.name}</div>
              </div>
              <div className="cardSectionItem">
                <div className="cardSection__title">
                  {bonusDictionary.approvers}
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
            </div>
          </div>
          {/* <RemarksApproval data={approvers} title="Approvers" /> */}
          <RemarksApproval
            module={ApprovalsModule.BonusApproval}
            status={status}
            onStatusChanged={(statusChanged) => setUpdatedStatus(statusChanged)}
            data={approvers}
            title="Approvers"
          />
        </div>
      )}
    </>
  );
}

export default BonusDetailCard;
