import React, { useContext } from "react";
import { Tag } from "antd";
import { getDocStatusLabelAndColor } from "../../../constant";
import { LanguageChangeContext } from "../../../../../../utils/localization/localContext/LocalContext";
import { ApprovalDictionary } from "../../../../../sharedComponents/AppComponents/Approvals/localization";

const DocumentStatusTag = ({ status = 1 }) => {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { status: statusLabels } = ApprovalDictionary[userLanguage];
  const { label, color } = getDocStatusLabelAndColor("", statusLabels)[status];

  return (
      <Tag className="statusTag" style={{ backgroundColor: color }}>
        {label}
      </Tag>
  );
};

export default DocumentStatusTag;