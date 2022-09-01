import React from "react";
import ClockIn from "../../../content/svg/checkInOut/clockIn.svg";
import happyFace from "../../../content/svg/happyFace.svg";
import { parseDateAndTime } from "../../../utils/base";
import face05 from "../../../content/svg/happyFace.svg";
import face03 from "../../../content/svg/medFace.svg";
import face01 from "../../../content/svg/angryFace.svg";
import face02 from "../../../content/svg/semiAngryFace.svg";
import face04 from "../../../content/svg/semiHappyFace.svg";

const CheckInListItem = ({data}) => {
    let {comment, attendanceDatetime, mood_id} = data;
    const moodEnum =["Very Unsatisfied", "Unsatisfied", "Neutral", "Satisfied", "Very Satisfied"]
    return (
        <div className="CheckInListItem" >
            <div className="imgCont">
                <img src={ClockIn} alt="" />
            </div>
            <div className="headingCont">
                <div className="headTime">{parseDateAndTime(attendanceDatetime)}</div>
                <div className="headDesc">{comment}</div>
                <div className="headMoodType">
                    <img src={mood_id === 1 ? face01 : mood_id === 2 ? face02 : mood_id === 3 ? face03 :
                        mood_id === 4 ? face04 : mood_id === 5 ? face05 : ""} alt="" />
                    <span className="ml-1" >{moodEnum[(mood_id-1)]}</span>
                </div>
            </div>
        </div>
    )
}
export default CheckInListItem