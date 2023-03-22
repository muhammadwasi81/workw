import React, { useContext } from "react";
import { Tag } from "antd";
import { dictionaryList } from "../../../utils/localization/languages";
import { LanguageChangeContext } from "../../../utils/localization/localContext/LocalContext";
import "./style.css";
import PropTypes from "prop-types";
import { getStatusLabelAndColor } from "../AppComponents/Approvals/enums";
import { ApprovalDictionary } from "../AppComponents/Approvals/localization";

const StatusTag = ({ status = 1 }) => {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { sharedLabels, Direction } = dictionaryList[userLanguage];
  const { status: statusLabels } = ApprovalDictionary[userLanguage];
  const { label, color } = getStatusLabelAndColor("", statusLabels)[
    status ? status : 1
  ];
  // console.log(
  //   getStatusLabelAndColor("", statusLabels)[status],
  //   "Status labelssssss"
  // );

  return (
    <>
      <Tag className="statusTag" style={{ backgroundColor: color }}>
        {label}
      </Tag>
    </>
  );
};

export default StatusTag;
StatusTag.propTypes = {
  status: PropTypes.number.isRequired,
};
StatusTag.defaultProps = {
  // status: "",
};
