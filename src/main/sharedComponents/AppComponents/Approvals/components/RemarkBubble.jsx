import moment from "moment";
import React, { useContext } from "react";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";
import Avatar from "../../../Avatar/avatarOLD";
import { getStatusLabelAndColor } from "../enums";
import { ApprovalDictionary } from "../localization";

function RemarksBubble({ remarker, remark, type, status, date }) {
  const { name, image } = remarker;
  const { userLanguage } = useContext(LanguageChangeContext);
  const { status: statusLabels } = ApprovalDictionary[userLanguage];
  const { label, color } = getStatusLabelAndColor("", statusLabels)[status];

  return (
    <>
      <div className="comment">
        <div className="comment__header">
          <Avatar src={image} size={40} round width={"30px"} height={"30px"} />
        </div>
        <div className="comment__body">
          <h6>{name}</h6>
          <span> {moment(date).fromNow()}</span>
          <p>{remark}</p>
          <span style={{ color }}>{label}</span>
        </div>
      </div>
    </>
  );
}

export default RemarksBubble;
