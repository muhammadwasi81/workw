import { Modal } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import MadalHeader from "./madalHeader";
import "../../../../documents/view/components/modal/style.css"
import { toggleCallWindow } from "../../../store/slice";

function CallPreviewModal({ previewItem, handleClose = () => { }, isMinimizedModal = false }) {
    const [confirmLoading, setConfirmLoading] = useState(false);
    const dispatch = useDispatch();

    const handleCancel = () => {
        if (isMinimizedModal) {
            dispatch(toggleCallWindow(false))
        } else {
            handleClose()
        }
    }

    return (
        <>
            <Modal
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
            >
                <div className="ModalInner">
                    <MadalHeader
                        title={previewItem?.name || "Ongoing Call"}
                        document={previewItem}
                        handleClose={handleClose}
                        isMinimizedModal={isMinimizedModal}
                    />
                    <div className="doc-modal-content" >
                        <iframe
                            className="!block h-full w-full"
                            style={{ display: "block !important" }}
                            src={previewItem?.path} title="description"
                            frameBorder='0'
                            allow="camera;microphone"
                        ></iframe>
                    </div>
                </div>
            </Modal>
        </>
    );
}

export default CallPreviewModal;