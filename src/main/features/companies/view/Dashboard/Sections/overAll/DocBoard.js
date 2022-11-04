import React from 'react';
import docIcon from "../../../../../../../content/svg/menu/newNavBarIcon/Docs-Archives.svg";
import ic_plain_text from "../../../../../../../content/svg/doc/Milepad.svg";
import gridfile from '../../../../../../../content/svg/doc/MileGrid.svg';
import whiteBoardfile from '../../../../../../../content/svg/doc/board.svg';
import WhiteCard from '../../../../UI/WhiteCard';
import mileSlidefile from '../../../../../../../content/svg/doc/mile-presentation.svg';

const DocBoard = ({ item }) => {
    let {
        total = 100,
        mileboard = 20,
        milegrid = 30,
        milepad = 15,
        mileslide = 20,
        otherDocument = 15
    } = item;
    return (
        <div className="c-dash-item">
            <WhiteCard className='myPaper'>
                <div className='docItem' >
                    <div className='totalUsers'>
                        <img src={docIcon} className="userIcon" />
                        <div className='dash-text'>{total} Documents Managed</div>
                    </div>
                    <div className='otherUsers'>
                        <div className='otherUser'>
                            <img src={ic_plain_text} className="userIcon" />
                            <div className='dash-text'>{milepad} Milepad</div>
                        </div>
                        <div className='otherUser'>
                            <img src={gridfile} className="userIcon" />
                            <div className='dash-text'>{milegrid} Milegrid</div>
                        </div>
                        <div className='otherUser'>
                            <img src={whiteBoardfile} className="userIcon" />
                            <div className='dash-text'>{mileboard} Mileboard</div>
                        </div>
                        <div className='otherUser'>
                            <img src={mileSlidefile} className="userIcon" />
                            <div className='dash-text'>{mileslide} Mileslide</div>
                        </div>
                        <div className='otherUser'>
                            <img src={docIcon} className="userIcon" />
                            <div className='dash-text'>{otherDocument} Others</div>
                        </div>
                    </div>
                </div>
            </WhiteCard>
        </div>
    )
}
export default DocBoard;