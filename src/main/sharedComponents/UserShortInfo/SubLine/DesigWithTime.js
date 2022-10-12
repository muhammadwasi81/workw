import React from "react";

const SublineDesigWithTime = ({ designation, time, icon, desgStyle={} }) => {
  return (
    <div className="details" style={{ fontSize: "11px" }}>
      <span className="designation" style={{...desgStyle}} >{designation}</span>
     {time && <span className="dot"></span>}
      <span className="time">{time}</span>
      <span className="icon">{icon}</span>
    </div>
  );
};
export default SublineDesigWithTime;
