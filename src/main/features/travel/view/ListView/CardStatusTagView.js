import React from "react";
import ReferenceTag from "../../../../sharedComponents/Tag/ReferenceTag";
import StatusTag from "../../../../sharedComponents/Tag/StatusTag";
import PropTypes from "prop-types";

function CardStatusTagView(props) {
  // console.log("props status", props.status);
  return (
    <div className="flex justify-center  sm:m-0">
      {props.refNo && <ReferenceTag refNo={props.refNo} />}
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
