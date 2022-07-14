import React from "react";
import Avatar from "../../../sharedComponents/Avatar/avatarOLD";
import './style.css'

export default function NotificationItem() {
    return (
        <div className="approval_item" >
            <div>
                <Avatar
                    src={"https://konnect.im/upload/2021/3/5325454b-1c5d-40f1-b95d-df0fad2d4da9.jpeg"}
                    name={"Aqib Memon"}
                    size={44}
                    round={true}
                // active={true}
                />
            </div>
            <div className="approval_item_detail">
                <div className="approval_item_detail_child1">
                    Aqib Memon posted a new poll in abc project
                </div>
                <div className="approval_item_detail_child2" >
                    <div className="dateTime" >
                        <div className="shortDesc" >
                            Mon, June 2022. 09:22:20 AM
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