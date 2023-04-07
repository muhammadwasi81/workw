import React, { useContext, useEffect, useState } from "react";
import { Drawer, Tag, Image, Skeleton } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { customApprovalDictionaryList } from "../localization/index";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import customApprovalIcon from "../../../../content/svg/menu/newNavBarIcon/Custom Approval.svg";
import UserInfo from "../../../sharedComponents/UserShortInfo/UserInfo";
import SublineDesigWithTime from "../../../sharedComponents/UserShortInfo/SubLine/DesigWithTime";
import StatusTag from "../../../sharedComponents/Tag/StatusTag";
import Avatar from "../../../sharedComponents/Avatar/avatar";
import RemarksApproval from "../../../sharedComponents/AppComponents/Approvals/view";
import { GetCustomApprovalById } from "../store/actions";
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

export default function DetailCard(props) {
  const { id, handleCancel } = props;
  const [updatedStatus, setUpdatedStatus] = useState(null);
  const { userLanguage } = useContext(LanguageChangeContext);
  const { Direction, customApprovalDictionary } = customApprovalDictionaryList[
    userLanguage
  ];
  const { user } = useSelector((state) => state.userSlice);

  const { customApprovalDetail, loadingData } = useSelector(
    (state) => state.customApprovalSlice
  );
  console.log(customApprovalDetail, "customApprovalDetail");
  const dispatch = useDispatch();
  const { Approved, Declined, Resend } = ApprovalStatus;
  const userId = user.id;

  useEffect(() => {
    props.id && dispatch(GetCustomApprovalById(props.id));
  }, [props.id]);

  if (loadingData) return <Skeleton />;

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

  return (
    <div className="detailedCard">
      <ItemHeader>
        <div className="left">
          <UserInfo
            avatarSrc={creator?.image}
            name={creator?.name}
            profileId={"asd13123zxczxc"}
            status={creator.userActiveStatus}
            Subline={
              <SublineDesigWithTime
                designation={creator?.designation ? creator?.designation : ""}
                time={moment
                  .utc(createDate)
                  .local()
                  .fromNow()}
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
        <div className="description custom-detail-des">
          <p>{description}</p>
        </div>
        <div className="!w-max m-4 ml-auto attachmentBox">
          <Attachments
            data={attachments}
            key={{ data: attachments }}
            toShow={1}
            onClick={() => {}}
            size={"60px"}
          />
        </div>
      </ItemContent>
      <div className="cardSections">
        <div className="cardSectionItem">
          <div className="cardSection__title">
            {customApprovalDictionary.subject}
          </div>
          <div className="cardSection__body layout">{subject}</div>
        </div>
        <div className="cardSectionItem">
          <div className="cardSection__title">
            {customApprovalDictionary.category}
          </div>
          <div className="cardSection__body">{category}</div>
        </div>
        <div className="cardSectionItem">
          <div className="cardSection__title">
            {customApprovalDictionary.amount}
          </div>
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
        reference={customApprovalDetail.id}
        onStatusChanged={(prev) => {
          setUpdatedStatus((prev) => {
            return { ...prev, ...status };
          });
        }}
        data={approvers}
        title="Approvers"
      />
    </div>
  );
}
