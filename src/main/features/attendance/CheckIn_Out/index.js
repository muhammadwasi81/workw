import { Button, Modal } from 'antd';
import moment from 'moment';
import React, { useState } from 'react';
import CheckInCard from './chackInCard';
import CheckInHeader from './header';
import ClockIn from '../../../../content/NewContent/checkIn/clockIn.svg';
import ClockOut from '../../../../content/NewContent/checkIn/clockOut.svg';
import './style.css'

const CheckIn = ({ lastData = { type: 2 } }) => {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <>
            <div className='flex items-center text-xs'>
                <div>{moment().format('LLLL')}</div>
                <div>
                    <img 
                    className={'checkInBtn ml-2 ' + (lastData && lastData.type === 1 ? "blinkInfoRed" : "blinkInfo")}
                    src={lastData && lastData.type === 1 ? ClockOut : ClockIn} alt="" 
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
                {/* <CheckInCard lastData={{type:2}} handleUpdate={(data)=>{setLastData(data); handleClose()}} onSuccess={onSuccess} /> */}
                <CheckInCard lastData={{ type: 2 }} handleUpdate={(data) => { }} onSuccess={() => { }} />
            </Modal>
        </>
    )
}
export default CheckIn;