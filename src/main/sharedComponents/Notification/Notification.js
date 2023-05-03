import { useState, useEffect, memo } from "react";
import { useSelector } from "react-redux";
import { getFeedById } from "../../features/feed/store/actions";
import { useDispatch } from "react-redux";
import CustomModal from "../CustomModal";
import { ActionType } from "../CustomModal";
import { useNavigate } from "react-router-dom";
import PostModalContent from "../CustomModal/ModalContent";
import { openNotification } from "./notificationHelper";

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
  }, [notification]);

  useEffect(() => {
    setModalContent(<PostModalContent singlePost={singlePost} />);
  }, [singlePost]);

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

export default memo(MainNotification);
