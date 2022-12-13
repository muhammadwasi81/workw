import React, { useContext, useState } from "react";
import { Tag, Button, Skeleton } from "antd";
import { useSelector } from "react-redux";
import { complainDictionaryList } from "../localization/index";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import UserInfo from "../../../sharedComponents/UserShortInfo/UserInfo";
import SublineDesigWithTime from "../../../sharedComponents/UserShortInfo/SubLine/DesigWithTime";
import StatusTag from "../../../sharedComponents/Tag/StatusTag";
import RemarksApproval from "../../../sharedComponents/AppComponents/Approvals/view";
import Avatar from "../../../sharedComponents/Avatar/avatar";
import moment from "moment";
import {
  ItemContent,
  ItemHeader,
} from "../../../sharedComponents/Card/CardStyle";
import {
  ApprovalsModule,
  ApprovalStatus,
} from "../../../sharedComponents/AppComponents/Approvals/enums";
import "./complain.css";
import { useDispatch } from "react-redux";
import { GetComplainById } from "../store/actions";
import { useEffect } from "react";

function ComplainDetail(props) {
  const { id, handleCancel } = props;
  const { userLanguage } = useContext(LanguageChangeContext);
  const { complainDictionary } = complainDictionaryList[userLanguage];
  const { user } = useSelector((state) => state.userSlice);
  const { complainDetail, loadingData } = useSelector(
    (state) => state.complainSlice
  );

  const dispatch = useDispatch();
  const [updatedStatus, setUpdatedStatus] = useState();
  const { Approved, Declined, Resend } = ApprovalStatus;
  const userId = user.id;

  useEffect(() => {
    props.id && dispatch(GetComplainById(props.id));
  }, [props.id]);

  if (loadingData) return <Skeleton />;

  return (
    <div className="detailedCard ComplainListItem">
      <ItemHeader>
        <div className={"item-header"}>
          <div className="left">
            <UserInfo
              avatarSrc={complainDetail?.creator?.image}
              name={complainDetail?.creator?.name}
              Subline={
                <SublineDesigWithTime
                  designation={
                    complainDetail?.creator?.designation
                      ? complainDetail?.creator.designation
                      : ""
                  }
                  time={moment(complainDetail?.createDate).fromNow()}
                />
              }
            />
          </div>
          <div className="right">
            <Tag className="IdTag">{complainDetail?.referenceNo}</Tag>
            <StatusTag status={updatedStatus?.Approvals} />
            {/* {userId === complainDetail?.creator.id ? (
							complainDetail?.status != Declined &&
							complainDetail?.status != Resend &&
							complainDetail?.status != Approved ? (
								<Button
									className="ThemeBtn"
									onClick={e => handleCancel(e, props.id)}
								>
									Cancel
								</Button>
							) : (
								""
							)
						) : (
							""
						)} */}
          </div>
        </div>
      </ItemHeader>
      <ItemContent className="flex description">
        <div className="description">
          <p>{complainDetail?.description}</p>
        </div>
      </ItemContent>
      <div className="cardSections">
        <div className="cardSectionItem">
          <div className="cardSection__title">Category</div>
          <div className="cardSection__body">{complainDetail?.category}</div>
        </div>



        <div className="cardSectionItem">
          <div className="cardSection__title">
            {complainDictionary.complainOf}
          </div>
          <div className="cardSection__body">
            {complainDetail?.members && (
              <Avatar
                isAvatarGroup={true}
                isTag={false}
                heading={"Members"}
                membersData={
                  complainDetail?.members ? complainDetail?.members : []
                }
                text={"Members"}
                image={"https://joeschmoe.io/api/v1/random"}
              />
            )}
          </div>
        </div>


        <div className="cardSectionItem">
            <div className="cardSection__title">
              {complainDictionary.approvers}
            </div>
            <div className="cardSection__body">
              {complainDetail.approvers && (
                <Avatar
                  isAvatarGroup={true}
                  isTag={false}
                  heading={"approvers"}
                  membersData={
                   // approvers ? approvers : []
                    complainDetail?.approvers ? complainDetail?.approvers : []
                  }
                  text={"Approvers"}
                  image={"https://joeschmoe.io/api/v1/random"}
                />
              )}
            </div>
        </div>





      </div>
      <RemarksApproval
        module={ApprovalsModule.ComplainApproval}
        status={complainDetail?.status}
        onStatusChanged={(statusChanged) => setUpdatedStatus(statusChanged)}
        data={complainDetail?.approvers}
        title="Approvals"
      />
    </div>
  );
}

export default ComplainDetail;
