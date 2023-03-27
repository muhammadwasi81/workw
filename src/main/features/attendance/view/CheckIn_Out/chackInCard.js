import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ClockIn from "../../../../../content/NewContent/checkIn/clockIn.svg";
import ClockOut from "../../../../../content/NewContent/checkIn/clockOut.svg";
import { addAttendanceCheckIn } from "../../store/actions";
import { ATTENDANCE_ENUM } from "../../utils/constant";
import FaceRating from "./RatingBox";

const CheckInCard = ({ lastCheckIn }) => {
  const dispatch = useDispatch();
  const [rattingVal, setRattingVal] = useState(3);
  const [noteVal, setNoteVal] = useState("");
  const [myLocation, setMyLocation] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { CHECK_IN } = ATTENDANCE_ENUM;

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setMyLocation(position);
    });
  }, []);

  const handleSubmit = () => {
    let payload = {
      lat: myLocation ? myLocation.coords.latitude : 0,
      lng: myLocation ? myLocation.coords.longitude : 0,
      moodId: rattingVal,
      comment: noteVal,
      // userId:"d3202659-8910-410f-93d5-2c7d8b39a2d5",
      type:
        lastCheckIn && lastCheckIn.type === CHECK_IN.IN
          ? CHECK_IN.OUT
          : CHECK_IN.IN,
    };
    dispatch(addAttendanceCheckIn(payload));
  };
  return (
    <div className="CheckInCard">
      {/* {isLoading && <div className='checkInSpinnerHold' ><Spinner /></div>} */}
      <div className="firstCont">
        <div className="headingCont">
          <div></div>
          <div className="checkInTime dateSpace">{moment().format("LTS")}</div>
          <div className="checkInDate">
            {moment().format("dddd MMM Do YYYY")}
          </div>
        </div>
        {
          <div
            className={
              "radius50 " +
              (lastCheckIn && lastCheckIn.type === CHECK_IN.IN
                ? "blinkInfoRed"
                : "blinkInfo")
            }
          >
            <img
              src={
                lastCheckIn && lastCheckIn.type === CHECK_IN.IN
                  ? ClockOut
                  : ClockIn
              }
              alt=""
              onClick={handleSubmit}
            />
          </div>
        }
      </div>

      <div className="mt-2">
        <FaceRating handleChange={(value) => setRattingVal(value)} />
      </div>

      <div className="checkInNote">
        <div className="checkInNoteTitle">Note</div>
        <div className="checkInInputCont">
          <input
            placeholder="I was late for the cause of traffic."
            onChange={(e) => setNoteVal(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};
export default CheckInCard;
