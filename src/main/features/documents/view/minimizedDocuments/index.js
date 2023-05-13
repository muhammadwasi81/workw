import React from "react";
import { useSelector } from "react-redux";
import MinimizedItem from "./minimizedItem";
import { DraggableModal, DraggableModalProvider } from 'ant-design-draggable-modal'
import './style.css';

function MinimizedDocuments() {
    const documents = useSelector((state) => state.documentSlice.minimzedDocuments);
    return (
        <div className="minimized-document-container" >
            <DraggableModalProvider>
                {
                    documents.map((item) => {
                        return (
                            <MinimizedItem item={item} />
                        )
                    })
                }
            </DraggableModalProvider>
        </div>
    )
}
export default MinimizedDocuments;