import { Modal } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { DOCUMENT_ENUM } from "../../../constant";
import { toggleMinimizeDocument } from "../../../store/slice";
import MadalHeader from "./madalHeader";
import { DraggableModal } from 'ant-design-draggable-modal'
import "./style.css"

function PreviewModalResizable({ previewItem, handleClose = () => { }, isMinimizedModal = false }) {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const dispatch = useDispatch();

  const handleCancel = () => {
    if (isMinimizedModal) {
      dispatch(toggleMinimizeDocument({
        id: previewItem.id,
        status: false
      }))
    } else {
      handleClose()
    }
  }

  return (
    <>
      {/* <Modal
        className="DocumentModal"
        visible={!!previewItem}
        okText="done"
        width={1000}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        destroyOnClose={!isMinimizedModal}
        closeIcon={<></>}
        style={{
          top: 20,
        }}
      > */}
      <DraggableModal
        visible={!!previewItem}
        onCancel={handleClose}
        footer={null}
        className="DocumentModal resizable-modal black-resize-handle"
        closeIcon={<></>}
        initialHeight={500}
        destroyOnClose={!isMinimizedModal}>

        <div className="ModalInner">
          <MadalHeader
            title={previewItem?.name || ""}
            document={previewItem}
            handleClose={handleClose}
            isMinimizedModal={isMinimizedModal}
          />
          <div className="doc-modal-content" >
            {
              previewItem?.documentType === DOCUMENT_ENUM.DUCOMENT_TYPE.image ?
                <img src={previewItem?.path} /> :
                previewItem?.documentType === DOCUMENT_ENUM.DUCOMENT_TYPE.video ?
                  <video style={{ height: "100%" }}
                    controls
                    autoPlay
                    controlsList="nodownload"
                  >
                    <source src={previewItem?.path + "#t=0.5"} />
                  </video>
                  :
                  <iframe
                    className="!block h-full w-full"
                    style={{ display: "block !important" }}
                    src={previewItem?.path} title="description"
                    frameBorder='0'
                  ></iframe>
            }
          </div>
        </div>
      </DraggableModal>
      {/* </Modal> */}
    </>
  );
}

export default PreviewModalResizable;