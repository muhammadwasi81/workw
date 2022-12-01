import React from "react";
import { useDispatch } from "react-redux";
import { createGuid } from "../../../../../../../utils/base";
import { Modal } from "antd";

function PostShareModal({
    isOpen = false,
    shareType = "",
    handleCancel
}) {
    const dispatch = useDispatch();
    const handleShareOnChat = () => {
        let payload = {
            // chatId: chatId,
            members: [].map((mem) => {
                return {
                    memberId: mem.id,
                };
            }),
            message: "Shareeee",
            id: createGuid(),
            messageType: 1,
            attachments: []
        };
        console.log(payload, "payload")
        dispatch()
    }
    const handleShareOnFeed = () => {

    }
    return (
        <Modal
            open={isOpen}
            onOk={(e) => { }}
            onCancel={handleCancel}
            footer={false}
            closeIcon={<div />}
            className="ApproverModal"
            width={"360px"}
        >
            
        </Modal>
    );
}

export default PostShareModal;