import moment from "moment";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setNotificationStatus } from "../../../../store/appReducer/responsiveSlice";
import Avatar from "../../../sharedComponents/Avatar/avatarOLD";
import { handleRedirect } from "../utils/functions";
import './style.css'

export default function NotificationItem({ item }) {
    let {
        fromUser,
        featureType,
        message,
        referenceId,
        createDate
    } = item;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleClick = () => {
        handleRedirect(featureType, referenceId, navigate);
        dispatch(setNotificationStatus(false));
    }
    return (
        <div className="approval_item notification_item" onClick={handleClick}>
            <div>
                <Avatar
                    src={fromUser.image}
                    name={fromUser.name}
                    size={40}
                    round={true}
                // active={true}
                />
            </div>
            <div className="approval_item_detail">
                <div className="approval_item_detail_child1">
                    {fromUser.name}
                    {message}
                </div>
                <div className="approval_item_detail_child2" >
                    <div className="dateTime" >
                        <div className="shortDesc" >
                            {moment(createDate).startOf('hour').fromNow()}
                        </div>
                        {/* <div className="shortDesc">
                            TRA-00000012
                        </div> */}
                    </div>

                </div>

            </div>
        </div>
    )
}