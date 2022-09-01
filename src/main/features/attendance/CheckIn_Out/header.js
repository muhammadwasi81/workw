import React from "react";
import homeIcon from "../../../../content/NewContent/checkIn/home.svg";

const CheckInHeader = () => {
    return (
        <div className="CheckInHeader" >
            <div className="imgCont" >
                <img src={homeIcon} alt="" />
            </div>
            <div className="headingCont" >
                <div>Good Day</div>
                <div>How are you feeling today?</div>
            </div>
        </div>
    )
}
export default CheckInHeader