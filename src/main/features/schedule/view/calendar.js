import React from "react";
import EventWrapper from "./eventWrapper";
import Scheduler from "./scheduler";
import { Calendar as AntCalendar } from "antd";
import "../styles/calender.css";
function Calendar() {
  return (
    <div className="calender">
      <div className="left">
        <Scheduler />
      </div>
      <div className="right">
        <AntCalendar fullscreen={false} />
        <div className="events">
          <EventWrapper />
          <EventWrapper />
        </div>
      </div>
    </div>
  );
}

export default Calendar;
