import { useState, useEffect } from "react";
import { notification } from "antd";
import { useSelector } from "react-redux";
import { CloseCircleOutlined } from "@ant-design/icons";
import messageTune from "../../../content/audio/messageTune.mp3";
import Avatar from "../../sharedComponents/Avatar/avatarOLD";
import { getFeedById } from "../../features/feed/store/actions";
import { useDispatch } from "react-redux";
import PostHeader from "../../features/feed/ui/posts_list/post/views/PostHeader";
import PostSection from "../../features/feed/ui/posts_list/post/views/PostSection";
import PostFooter from "../../features/feed/ui/posts_list/post/views/PostFooter";
import CustomModal from ".";
import { ActionType } from ".";
import { useNavigate } from "react-router-dom";

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

const openNotification = (options, setIsModalOpen, navigate) => {
  const {
    title = "",
    message = "",
    direction = "bottomLeft",
    duration = 20,
    onClick = () => {
      !message.toLowerCase().includes("online") && setIsModalOpen(true);
      if (message === "Group Created Successfully") {
        navigate(`/groups/${groupId}`);
        setIsModalOpen(false);
      }
      if (message === "Project Created Successfully") {
        navigate(`/projects/${projectId}`);
        setIsModalOpen(false);
      }
    },
    value = "",
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
    groupId,
    projectId,
  } = options;
  console.log(options, "options in notification.js file");

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
    groupId,
    value,
    projectId,
  });
  if (playSound) {
    const audio = new Audio(soundTune);
    audio.autoplay = true;
  }
};

const MainNotification = () => {
  const { notification } = useSelector((state) => state.sharedSlice);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { singlePost } = useSelector((state) => state.feedSlice);

  useEffect(() => {
    notification.referenceId && dispatch(getFeedById(notification.referenceId));
  }, [notification.referenceId, dispatch]);

  useEffect(() => {
    notification.message &&
      openNotification(notification, setIsModalOpen, navigate);
    setModalContent(
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
    );
  }, [notification, singlePost]);

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <CustomModal
        visible={isModalOpen}
        onCancel={closeModal}
        onOk={closeModal}
        actionType={ActionType.OPEN_MODAL}
        actionData={null}
        content={modalContent}
      />
    </>
  );
};

export default MainNotification;
