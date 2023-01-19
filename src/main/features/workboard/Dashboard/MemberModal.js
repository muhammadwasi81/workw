import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { message, Modal } from "antd";
import { useSelector } from "react-redux";
import CustomSelect from "../../../sharedComponents/AntdCustomSelects/SharedSelects/MemberSelect";
import ApproverListItem from "../../../sharedComponents/AppComponents/Approvals/components/approverList";

import { useParams } from "react-router-dom";
import { addMember } from "../store/slice";
import Avatar from "../../../sharedComponents/Avatar/avatarOLD";
import { getAllEmployees } from "../../../../utils/Shared/store/actions";
import { getWorkBoardMemberAction, addWorkBoardMember } from "../store/action";
import { NoDataFound } from "./index";

function MemberModal({ isOpen = false }) {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.userSlice.user.id);
  const modalRequest = useSelector((state) => state.trelloSlice.addMemberModal);
  const { workBoardMembers } = useSelector((state) => state.trelloSlice);
  const employees = useSelector((state) => state.sharedSlice.employees);
  const [firstTimeEmpData, setFirstTimeEmpData] = useState([]);
  const [isFirstTimeDataLoaded, setIsFirstTimeDataLoaded] = useState(false);
  const [value, setValue] = useState([]);

  let ModalOpen = modalRequest.status;
  let type = modalRequest.memberType;

  useEffect(() => {
    ModalOpen && dispatch(getWorkBoardMemberAction(userId));
    // dispatch(getWorkBoardMemberAction(userId));
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
    console.log(memberId, "memberIddd");
    const data = {
      id: userId,
      memberId: memberId,
      memberType: type,
    };
    console.log(type, "memberType");
    dispatch(addWorkBoardMember(data));
    dispatch(getWorkBoardMemberAction(userId));
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
      {workBoardMembers?.length > 0 ? (
        <ApproverListItem className="AddMemberModal" data={workBoardMembers} />
      ) : (
        <NoDataFound />
      )}
    </Modal>
  );
}

export default MemberModal;
