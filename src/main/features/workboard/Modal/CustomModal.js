import React from "react";
import { Modal } from "antd";

function CustomModal({
  title,
  isModalVisible,
  children,
  centered,
  footer,
  destroyOnClose = true,
  onCancel,
  width,
  className,
  closable,
}) {
  return (
    <Modal
      title={title}
      visible={isModalVisible}
      centered={centered}
      footer={footer}
      destroyOnClose={destroyOnClose}
      onCancel={onCancel}
      width={width}
      className={className}
      closable={closable}
    >
      {children}
    </Modal>
  );
}

export default CustomModal;
