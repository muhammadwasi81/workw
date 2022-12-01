import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createGuid } from "../../../../../../../utils/base";
import { Button, Modal } from "antd";
import { useSelector } from "react-redux";
import { getAllEmployees } from "../../../../../employee/store/actions";
import Avatar from "../../../../../../sharedComponents/Avatar/avatarOLD";
import MemberSelect from "../../../../../../sharedComponents/AntdCustomSelects/SharedSelects/MemberSelect";
import { sendChatMessage, sharePostOnChat } from "../../../../../Messenger/store/actions";

function PostShareModal({
    isOpen = false,
    shareType = "",
    handleCancel,
    postId=""
}) {
    const dispatch = useDispatch();
    const employees = useSelector((state) => state.sharedSlice.employees);
    const [firstTimeEmpData, setFirstTimeEmpData] = useState([]);
    const [isFirstTimeDataLoaded, setIsFirstTimeDataLoaded] = useState(false);
    const [value, setValue] = useState([]);

    const handleShareOnChat = () => {
        let payload = {
            // chatId: chatId,
            members: value.map((mem) => {
                return {
                    memberId: mem,
                };
            }),
            message: `${window.location.href}newsFeedDetails/${postId}`,
            id: createGuid(),
            messageType: 1,
            attachments: []
        };
        dispatch(sharePostOnChat(payload));
        setValue([]);
        handleCancel();
    }
    const handleShareOnFeed = () => {
    }
    const handleChange = (e) => {
        setValue(e);
    };
    const handleShare = () => {
        if (shareType === "Chat")
            handleShareOnChat();
        else if (shareType === "Feed")
            handleShareOnFeed();
    };
    const fetchEmployees = (text, pgNo) => {
        dispatch(
            getAllEmployees({
                text,
                pgNo,
                pgSize: 20,
            })
        );
    };
    useEffect(() => {
        if (employees.length > 0 && !isFirstTimeDataLoaded) {
            setIsFirstTimeDataLoaded(true);
            setFirstTimeEmpData(employees);
        }
    }, [employees]);

    useEffect(() => {
        fetchEmployees('', 0);
    }, []);
    console.log(value)
    return (
        <Modal
            open={isOpen}
            onOk={(e) => { }}
            onCancel={handleCancel}
            footer={false}
            closeIcon={<div />}
            className="ApproverModal"
            width={"360px"}
            destroyOnClose={true}
        >

            <MemberSelect
                style={{ marginBottom: '0px' }}
                data={firstTimeEmpData}
                selectedData={handleChange}
                canFetchNow={isFirstTimeDataLoaded}
                fetchData={fetchEmployees}
                placeholder={"Select Employee"}
                // mode={'multiple'}
                isObject={true}
                loadDefaultData={false}
                // onChange={handleChange}
                optionComponent={(opt) => {
                    return (
                        <>
                            <Avatar
                                name={opt.name}
                                src={opt.image}
                                round={true}
                                width={'30px'}
                                height={'30px'}
                            />
                            {opt.name}
                        </>
                    );
                }}
                dataVal={value}
                name="approvers"
                showSearch={true}
            />
            <Button className="sharePostBtn drawerBtn" onClick={handleShare}>
                Share Now
            </Button>

        </Modal>
    );
}

export default PostShareModal;