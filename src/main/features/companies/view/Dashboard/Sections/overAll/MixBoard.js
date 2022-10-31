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
    let { group, lead, project, task } = item;
    return (
        <div className="c-dash-item">
            <WhiteCard>
                <div className='extraItem' >
                    <div className='otherExtras'>
                        <div className='otherExtra userGrey'>
                            <img src={groupsIcon} className="userIcon" />
                            <div>{group} Groups Managed</div>
                        </div>
                        <div className='otherExtra userGrey'>
                            <img src={projectsIcon} className="userIcon" />
                            <div>{project} Projects Managed</div>
                        </div>
                        <div className='otherExtra userGrey'>
                            <img src={taskIcon} className="userIcon" />
                            <div>{task} Tasks Managed</div>
                        </div>
                        <div className='otherExtra userGrey'>
                            <img src={contactManagerIcon} className="userIcon" />
                            <div>{lead} Leads Managed</div>
                        </div>
                    </div>
                </div>
            </WhiteCard>
        </div>
    )
}
export default MixBoard;