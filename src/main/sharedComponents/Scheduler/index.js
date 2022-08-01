import React, { useState } from "react";
import useSearch from "../CustomSelect/useSearch";
import Header from "./components/Header";
import "./style/style.css";
import moment from "moment";
import Schedule from "./components/Schedule";
function Scheduler() {
  const [currentDate, setCurrentDate] = useState(moment());
  const handleCalender = (value) => {
    setCurrentDate(value);
  };
  const handleToday = () => {
    setCurrentDate(moment());
  };
  const handlePrev = () => {
    var new_date = moment(currentDate).subtract(1, "days");
    setCurrentDate(new_date);
  };
  const handleNext = () => {
    var new_date = moment(currentDate).add(1, "days");
    setCurrentDate(new_date);
  };
  return (
    <div className="schduleWrapper" style={{ direction: "ltr" }}>
      <Header
        currentDate={currentDate}
        onCalender={handleCalender}
        onToday={handleToday}
        onPrev={handlePrev}
        onNext={handleNext}
      />
      <Schedule currentDate={currentDate} />
    </div>
  );
}

export default Scheduler;
