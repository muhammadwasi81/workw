import moment from 'moment';
import React, { useEffect, useState } from 'react';
import ClockIn from '../../../../content/NewContent/checkIn/clockIn.svg';
import ClockOut from '../../../../content/NewContent/checkIn/clockOut.svg';
import FaceRating from './RatingBox';

const CheckInCard = ({ lastData, handleUpdate, onSuccess }) => {
    const [rattingVal, setRattingVal] = useState(1);
    const [noteVal, setNoteVal] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [myLocation, setMyLocation] = useState(null);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            setMyLocation(position);
        });
    }, [])

    const handleSubmit = async () => {
        setIsLoading(true);
        let payload = {
            lat: myLocation ? myLocation.coords.latitude : 0,
            lng: myLocation ? myLocation.coords.longitude : 0,
            mood_id: rattingVal,
            comment: noteVal,
            type: lastData ? (lastData.type === 1 ? 2 : lastData.type === 2 ? 1 : 1) : 1
        }
        // const submitRes = await API.CHECK_IN_OUT.AddCheckIn(payload);
        const submitRes = {};
        if (submitRes.status) {
            handleUpdate(submitRes.data)
            setIsLoading(false)
            onSuccess()
        }
        else {
            alert(submitRes.error)
            setIsLoading(false)
        }
    }
    return (
        <div className='CheckInCard' >
            {/* {isLoading && <div className='checkInSpinnerHold' ><Spinner /></div>} */}
            <div className='firstCont'>
                <div className='headingCont'>
                    <div></div>
                    <div className='checkInTime dateSpace'>{moment().format('LTS')}</div>
                    <div className='checkInDate'>{moment().format('dddd MMM Do YYYY')}</div>
                </div>
                {!isLoading && <div className={'radius50 ' + (lastData && lastData.type === 1 ? "blinkInfoRed" : "blinkInfo")} >
                    <img src={lastData ? lastData.type === 1 ? ClockOut : lastData.type === 2 ? ClockIn : ClockIn : ClockIn} alt="" onClick={handleSubmit} />
                </div>}
            </div>

            <div className='mt-2' >
                <FaceRating />
            </div>

            <div className='checkInNote' >
                <div className='checkInNoteTitle'>Note</div>
                <div className='checkInInputCont' >
                    <input placeholder='I was late for the cause of traffic.' onChange={(e) => setNoteVal(e.target.value)} /></div>
            </div>

        </div>
    )
}
export default CheckInCard