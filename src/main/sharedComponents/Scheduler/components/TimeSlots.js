import { Divider } from "antd";
import React from "react";

function TimeSlots({ time }) {
  return (
    <div className="timeSlot">
      <span>{time}</span>
    </div>
  );
}

export default TimeSlots;
