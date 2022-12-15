import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Modal } from "antd";
import { useSelector } from "react-redux";
import Avatar from "../../../../../../sharedComponents/Avatar/avatarOLD";
import MemberSelect from "../../../../../../sharedComponents/AntdCustomSelects/SharedSelects/MemberSelect";
import { getAllEmployees } from "../../../../../../../utils/Shared/store/actions";

function FolderMemberUpdate({
    isOpen = false,
    handleClose = () => { },
}) {
    const dispatch = useDispatch();
    const employees = useSelector((state) => state.sharedSlice.employees);
    const composerState = useSelector(state => state.documentSlice.composersInitState.updateMembers);
    const [firstTimeEmpData, setFirstTimeEmpData] = useState([]);
    const [isFirstTimeDataLoaded, setIsFirstTimeDataLoaded] = useState(false);
    const [value, setValue] = useState([]);

    const handleChange = (e) => {
        console.log(e);
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
        isOpen && fetchEmployees('', 0);
    }, [isOpen]);
    return (
        <Modal
            open={isOpen}
            onOk={(e) => { }}
            onCancel={handleClose}
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
                name="readers"
                showSearch={true}
            />
            {
                composerState?.members?.map((item) =>{
                    return <div>
                        saas
                    </div>
                })
            }
        </Modal>
    );
}

export default FolderMemberUpdate;