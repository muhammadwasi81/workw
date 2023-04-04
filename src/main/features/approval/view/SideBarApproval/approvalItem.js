import { Modal, Tag } from "antd";
import moment from "moment";
import React, { useContext, useState } from "react";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";
import { getIconByFeaturesType } from "../../../../../utils/Shared/helper/helpers";
import {
  ApprovalStatus,
  getStatusLabelAndColor,
} from "../../../../sharedComponents/AppComponents/Approvals/enums";
import { getFeaturesTypeByApprovalsType } from "../../../../sharedComponents/AppComponents/Approvals/helper/helpers";
import { ApprovalDictionary } from "../../../../sharedComponents/AppComponents/Approvals/localization";
import Avatar from "../../../../sharedComponents/Avatar/avatarOLD";
// import Avatar from "../../../../sharedComponents/Avatar/avatarOLD";
import "../style.css";
import ApprovalActions from "./approvalActions";
import ApprovalDetailedView from "./detail";

export default function ApprovalItem({
  item,
  handleApprovalDetail = () => {},
  detail = false,
}) {
  let { creator, updateDate, message, referenceNo } = item;
  let notiTime = moment
    .utc(updateDate)
    .local()
    .fromNow();
  const { userLanguage } = useContext(LanguageChangeContext);
  const { status: statusLabels } = ApprovalDictionary[userLanguage];
  const { label, color } = getStatusLabelAndColor("", statusLabels)[
    item.status
  ];
  const [approvalDetailData, setApprovalDetailData] = useState({});
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleCancel = () => {
    setIsOpenModal(false);
  };
  const handleOpenApprovalDetail = (item) => {
    // e.preventDefault();
    // e.stopPropagation();
    setIsOpenModal(true);
    setApprovalDetailData(item);
  };

  return (
    <>
      <div
        className="approval_item cursor-pointer"
        onClick={
          !detail
            ? () => handleOpenApprovalDetail(item)
            : () => handleApprovalDetail(item)
        }
      >
        <div>
          <Avatar
            src={creator?.image}
            name={creator?.name}
            size={35}
            round={true}
            // active={true}
          />
        </div>
        <div className="approval_item_detail">
          <div className="approval_item_detail_child1">
            <span className="approval_creator">{creator?.name}</span>
            <span className="approval_message">{message}</span>
          </div>
          <div className="approval_item_detail_child2">
            <div className="dateTime">
              <div className="shortDesc">{notiTime}</div>
              <div className="shortDesc">{referenceNo}</div>
            </div>
            <div className="statusHolder">
              <div className="featureIcon">
                <img
                  src={getIconByFeaturesType(
                    getFeaturesTypeByApprovalsType(item.module)
                  )}
                />
              </div>
              {item.status === ApprovalStatus.InProcess && (
                <ApprovalActions item={item} />
              )}
            </div>
            {item.status !== ApprovalStatus.InProcess && (
              <div className="approval_status_tag">
                <Tag style={{ background: color }}>{label}</Tag>
              </div>
            )}
          </div>
        </div>
      </div>
      {!detail && isOpenModal && (
        <Modal
          title={null}
          visible={isOpenModal}
          footer={null}
          closable={false}
          onCancel={handleCancel}
          className="modal-body"
          width={700}
        >
          <ApprovalDetailedView approvalDetailData={approvalDetailData} />
        </Modal>
      )}
    </>
  );
}
