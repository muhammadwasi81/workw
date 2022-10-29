import React from 'react';
import UsersIcon from '../../../../../../../content/svg/companies/users.svg';
import UsersIconRed from '../../../../../../../content/svg/companies/usersRed.svg';
import UsersIconGreen from '../../../../../../../content/svg/companies/usersGreen.svg';
import UsersIconGrey from '../../../../../../../content/svg/companies/usersGrey.svg';
import UsersIconYellow from '../../../../../../../content/svg/companies/usersYellow.svg';
import employeeIcon from "../../../../../../../content/svg/menu/newNavBarIcon/Employees.svg";
import WhiteCard from '../../../../UI/WhiteCard';

const UsersBoard = ({ item }) => {
    let {
        total = 150,
        nonLogin = 50,
        nonActive = 70,
        disable = 20,
        active = 40
    } = item;
    return (
        <div className="c-dash-item" style={{ flex: 1 }}>
            <WhiteCard className='myPaper' style={{ padding: "20px 10px", margin: "10px", textAlign: "center" }}>
                <div className='userItem' >
                    <div className='totalUsers'>
                        <img src={employeeIcon} className="userIcon" />
                        <div className='dash-text'>{total} Total Users</div>
                    </div>
                    <div className='otherUsers'>
                        <div className='otherUser userGreen'>
                            <img src={UsersIconGreen} className="userIcon" />
                            <div className='dash-text'>{active} Active</div>
                        </div>
                        <div className='otherUser userGrey'>
                            <img src={UsersIconGrey} className="userIcon" />
                            <div className='dash-text'>{disable} Disabled</div>
                        </div>
                        <div className='otherUser userYellow'>
                            <img src={UsersIconYellow} className="userIcon" />
                            <div className='dash-text'>{nonLogin} Non-Login</div>
                        </div>
                        <div className='otherUser userRed'>
                            <img src={UsersIconRed} className="userIcon" />
                            <div className='dash-text'>{nonActive} Deleted</div>
                        </div>
                    </div>
                </div>
            </WhiteCard>
        </div>
    )
}
export default UsersBoard;