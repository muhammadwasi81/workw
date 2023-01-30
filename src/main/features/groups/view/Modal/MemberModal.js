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
import { useParams } from "react-router-dom";
import { addMember, deleteGroupMember } from "../../store/slice";
import Avatar from "../../../../sharedComponents/Avatar/avatarOLD";
import { getAllEmployees } from "../../../../../utils/Shared/store/actions";
import { deleteGroupMemberAction } from "../../store/actions";

function MemberModal({ isOpen = false }) {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.userSlice.user.id);
  const { memberData, success } = useSelector((state) => state.groupSlice);
  const modalRequest = useSelector((state) => state.groupSlice.addMemberModal);
  const employees = useSelector((state) => state.sharedSlice.employees);
  const [firstTimeEmpData, setFirstTimeEmpData] = useState([]);
  const [isFirstTimeDataLoaded, setIsFirstTimeDataLoaded] = useState(false);
  const [value, setValue] = useState([]);
  const [form] = Form.useForm();

  let ModalOpen = modalRequest.status;
  let Type = modalRequest.type;

  // console.log(Type, "TYPE !!");

  useEffect(() => {
    ModalOpen && dispatch(getAllGroupMemberAction(userId));
  }, [ModalOpen]);

  useEffect(() => {
    fetchEmployees("", 0);
  }, []);

  const fetchEmployees = (text, pgNo) => {
    dispatch(getAllEmployees({ text, pgNo, pgSize: 20 }));
  };

  const handleClose = () => {
    dispatch(addMember(false));
  };

  const handleChange = (id) => {
    let memberId = id.toString();
    const data = {
      id: userId,
      memberId: memberId,
    };
    dispatch(addGroupMemberAction(data));
    dispatch(getAllGroupMemberAction(userId));
  };

  useEffect(() => {
    if (employees.length > 0 && !isFirstTimeDataLoaded) {
      setIsFirstTimeDataLoaded(true);
      setFirstTimeEmpData(employees);
    }
  }, [employees]);

  const [newState, setNewState] = useState({
    members: [],
    memberType: null,
  });

  const handleDeleteMember = (id) => {
    const memberId = id.toString();
    const data = {
      id: userId,
      memberId: memberId,
    };

    dispatch(deleteGroupMemberAction(data));
    dispatch(deleteGroupMember(userId));
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
        data={memberData}
        handleDelete={handleDeleteMember}
      />
    </Modal>
  );
}

export default MemberModal;
