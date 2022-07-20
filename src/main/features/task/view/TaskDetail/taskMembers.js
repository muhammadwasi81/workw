import { Slider } from 'antd';
import React from 'react';
import SublineDesigWithTime from '../../../../sharedComponents/UserShortInfo/SubLine/DesigWithTime';
import UserInfo from '../../../../sharedComponents/UserShortInfo/UserInfo';

export default function TaskMembers({ members }) {

    return (
        <div className='taskMembers' >
            {
                members.map((item) => (
                    <div>
                        <UserInfo
                            avatarSrc={item.member.image}
                            name={item.member.name}
                            nameStyle={{ fontSize: "12px" }}
                            avatarSize={36}
                            Subline={
                                <SublineDesigWithTime
                                    designation={item.member.designation ? item.member.designation : "Not Designated"}
                                    desgStyle={{ fontSize: "6px !import" }}
                                // time="2 days ago"
                                />
                            }
                        />
                        <Slider defaultValue={item.progress}
                            trackStyle={{ backgroundColor: "var(--primary_theme_color_green)" }}
                            handleStyle={{ borderColor: "var(--primary_theme_color_green)", backgroundColor: "var(--primary_theme_color_green)" }}
                        />
                    </div>
                ))
            }
        </div>
    )
}