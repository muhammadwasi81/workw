import { Modal } from "antd";
import React, { useEffect, useState } from "react";
import { DOCUMENT_ENUM } from "../../../constant";

function PreviewModal({ previewItem, handleClose = () => { } }) {
  // const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('Content of the modal');

  const handleCancel = () => {
    handleClose()
  };

  const handleOk = () => {
    handleClose()
  };

  return (
    <>
      <Modal
        title="Title"
        visible={!!previewItem}
        onOk={handleOk}
        okText="done"
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        {
          previewItem?.documentType === DOCUMENT_ENUM.DUCOMENT_TYPE.image ?
            <img src={previewItem?.path} /> :
            (previewItem?.documentType === DOCUMENT_ENUM.DUCOMENT_TYPE.draw || previewItem?.documentType === DOCUMENT_ENUM.DUCOMENT_TYPE.grid ||
              previewItem?.documentType === DOCUMENT_ENUM.DUCOMENT_TYPE.pad || previewItem?.documentType === DOCUMENT_ENUM.DUCOMENT_TYPE.show)
              ? 
              <iframe 
              className="!block"
              style={{display:"block !important"}}
              src={previewItem?.path} title="description"
              width='500px'
              height='500px' frameBorder='0'></iframe>

              
              : ""
        }
      </Modal>
    </>
  );
}

export default PreviewModal;
