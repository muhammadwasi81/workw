import React, { useState } from 'react';
import { Button, Modal } from 'antd';

const FileViewerModal = ({ isOpen, onOk, viewItem, onCancel }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Modal
        centered
        open={isOpen}
        onOk={onOk}
        onCancel={onCancel}
        footer={false}
        width={"75%"}
      >
       	<object 
            data={viewItem}
            type="application/pdf"
            width="100%"
            height={"600px"}>
        </object>
      </Modal>
    </>
  );
};
export default FileViewerModal;