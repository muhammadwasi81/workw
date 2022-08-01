import React, { useContext } from "react";
import Remarks from "./Remarks";
import noData from "../../../../../content/svg/noData.svg";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";
import { ApprovalDictionary } from "../localization";

function ApprovalBody({ remarks }) {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { labels } = ApprovalDictionary[userLanguage];
  return (
    <div className="approval__header-body">
      {remarks.length > 0 ? (
        remarks.map(({ id, remarker, status, type, remark, createDate }) => {
          return (
            <Remarks
              key={id}
              remarker={remarker}
              status={status}
              type={type}
              remark={remark}
              date={createDate}
            />
          );
        })
      ) : (
        <div className="remarkNoData">
          <img src={noData} alt="" />
          <p>{labels.noData}</p>
        </div>
      )}
    </div>
  );
}

export default ApprovalBody;
