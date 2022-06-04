import React, { useContext } from "react";
import { Tag } from "antd";
import { dictionaryList } from "../../../utils/localization/languages";
import { LanguageChangeContext } from "../../../utils/localization/localContext/LocalContext";
import "./style.css";
import PropTypes from "prop-types";

const StatusTag = ({ status }) => {
	const { userLanguage } = useContext(LanguageChangeContext);
	const { sharedLabels, Direction } = dictionaryList[userLanguage];
	return (
		<>
			<Tag
				className={
					status === 2
						? "statusTag approved"
						: status === 3
						? "statusTag Cancel"
						: status === 7
						? "statusTag Cancel"
						: "statusTag inProcess"
				}
			>
				{status === 1
					? sharedLabels.inProcess
					: status === 2
					? sharedLabels.Approved
					: status === 3
					? sharedLabels.Declined
					: status === 4
					? sharedLabels.Resend
					: status === 5
					? sharedLabels.InActive
					: status === 6
					? sharedLabels.NotRequired
					: status === 7
					? sharedLabels.Cancelled
					: "No Status"}
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
