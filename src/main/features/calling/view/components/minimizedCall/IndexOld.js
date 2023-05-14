import { Modal } from "antd";
import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import MadalHeader from "./madalHeader";
import "../../../../documents/view/components/modal/style.css"
import { toggleCallWindow } from "../../../store/slice";
import Draggable from "react-draggable";

function CallPreviewModal({ previewItem, handleClose = () => { }, isMinimizedModal = false }) {
    const [confirmLoading, setConfirmLoading] = useState(false);
    const dispatch = useDispatch();
    const [disabled, setDisabled] = useState(false);
    const [bounds, setBounds] = useState({ left: 0, top: 0, bottom: 0, right: 0 });
    const draggleRef = useRef(null);

    const handleCancel = () => {
        if (isMinimizedModal) {
            dispatch(toggleCallWindow(false))
        } else {
            handleClose()
        }
    }
    const onStart = (_event, uiData) => {
        const { clientWidth, clientHeight } = window.document.documentElement;
        const targetRect = draggleRef.current?.getBoundingClientRect();
        if (!targetRect) {
            return;
        }
        setBounds({
            left: -targetRect.left + uiData.x,
            right: clientWidth - (targetRect.right - uiData.x),
            top: -targetRect.top + uiData.y,
            bottom: clientHeight - (targetRect.bottom - uiData.y),
        });
    };

    return (
        <>
            <Modal
                className="DocumentModal CallingModal"
                visible={!!previewItem}
                okText="done"
                width={900}
                mask={false}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                destroyOnClose={!isMinimizedModal}
                closeIcon={<></>}
                style={{
                    top: 20,
                }}
                modalRender={(modal) => (
                    <Draggable
                        // disabled={disabled}
                        bounds={bounds}
                        onStart={(event, uiData) => onStart(event, uiData)}
                        disabled={window.innerWidth < 800}
                    >
                        <div ref={draggleRef}>{modal}</div>
                    </Draggable>
                )}
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
                            src={previewItem?.callUrl} title="description"
                            frameBorder='0'
                            allow="camera; microphone; clipboard-read; clipboard-write"
                        ></iframe>
                    </div>
                </div>
            </Modal>
        </>
    );
}

export default CallPreviewModal;