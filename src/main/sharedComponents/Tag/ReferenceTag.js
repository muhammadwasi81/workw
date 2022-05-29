import { Tag } from "antd";
import React from "react";
import PropTypes from "prop-types";
function ReferenceTag(props) {
	return (
		<Tag className="!text-primary-color !border-none !py-1 !px-2 !bg-primary-ref-tag !rounded !text-sm !font-bold !w-fit">
			{props.refNo}
		</Tag>
	);
}

export default ReferenceTag;

ReferenceTag.propTypes = {
	refNo: PropTypes.string.isRequired,
};
ReferenceTag.defaultProps = {
	refNo: "",
};
