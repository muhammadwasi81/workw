import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import ChatIcon from '../../../content/NewContent/Sidebar/svg/Messenger.svg';
import { sideBarOpen } from "./store/sideBarChatSlice";


export const SideBarHead = () => {
    const dispatch = useDispatch()
    const isOpenChatBar = useSelector((state)=>state.sideBarChatSlice.sideBarChatStatus)
    const handleClick = () => {
     dispatch(sideBarOpen(!isOpenChatBar))
    }

    return (
        <div className="sideBarHead" >
            <div className="headIcon" >
                <img src={ChatIcon} alt="" onClick={handleClick} />
            </div>
            <div className="myDivider" >

            </div>
        </div>
    )
}

export default SideBarHead;