import { Tag } from "antd";
import moment from "moment";
import React, { useContext } from "react";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";
import { getIconByFeaturesType } from "../../../../../utils/Shared/helper/helpers";
import { getStatusLabelAndColor } from "../../../../sharedComponents/AppComponents/Approvals/enums";
import { getFeaturesTypeByApprovalsType } from "../../../../sharedComponents/AppComponents/Approvals/helper/helpers";
import { ApprovalDictionary } from "../../../../sharedComponents/AppComponents/Approvals/localization";
import Avatar from "../../../../sharedComponents/Avatar/avatarOLD";
// import Avatar from "../../../../sharedComponents/Avatar/avatarOLD";
import "../style.css";
import ApprovalActions from "./approvalActions";

export default function ApprovalItem({
  item,
  handleApprovalDetail = () => { },
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
  return (
    <div
      className="approval_item cursor-pointer"
      onClick={() => handleApprovalDetail(item)}
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
          <div className="statusHolder" >
            <div className="featureIcon" >
              <img src={getIconByFeaturesType(getFeaturesTypeByApprovalsType(item.module))} />
            </div>
            {item.status === 1 && <ApprovalActions item={item} />}
          </div>
          {item.status !== 1 && (
            <div className="approval_status_tag">
              <Tag style={{ background: color }}>{label}</Tag>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
