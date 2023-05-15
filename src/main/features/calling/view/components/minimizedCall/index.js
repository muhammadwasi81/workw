import React, { useState, useCallback } from 'react'
import { Button } from 'antd'
import { DraggableModal, DraggableModalProvider } from 'ant-design-draggable-modal'
import 'ant-design-draggable-modal/dist/index.css'
import MadalHeader from './madalHeader'

const CallPreviewModal = ({ previewItem, handleClose = () => { }, isMinimizedModal = false }) => (
    <DraggableModalProvider>
        <DraggableModal visible={!!previewItem} onCancel={handleClose} footer={null} className="resizable-modal" closeIcon={<></>} initialHeight={500} destroyOnClose={false}> 
            <div className="ModalInner">
                <MadalHeader
                    title={previewItem?.name || "Ongoing Call"}
                    document={previewItem}
                    handleClose={handleClose}
                    isMinimizedModal={isMinimizedModal}
                    isCalling={true}
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
        </DraggableModal>
    </DraggableModalProvider>
)
export default CallPreviewModal;