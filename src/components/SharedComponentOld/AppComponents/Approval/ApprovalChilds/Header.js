import { Avatar, Button } from 'antd'
import React from 'react'
import StatusTag from "../../../../../main/sharedComponents/Tag/StatusTag"

function Header(props) {
    return (
        <div className="approval-header">
            <div className="header-left">
            <Avatar size={40} src="https://joeschmoe.io/api/v1/random" />
            <div className="user-details">
            <span className="user-name">
                        {props.username}
                </span>
                <span className="designation">
                    {props.userdesignation}
                </span>
            </div>
                
            </div>
            <div className="header-right">
                    <StatusTag status={props.status} /> 
            </div>

        </div>
    )
}

export default Header
