import React from 'react';
import UsersIcon from '../../../../../../../content/svg/companies/users.svg';
import UsersIconRed from '../../../../../../../content/svg/companies/usersRed.svg';
import UsersIconGreen from '../../../../../../../content/svg/companies/usersGreen.svg';
import UsersIconGrey from '../../../../../../../content/svg/companies/usersGrey.svg';
import UsersIconYellow from '../../../../../../../content/svg/companies/usersYellow.svg';
import employeeIcon from "../../../../../../../content/svg/menu/newNavBarIcon/Employees.svg";
import WhiteCard from '../../../../UI/WhiteCard';

const UsersBoard = ({item}) => {
    let { total, nonLogin, nonActive, disable, active } = item;
    return (
        <div className="c-dash-item" style={{ flex: 1 }}>
            <WhiteCard className='myPaper' style={{ padding: "20px 10px", margin: "10px", textAlign: "center" }}>
                <div className='userItem' >
                    <div className='totalUsers'>
                        <img src={employeeIcon} className="userIcon" />
                        <div>{total} Total Users</div>
                    </div>
                    <div className='otherUsers'>
                        <div className='otherUser userGreen'>
                            <img src={UsersIconGreen} className="userIcon" />
                            <div>{active} Active</div>
                        </div>
                        <div className='otherUser userGrey'>
                            <img src={UsersIconGrey} className="userIcon" />
                            <div>{disable} Disabled</div>
                        </div>
                        <div className='otherUser userYellow'>
                            <img src={UsersIconYellow} className="userIcon" />
                            <div>{nonLogin} Non-Login</div>
                        </div>
                        <div className='otherUser userRed'>
                            <img src={UsersIconRed} className="userIcon" />
                            <div>{nonActive} Deleted</div>
                        </div>
                    </div>
                </div>
            </WhiteCard>
        </div>
    )
}
export default UsersBoard;