import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { message, Modal } from "antd";
import { useSelector } from "react-redux";
import CustomSelect from "../../../sharedComponents/AntdCustomSelects/SharedSelects/MemberSelect";
import ApproverListItem from "../../../sharedComponents/AppComponents/Approvals/components/approverList";

import { useParams } from "react-router-dom";
import Avatar from "../../../sharedComponents/Avatar/avatarOLD";
import { getAllEmployees } from "../../../../utils/Shared/store/actions";
import { addMember, deleteProjectMember } from "../store/slice";
import {
  addProjectMemberAction,
  deleteProjectMemberAction,
} from "../store/actions";

function MemberModal({ isOpen = false, data }) {
  const dispatch = useDispatch();

  const employees = useSelector((state) => state.sharedSlice.employees);
  const [firstTimeEmpData, setFirstTimeEmpData] = useState([]);
  const [isFirstTimeDataLoaded, setIsFirstTimeDataLoaded] = useState(false);
  const [value, setValue] = useState([]);
  const modalRequest = useSelector(
    (state) => state.projectSlice.addMemberModal
  );

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

  const handleChange = (id) => {
    let memberId = id.toString();
    const members = {
      id: data.id,
      memberId: memberId,
    };
    dispatch(addProjectMemberAction(members));
  };

  useEffect(() => {
    if (employees.length > 0 && !isFirstTimeDataLoaded) {
      setIsFirstTimeDataLoaded(true);
      setFirstTimeEmpData(employees);
    }
  }, [employees]);

  const handleMemberDelete = (id) => {
    const memberId = id.toString();
    const members = {
      id: data.id,
      memberId: memberId,
    };
    dispatch(deleteProjectMemberAction(members));
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
        // direction={Direction}
        rules={[
          {
            required: true,
            message: "Please Select Member",
          },
        ]}
      />
      {/* {memberData?.length > 0 ? ( */}
      <ApproverListItem
        className="AddMemberModal"
        data={data.members}
        handleDelete={handleMemberDelete}
      />
      {/* ) : (
        "No data"
      )} */}
    </Modal>
  );
}

export default MemberModal;
