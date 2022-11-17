import React, { useEffect } from "react";
import { Modal } from "antd";

const ModalTag = ({ showModal, handleCancel, data }) => {
  useEffect(() => {
    //TODO: call api according to the data like prev appraisals, warnings etc
    console.log("useEffect works on component mount");
  }, []);

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
