import React from "react";
import { Modal } from "antd";

const configureEmailAccount = (props) => {
  return (
    <div>
      <Modal
        title="My Modal"
        visible={props.isModalVisible}
        onOk={props.handleOk}
        onCancel={props.handleCancel}
      >
        <p>Modal content goes here.</p>
      </Modal>
    </div>
  );
};

export default configureEmailAccount;
