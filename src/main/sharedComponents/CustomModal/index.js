import { useEffect, memo } from "react";
import { Modal } from "antd";
import propTypes from "prop-types";
import { useNavigate } from "react-router-dom";

export const ActionType = {
  OPEN_MODAL: "OPEN_MODAL",
  REDIRECT: "REDIRECT",
};
const CustomModal = ({
  visible,
  onCancel,
  onOk,
  actionType,
  actionData,
  content,
}) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (actionType === ActionType.REDIRECT && actionData) {
      navigate(actionData.path);
    }
  }, [actionType, actionData, navigate]);
  return (
    <>
      {actionType === ActionType.OPEN_MODAL && (
        <Modal
          visible={visible}
          onCancel={onCancel}
          onOk={onOk}
          footer={null}
          closable={false}
          mask={false}
          style={{
            top: 20,
            borderRadius: "27px",
            paddingBottom: "13px",
          }}
        >
          {actionType === ActionType.OPEN_MODAL && content}
        </Modal>
      )}
    </>
  );
};

CustomModal.propTypes = {
  visible: propTypes.bool,
  onCancel: propTypes.func,
  onOk: propTypes.func,
  actionType: propTypes.string,
  actionData: propTypes.object,
  content: propTypes.object,
};

export default memo(CustomModal);
