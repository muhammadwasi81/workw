import React from "react";
import ClockIn from "../../../../../content/NewContent/checkIn/clockIn.svg";
import ClockOut from "../../../../../content/NewContent/checkIn/clockOut.svg";
import face01 from "../../../../../content/NewContent/checkIn/angry.svg";
import face02 from "../../../../../content/NewContent/checkIn/feeling-not-good.svg";
import face03 from "../../../../../content/NewContent/checkIn/Neutral.svg";
import face04 from "../../../../../content/NewContent/checkIn/feeling-good.svg";
import face05 from "../../../../../content/NewContent/checkIn/happy.svg";
import moment from "moment";
import { ATTENDANCE_ENUM } from "../../utils/constant";

const CheckInListItem = ({ data }) => {
  let { comment, attendanceDate, moodId, type } = data;
  const { CHECK_IN } = ATTENDANCE_ENUM;
  const moodEnum = [
    "Very Unsatisfied",
    "Unsatisfied",
    "Neutral",
    "Satisfied",
    "Very Satisfied",
  ];
  return (
    <div className="CheckInListItem">
      <div className="imgCont">
        <img src={type === CHECK_IN.IN ? ClockIn : ClockOut} alt="" />
      </div>
      <div className="headingCont">
        <div className="headTime">{moment().format("LTS")}</div>
        <div className="headDesc">{comment}</div>
        <div className="headMoodType flex">
          <img
            src={
              moodId === 1
                ? face01
                : moodId === 2
                ? face02
                : moodId === 3
                ? face03
                : moodId === 4
                ? face04
                : moodId === 5
                ? face05
                : ""
            }
            alt=""
          />
          <span className="ml-1 font">{moodEnum[moodId - 1]}</span>
        </div>
      </div>
    </div>
  );
};
export default CheckInListItem;
