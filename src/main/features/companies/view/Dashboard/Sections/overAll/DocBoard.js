import React from 'react';
import docIcon from "../../../../../../../content/svg/menu/newNavBarIcon/Docs-Archives.svg";
import ic_plain_text from "../../../../../../../content/svg/doc/Milepad.svg";
import gridfile from '../../../../../../../content/svg/doc/MileGrid.svg';
import whiteBoardfile from '../../../../../../../content/svg/doc/board.svg';
import WhiteCard from '../../../../UI/WhiteCard';
import mileSlidefile from '../../../../../../../content/svg/doc/mile-presentation.svg';

const DocBoard = ({ item }) => {
    let { total, mileboard, milegrid, milepad, mileslide, otherDocument } = item;
    return (
        <div className="c-dash-item">
            <WhiteCard className='myPaper'>
                <div className='docItem' >
                    <div className='totalUsers'>
                        <img src={docIcon} className="userIcon" />
                        <div>{total} Documents Managed</div>
                    </div>
                    <div className='otherUsers'>
                        <div className='otherUser userGreen'>
                            <img src={ic_plain_text} className="userIcon" />
                            <div>{milepad} Milepad</div>
                        </div>
                        <div className='otherUser userGrey'>
                            <img src={gridfile} className="userIcon" />
                            <div>{milegrid} Milegrid</div>
                        </div>
                        <div className='otherUser userRed'>
                            <img src={whiteBoardfile} className="userIcon" />
                            <div>{mileboard} Mileboard</div>
                        </div>
                        <div className='otherUser userYellow'>
                            <img src={mileSlidefile} className="userIcon" />
                            <div>{mileslide} Mileslide</div>
                        </div>
                        <div className='otherUser'>
                            <img src={docIcon} className="userIcon" />
                            <div>{otherDocument} Others</div>
                        </div>
                    </div>
                </div>
            </WhiteCard>
        </div>
    )
}
export default DocBoard;