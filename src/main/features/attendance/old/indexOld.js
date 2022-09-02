import { Button, Dialog } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { parseDateAndTime } from "../../../utils/base";
import CheckInCard from "./chackInCard";
import CheckInHeader from "./header";
import CheckInList from "./checkInList";
import './style.css'
// import { API } from "../../../utils/services";
// import Spinner from "../../spinner/spinner";

const CheckInComposer = ({ isOpen, handleClose, onSuccess }) => {
  const [lastData, setLastData] = useState(null);
  // const [isLoading, setIsLoading] = useState(null);
  useEffect(() => {
    getCheckInStatus()
  }, [])
  // const getCheckInStatus = async () => {
  //   setIsLoading(true)
  //   const { status, data, error } = await API.CHECK_IN_OUT.GetLastCheckIn();
  //   if (status){
  //     setLastData(data)
  //   setIsLoading(false)
  //   }
  //   else {
  //     alert(error)
  //     setIsLoading(false)
  //   }
  // }
  return (
    <Dialog
      open={isOpen}
      fullWidth={true}
      maxWidth={"xs"}
      aria-describedby="alert-dialog-description"
      aria-labelledby="max-width-dialog-title"
      onClose={() => handleClose()}
      contentStyle={{ width: "100%", maxWidth: "none", height: '100%' }}
    >
      <div className="checkInMain">
      {/* {isLoading && <div className='checkInSpinnerHold' ><Spinner /></div>} */}
        <CheckInHeader />
        <CheckInCard lastData={lastData} handleUpdate={(data)=>{setLastData(data); handleClose()}} onSuccess={onSuccess} />
        {lastData && lastData.type === 1 && <CheckInList lastData={lastData} />}
      </div>
    </Dialog>
  )
}
export default CheckInComposer