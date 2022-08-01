import { Modal } from "antd";
import React, { useEffect, useState } from "react";

function PreviewModal({ id, open, setModelState, leftComponent }) {
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('Content of the modal');

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setVisible(false);
  };

  const handleOk = () => {
    setModalText('The modal will be closed after two seconds');
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };

  return (
    <>
      <Modal
        title="Title"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        {
          <img src={path} />
        }
      </Modal>
    </>
  );
}

export default PreviewModal;
