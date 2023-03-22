import React from 'react';
// import UsersIcon from '../../../../../../../content/svg/companies/users.svg';
// import UsersIconRed from '../../../../../../../content/svg/companies/usersRed.svg';
// import UsersIconGreen from '../../../../../../../content/svg/companies/usersGreen.svg';
// import UsersIconGrey from '../../../../../../../content/svg/companies/usersGrey.svg';
// import UsersIconYellow from '../../../../../../../content/svg/companies/usersYellow.svg';
import groupsIcon from "../../../../../../../content/svg/menu/newNavBarIcon/Groups.svg";
import projectsIcon from "../../../../../../../content/svg/menu/newNavBarIcon/Projects.svg";
import taskIcon from "../../../../../../../content/svg/menu/newNavBarIcon/Tasks.svg";
import contactManagerIcon from "../../../../../../../content/svg/menu/newNavBarIcon/Lead Manager.svg";
import WhiteCard from '../../../../UI/WhiteCard';

const MixBoard = ({ item }) => {
    let {
        group = 95,
        lead = 85,
        project = 90,
        task = 80
    } = item;
    return (
        <div className="c-dash-item">
            <WhiteCard className='myPaper'>
                <div className='extraItem' >
                    <div className='otherExtras'>
                        <div className='otherExtra userGrey'>
                            <img src={groupsIcon} className="userIcon" />
                            <div className='dash-text'>{group} Groups Managed</div>
                        </div>
                        <div className='otherExtra userGrey'>
                            <img src={projectsIcon} className="userIcon" />
                            <div className='dash-text'>{project} Projects Managed</div>
                        </div>
                        <div className='otherExtra userGrey'>
                            <img src={taskIcon} className="userIcon" />
                            <div className='dash-text'>{task} Tasks Managed</div>
                        </div>
                        <div className='otherExtra userGrey'>
                            <img src={contactManagerIcon} className="userIcon" />
                            <div className='dash-text'>{lead} Leads Managed</div>
                        </div>
                    </div>
                </div>
            </WhiteCard>
        </div>
    )
}
export default MixBoard;