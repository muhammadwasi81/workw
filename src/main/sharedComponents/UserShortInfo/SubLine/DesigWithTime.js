import React from "react";

const SublineDesigWithTime = ({ designation, time }) => {
  return (
    <div className="details" style={{ fontSize: "11px" }}>
      <span className="designation">{designation}</span>
      <span className="dot"></span>
      <span className="time">{time}</span>
    </div>
  );
};
export default SublineDesigWithTime;
