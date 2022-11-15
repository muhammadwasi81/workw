import React, { useState, useEffect } from "react";
import { Modal } from "antd";

const ModalTag = ({ showModal, handleCancel, data }) => {
  return (
    <>
      <Modal
        title={data}
        open={showModal}
        onCancel={handleCancel}
        footer={null}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
};

export default ModalTag;
