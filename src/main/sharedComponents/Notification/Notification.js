import React, { useEffect } from "react";
import { Modal, notification } from "antd";
import { useSelector } from "react-redux";
import { CloseCircleOutlined } from "@ant-design/icons";
import messageTune from "../../../content/audio/messageTune.mp3";
import Avatar from "../../sharedComponents/Avatar/avatarOLD";
import { getFeedById } from "../../features/feed/store/actions";
import { useDispatch } from "react-redux";
import PostHeader from "../../features/feed/ui/posts_list/post/views/PostHeader";
import PostSection from "../../features/feed/ui/posts_list/post/views/PostSection";
import PostFooter from "../../features/feed/ui/posts_list/post/views/PostFooter";

const getAvatar = (src, name) => {
  if (src || name) {
    return (
      <Avatar
        src={src}
        name={name || "Anonymous"}
        size={38}
        round={true}
        contStyle={{ marginTop: "-10px", marginLeft: "-10px" }}
      />
    );
  } else {
    return <></>;
  }
};

const openNotification = (options, setIsModalOpen) => {
  console.log(options, "options");
  const {
    title = "",
    message = "",
    direction = "bottomLeft",
    duration = 4,
    onClick = () => {
      !message.toLowerCase().includes("online") && setIsModalOpen(true);
    },
    className = "defaultNotification",
    style = {},
    closeIcon = (
      <CloseCircleOutlined
        twoToneColor="#fffff"
        style={{ fontSize: "20px", color: "white" }}
      />
    ),
    playSound = false,
    soundTune = messageTune,
    type,
    icon,
    avatarImage,
    avatarName,
    referenceId,
  } = options;
  console.log(referenceId, "referenceId in notification.js file");

  notification.open({
    message: title,
    description: message,
    placement: direction,
    duration,
    onClick,
    style,
    className:
      className +
      (type === "success"
        ? " !bg-[#4CAF50]"
        : type === "error"
        ? " !bg-[#f44336]"
        : ""),
    closeIcon,
    icon: icon || getAvatar(avatarImage, avatarName),
    referenceId,
  });
  if (playSound) {
    const audio = new Audio(soundTune);
    audio.autoplay = true;
  }
};

const MainNotification = () => {
  const { notification } = useSelector((state) => state.sharedSlice);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const dispatch = useDispatch();
  const { singlePost } = useSelector((state) => state.feedSlice);
  console.log(singlePost, "singlePost");
  console.log(notification, "notificationData");

  useEffect(() => {
    notification.referenceId && dispatch(getFeedById(notification.referenceId));
  }, [notification.referenceId]);

  useEffect(() => {
    notification.message && openNotification(notification, setIsModalOpen);
  }, [notification]);

  return (
    <>
      <Modal
        visible={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={() => setIsModalOpen(false)}
        footer={null}
        closable={false}
        style={{
          top: 20,
          borderRadius: "11px",
          paddingBottom: "13px",
        }}
      >
        <div className="post">
          <PostHeader
            id={singlePost.referenceId}
            privacyId={singlePost.privacyId}
            creator={singlePost.creator}
            isPinnedPost={singlePost.isPinnedPost}
            tags={singlePost.tags}
            createDate={singlePost.createDate}
          />
          <PostSection
            post={singlePost}
            attachments={singlePost.attachments}
            isOpen={false}
            id={singlePost.id}
            isDetail={{}}
          />
          <PostFooter
            isDetail={singlePost.isDetail}
            id={singlePost.id}
            comments={singlePost.comments}
            reactionCount={singlePost.reactionCount}
            commentCount={singlePost.commentCount}
            isOpen={singlePost.openModel}
            viewAllComments={singlePost.viewAllComments}
            attachments={singlePost.attachments}
            reactionModule={singlePost.reactionModule}
            referenceType={singlePost.referenceType}
            referenceId={singlePost.referenceId}
            isDetailViewOpen={singlePost.modelState}
            myReaction={singlePost.myReaction}
          />
        </div>
      </Modal>
    </>
  );
};

export default MainNotification;
