import React from "react";

const SublineDesigWithTime = ({designation, time}) => {
    return(
        <div className="details">
        <span className="designation">{designation}</span>
        <span className="dot"></span>
        <span className="time">{time}</span>
    </div>
    )
}
export default SublineDesigWithTime;