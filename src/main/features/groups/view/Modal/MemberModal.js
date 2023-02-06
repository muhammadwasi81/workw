import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { message, Modal, Form } from "antd";
import { useSelector } from "react-redux";
import CustomSelect from "../../../../sharedComponents/AntdCustomSelects/SharedSelects/MemberSelect";
import ApproverListItem from "../../../../sharedComponents/AppComponents/Approvals/components/approverList";
import {
  getAllGroupMemberAction,
  addGroupMemberAction,
} from "../../store/actions";
import { addMember, deleteGroupMember } from "../../store/slice";
import Avatar from "../../../../sharedComponents/Avatar/avatarOLD";
import { getAllEmployees } from "../../../../../utils/Shared/store/actions";
import { deleteGroupMemberAction } from "../../store/actions";
import { useParams } from "react-router-dom";

function MemberModal({ isOpen = false, data }) {
  console.log(data, "memberss data");
  const dispatch = useDispatch();
  const modalRequest = useSelector((state) => state.groupSlice.addMemberModal);
  const employees = useSelector((state) => state.sharedSlice.employees);
  const [firstTimeEmpData, setFirstTimeEmpData] = useState([]);
  const [isFirstTimeDataLoaded, setIsFirstTimeDataLoaded] = useState(false);
  const [value, setValue] = useState([]);
  const params = useParams();
  const { groupDetailid } = params;
  console.log(groupDetailid, "iddd");
  console.log(data, "sss");
  let ModalOpen = modalRequest.status;

  useEffect(() => {
    fetchEmployees("", 0);
  }, []);

  const fetchEmployees = (text, pgNo) => {
    dispatch(getAllEmployees({ text, pgNo, pgSize: 20 }));
  };

  const handleClose = () => {
    dispatch(addMember(false));
  };

  const handleChange = (myid) => {
    let memberId = myid.toString();
    const members = {
      id: data.id,
      memberId: memberId,
    };
    dispatch(addGroupMemberAction(members));
  };

  useEffect(() => {
    if (employees.length > 0 && !isFirstTimeDataLoaded) {
      setIsFirstTimeDataLoaded(true);
      setFirstTimeEmpData(employees);
    }
  }, [employees]);

  const handleDeleteMember = (myid) => {
    const memberId = myid.toString();
    const delmembers = {
      id: data.id || groupDetailid,
      memberId: memberId,
    };

    dispatch(deleteGroupMemberAction(delmembers));
  };
  return (
    <Modal
      open={ModalOpen}
      onOk={(e) => {}}
      onCancel={handleClose}
      footer={false}
      closeIcon={<div />}
      className="ApproverModal"
      width={"360px"}
      destroyOnClose={true}
    >
      <CustomSelect
        style={{ marginBottom: "0px" }}
        data={firstTimeEmpData}
        selectedData={handleChange}
        canFetchNow={isFirstTimeDataLoaded}
        fetchData={fetchEmployees}
        placeholder={"Select Member"}
        isObject={true}
        loadDefaultData={false}
        optionComponent={(opt) => {
          return (
            <>
              <Avatar
                name={opt.name}
                src={opt.image}
                round={true}
                width={"30px"}
                height={"30px"}
              />
              {opt.name}
            </>
          );
        }}
        dataVal={value}
        name="members"
        showSearch={true}
        resetField={true}
        // direction={Direction}
        rules={[
          {
            required: true,
            message: "Please Select Member",
          },
        ]}
      />
      <ApproverListItem
        className="AddMemberModal"
        data={data?.members}
        handleDelete={handleDeleteMember}
      />
    </Modal>
  );
}

export default MemberModal;
