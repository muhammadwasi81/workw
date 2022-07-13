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
import { feedSlice } from "../../store/slice";
import { useSelector } from "react-redux";
import { ConsoleLogger } from "@microsoft/signalr/dist/esm/Utils";
import { Modal } from "antd";

function PostComposer() {
  const { showComposer } = useSelector((state) => state.feedSlice.postCompose);
  const { userSlice } = useSelector((state) => state);
  const { name, userImage } = userSlice.user;
  const toggleComposer = (visibility) => {
    store.dispatch(feedSlice.actions.toggleComposerVisibility({ visibility }));
  };

  return (
    <>
      <div className="newsComposer">
        <div className="composer">
          <div className="user">
            <Avatar
              src={userImage}
              className="addPostAvatar"
              name={name}
              width={44}
              height={44}
              round={true}
            />
            <div className="name">
              <span>{name}</span>
            </div>
          </div>
          <div className="text-area" onClick={() => toggleComposer(true)}>
            What’s on your mind?
          </div>
          <div className="feedIcons" style={{ display: "flex" }}>
            <img src={frameIcon} alt="" />
            <img src={penIcon} alt="" />
            <img src={chartIcon} alt="" />
          </div>
        </div>
        <span className="area-block" />
      </div>
      <Modal
        width={800}
        visible={showComposer}
        onCancel={() => toggleComposer(false)}
        destroyOnClose
        footer={null}
        header={null}
      >
        <div className="composer-wrapper">
          <PostHeader />
          <ComposerForm />
        </div>
      </Modal>
    </>
  );
}

export default PostComposer;
