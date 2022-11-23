import moment from "moment";
import React, { useContext } from "react";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";
import Avatar from "../../../Avatar/avatarOLD";
import { getStatusLabelAndColor } from "../enums";
import { ApprovalDictionary } from "../localization";
import Attachments from "../../../../features/travel/view/UI/Attachments";

function RemarksBubble({ remarker, remark, type, status, date, attachments }) {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { status: statusLabels } = ApprovalDictionary[userLanguage];
  const { label, color } = getStatusLabelAndColor("", statusLabels)[status];
  var ts = moment.utc(date);
  ts.local().format("D-MMM-Y");
  return (
    <>
      <div className="comment">
        <div className="comment__header">
          <Avatar
            src={remarker?.image}
            name={remarker?.name}
            size={30}
            round
            width={"30px"}
            height={"30px"}
          />
        </div>
        <div className="comment__body">
          <div className="left">
            <h6>{remarker?.name}</h6>
            <span> {moment(ts).fromNow()}</span>
          </div>
          <p>{remark}</p>
          <span style={{ color }}>{label}</span>
          <div className="attachments-container">
            <Attachments
              data={attachments}
              key={{ data: attachments }}
              toShow={1}
              onClick={() => {}}
              size={"50px"}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default RemarksBubble;
