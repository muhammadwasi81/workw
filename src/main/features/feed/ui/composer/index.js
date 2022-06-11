import React from "react";
import "./stylesheet/FeedCompose.css";
import frameIcon from "../../../../../content/NewContent/NewsFeed/svg/image.svg";
import penIcon from "../../../../../content/NewContent/NewsFeed/svg/pen.svg";
import chartIcon from "../../../../../content/NewContent/NewsFeed/svg/chart.svg";
import Avatar from "../../../../sharedComponents/Avatar/avatarOLD";
import PostHeader from "./views/PostHeader";
import ComposerForm from "./views/ComposerForm";
import CModal from "../../../../sharedComponents/CModal/CModal";
import store from "../../../../../store/store";
import {feedSlice} from "../../store/slice";
import {useSelector} from "react-redux";

function PostComposer() {
    const {showComposer} = useSelector((state) => state.feedSlice.postCompose)

    const toggleComposer = (visibility) => {
        store.dispatch(feedSlice.actions.toggleComposerVisibility({visibility}))
    }

    return (
        <>
            <div className="newsComposer">
                <div className="composer">
                    <div className="user">
                        <Avatar
                            src="https://konnect.im/upload/2021/3/5325454b-1c5d-40f1-b95d-df0fad2d4da9.jpeg"
                            className="addPostAvatar"
                            name={"AbuBakar"}
                            width={44}
                            height={44}
                            round={true}
                        />
                        <div className="name">
                            <span>AbuBakar</span>
                        </div>
                    </div>
                    <div className="text-area" onClick={() => toggleComposer(true)}>
                        What’s on your mind?
                    </div>
                    <div className="feedIcons" style={{display: "flex"}}>
                        <img src={frameIcon} alt=""/>
                        <img src={penIcon} alt=""/>
                        <img src={chartIcon} alt=""/>
                    </div>
                </div>
                <span className="area-block"/>
            </div>
            <CModal width={800} show={showComposer} onClose={() => toggleComposer(false)}>
                <div className="composer-wrapper">
                    <PostHeader/>
                    <ComposerForm/>
                </div>
            </CModal>
        </>
    );
}

export default PostComposer;
