import React from "react";
import { Modal } from "antd";
import "./CModal.css";

const CModal = (props) => {
  const {
    show,
    onClose,
    children,
    title,
    footer = false,
    onCancel,
    width,
  } = props;

  return (
    <Modal
      className="c-modal"
      footer={footer}
      width={width}
      title={title}
      visible={show}
      onCancel={onClose}>
      {children}
    </Modal>
  );
};

export default CModal;
