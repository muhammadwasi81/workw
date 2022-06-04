import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from '../../../../SharedComponent/Avatar/avatar';
import starIcon from '../../../../../content/NewContent/NewsFeed/svg/starFill.svg';
import publicIcon from '../../../../../content/NewContent/NewsFeed/svg/public.svg';
// import HeadingNew from '@bit/aqibmemon01.button.heading-new';

const PostHeader = () => {
    let TempfeedTaggeds = [1,2]
    return (
           <div className="post-header">
               {/*<HeadingNew />*/}
                    <div className="top-det">
                        <Avatar
                            src={"https://konnect.im/upload/2021/3/5325454b-1c5d-40f1-b95d-df0fad2d4da9.jpeg"}
                            name={"https://konnect.im/upload/2021/3/5325454b-1c5d-40f1-b95d-df0fad2d4da9.jpeg"}
                            width={44}
                            height={44}
                            round={true}
                        />
                        <div className="user-det">
                            <div className="name">
                                <span><Link
                                    to={``}>{"AbuBakar Memon"}</Link></span>
                                    {/* Taged Users */}
                                {TempfeedTaggeds > 0 && (
                                    <React.Fragment>
                                        &ensp;with&ensp;
                                        {/* <span>
                                            <Link
                                            to={`${STRINGS.ROUTES.USER.TIMELINE.DEFAULT}/${feedTaggeds[0].user.id}`}>{feedTaggeds[0].user.name}</Link></span> */}
                                        {TempfeedTaggeds > 1 && (
                                            <React.Fragment>
                                                &ensp;and&ensp;
                                                <span>{TempfeedTaggeds.length > 2
                                                    ? `${TempfeedTaggeds.length - 1} Others`
                                                    : <Link
                                                        // to={`${STRINGS.ROUTES.USER.TIMELINE.DEFAULT}/${TempfeedTaggeds[1].user.id}`}
                                                        >
                                                            Abu Bakar </Link>}</span>
                                            </React.Fragment>
                                        )}
                                    </React.Fragment>
                                )}
                            </div>
                            <div className="dtp">
                                <div className="d">{"React Developer"}&nbsp;&#9679;</div>
                                <div
                                    className="t">{
                                        // parseDateAndTime(feed_datetime, 'short')}
                                        "2 day ago"}
                                    &nbsp;&#9679;</div>
                                <div className="p">
                                    <img src={2 === 1 ? publicIcon : publicIcon}
                                                        alt="#"/></div>
                            </div>
                        </div>
                    </div>
                    <div className="pinned-post">
                        {/* isPined Post */}
                        {true ?
                            <img alt="#" src={starIcon} onClick={() => this.markPinnedPost(false)}/> :
                            <img alt="#" src={starIcon} onClick={() => this.markPinnedPost(true)}/>
                        }
                    </div>
                </div>
    );
};

export default PostHeader;