import { Button, Modal } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import CheckInCard from './chackInCard';
import CheckInHeader from './header';
import ClockIn from '../../../../../content/NewContent/checkIn/clockIn.svg';
import ClockOut from '../../../../../content/NewContent/checkIn/clockOut.svg';
import './style.css'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getAttendanceLastCheckIn } from '../../store/actions';
import { ATTENDANCE_ENUM } from '../../utils/constant';
import CheckInList from './checkInList';

const CheckIn = () => {
    const dispatch = useDispatch();
    const { CHECK_IN } = ATTENDANCE_ENUM;
    const [isOpen, setIsOpen] = useState(false);
    const { lastCheckIn, success } = useSelector(state => state.attendanceSlice);

    useEffect(() => {
        dispatch(getAttendanceLastCheckIn())
    }, [isOpen]);
    useEffect(() => {
        if (success) setIsOpen(false)
    }, [success]);
    return (
        <>
            <div className='flex items-center text-xs'>
                <div>{moment().format('LLLL')}</div>
                <div>
                    <img
                        className={'checkInBtn ml-2 ' + (lastCheckIn && lastCheckIn.type === CHECK_IN.IN ? "blinkInfoRed" : "blinkInfo")}
                        src={lastCheckIn && lastCheckIn.type === CHECK_IN.IN ? ClockOut : ClockIn} alt=""
                        onClick={() => setIsOpen(true)}
                    />
                </div>
            </div>
            <Modal
                title={null}
                centered
                visible={isOpen}
                footer={null}
                closeIcon={null}
                className="checkInModal"
                onOk={() => setIsOpen(false)}
                onCancel={() => setIsOpen(false)}
                width="445px"
            >
                <CheckInHeader />
                <CheckInCard lastCheckIn={lastCheckIn} handleUpdate={(data) => { }} onSuccess={() => { }} />
                <CheckInList lastData={lastCheckIn} />
            </Modal>
        </>
    )
}
export default CheckIn;