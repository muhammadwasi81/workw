import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getAllNotification } from "../store/action";
import NotificationItem from "./NotificationItem";
import './style.css'

const defaultFilter = {
    pageNo: 1,
    search: ""
}

export default function Notifications() {
    const dispatch = useDispatch();
    const [filter, setFilter] = useState(defaultFilter);
    const notificationList = useSelector(state => state.notificationSliceNew.notificationList);
    useEffect(() => {
        dispatch(getAllNotification(filter));
    }, []);
    return (
        <div className="approval_list_cont" >
            <div className="approval_header" >
                <div className="approval_header_child1">Notifications</div>
                <div className="approval_header_child2" >
                    <div></div>
                    <div>Mark All Read</div>
                </div>
            </div>

            <div className="approval_list" >
                {notificationList.map((item) => <NotificationItem item={item}/>)}
            </div>

        </div>
    )
}