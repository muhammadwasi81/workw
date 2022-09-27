import React, { useContext } from "react";
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
import { Modal } from "antd";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";
import { FeedDictionary } from "../../localization";

function PostComposer({ referenceType, referenceId }) {
  const { showComposer } = useSelector((state) => state.feedSlice.postCompose);
  const { userSlice } = useSelector((state) => state);
  const { name, userImage } = userSlice.user;
  const { userLanguage } = useContext(LanguageChangeContext);
  const { composer, Direction } = FeedDictionary[userLanguage];
  const { Whatsonyourmind } = composer;
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
            {Whatsonyourmind}
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
        className={Direction}
        width={800}
        visible={showComposer}
        onCancel={() => toggleComposer(false)}
        destroyOnClose
        footer={null}
        header={null}
      >
        <div className="composer-wrapper" style={{ direction: Direction }}>
          <PostHeader />
          <ComposerForm
            referenceType={referenceType}
            referenceId={referenceId}
          />
        </div>
      </Modal>
    </>
  );
}

export default PostComposer;
