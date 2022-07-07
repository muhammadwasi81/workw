import React from "react";
import NotificationItem from "./NotificationItem";
import './style.css'

export default function Notifications() {
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
                {Array(30).fill(1).map((item) => <NotificationItem />)}
            </div>

        </div>
    )
}