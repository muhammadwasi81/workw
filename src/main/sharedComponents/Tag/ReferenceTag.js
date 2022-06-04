import { Tag } from "antd";
import React from "react";
import PropTypes from "prop-types";
function ReferenceTag(props) {
	return <Tag className="reference_tag">{props.refNo}</Tag>;
}

export default ReferenceTag;

ReferenceTag.propTypes = {
	refNo: PropTypes.string.isRequired,
};
ReferenceTag.defaultProps = {
	refNo: "",
};
