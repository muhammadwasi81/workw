import { Avatar, Button } from 'antd'
import React from 'react'

function Header({username,userdesignation, status}) {
    return (
        <div className="approval-header">
            <div className="header-left">
            <Avatar size={40} src="https://joeschmoe.io/api/v1/random" />
            <div className="user-details">
            <span className="user-name">
                        {username}
                </span>
                <span className="designation">
                    {userdesignation}
                </span>
            </div>
                
            </div>
            <div className="header-right">
                    <Button type='primary'>
                        {status}
                    </Button>
            </div>

        </div>
    )
}

export default Header
