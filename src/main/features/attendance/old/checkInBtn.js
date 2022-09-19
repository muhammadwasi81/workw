import React, { useEffect, useState } from "react";
import { parseDateAndTime } from "../../../utils/base";

const CheckInBtn = ({handleClick, checkInStatus}) => {
    const [currDate, setCurrDate] = useState(new Date().getTime());
    useEffect(()=>{
        setInterval(()=>{
          setCurrDate(new Date().getTime())
        }, 10000)
    }, [])
    return (
        <div className='btn' onClick={handleClick} style={{backgroundImage:"none", paddingLeft:"10px", fontSize:"10px"}}>
         {parseDateAndTime(currDate)}<br /> 
         Check {checkInStatus && checkInStatus.type === 1 ? "Out" : checkInStatus.type === 2 ? "In" : "..."}
        <div className="indicatorCont" > 
        <div className="checkInIndicator" style={{backgroundColor:checkInStatus && checkInStatus.type === 1 ? "green" : checkInStatus.type === 2 ? "red" : "unset"}} >
            </div> 
        </div>
        </div>
    )
}
export default CheckInBtn