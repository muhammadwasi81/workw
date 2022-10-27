import React from 'react';
import WhiteCard from '../../../../UI/WhiteCard';
import newsIcon from "../../../../../../../content/svg/menu/newNavBarIcon/News Feed.svg";

const PostsBoard = ({item}) => {
    let { total, lastDay, last30Day } = item;
    return (
        <div className="c-dash-item" >
            <WhiteCard className='myPaper' >
                <div className='postItem' >
                    <div className='totalPosts'>
                        <img src={newsIcon} className="userIcon" />
                        <div>{total} Posts Managed</div>
                    </div>
                    <div className='otherPosts'>
                        <div className='otherPost'>
                            <img src={newsIcon} className="userIcon" />
                            <div>{lastDay} Last Day</div>
                        </div>
                        <div className='otherPost'>
                            <img src={newsIcon} className="userIcon" />
                            <div>{last30Day} Last 30 Days</div>
                        </div>
                        {/* <div className='otherPost userYellow'>
                            <img src={taskIconYellow} className="userIcon" />
                            <div>5 Total Users</div>
                        </div> */}
                    </div>
                </div>
            </WhiteCard>
        </div>
    )
}
export default PostsBoard;