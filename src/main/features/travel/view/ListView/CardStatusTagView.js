import React from "react";
import ReferenceTag from "../../../../sharedComponents/Tag/ReferenceTag";
import StatusTag from "../../../../sharedComponents/Tag/StatusTag";
import PropTypes from "prop-types";

function CardStatusTagView(props) {
	return (
		<div>
			<ReferenceTag refNo={props.refNo} />
			<StatusTag status={props.status} />
		</div>
	);
}

export default CardStatusTagView;
CardStatusTagView.propTypes = {
	refNo: PropTypes.string.isRequired,
	status: PropTypes.number.isRequired,
};
CardStatusTagView.defaultProps = {
	refNo: "",
	status: 0,
};
