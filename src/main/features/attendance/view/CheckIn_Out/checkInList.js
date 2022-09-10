import React from "react";
import CheckInListItem from "./checkInListItem";

const CheckInList = ({lastData}) => {
    return (
        <div className="CheckInList" >
            <div className="CheckInListTitle">Today</div>
            <CheckInListItem data={lastData} />
        </div>
    )
}
export default CheckInList