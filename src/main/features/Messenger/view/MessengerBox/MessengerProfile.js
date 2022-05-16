import React from 'react';
import Avatar from '../../../../../components/SharedComponent/Avatar/avatar';
import phoneIcon from "../../../../../content/NewContent/Messenger/phone.svg";
import videoIcon from "../../../../../content/NewContent/Messenger/video.svg";
import infoIcon from "../../../../../content/NewContent/Messenger/info.svg";

const MessengerProfile = ({ hanldeClose }) => {
    return (
        <div className="MessengerProfile" onClick={hanldeClose}>

            <div className='imgHolder'>
                <img className='profileImg' src='https://konnect.im/upload/2021/3/5325454b-1c5d-40f1-b95d-df0fad2d4da9.jpeg' />
                <div>
                    <div className='user' >
                        <div className='name'>Abu Bakar Memon</div>
                        <div className='desc'>React Developer</div>
                    </div>
                    <div className='actions' >
                        <div><img src={phoneIcon} className='actionImg1' /></div>
                        <div><img src={videoIcon} className='actionImg2' /></div>
                    </div>
                </div>
            </div>


        </div>
    )
}
export default MessengerProfile;

