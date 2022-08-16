import React from "react";
import EventWrapper from "./eventWrapper";
import Scheduler from "./scheduler";
import "../styles/calender.css";
function Calendar() {
  return (
    <div className="calender">
      <div className="left">
        <Scheduler />
      </div>
      <div className="right">
        <EventWrapper />
      </div>
    </div>
  );
}

export default Calendar;
