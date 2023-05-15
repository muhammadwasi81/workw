import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { message, Modal } from "antd";
import { useSelector } from "react-redux";
import CustomSelect from "../../../sharedComponents/AntdCustomSelects/SharedSelects/MemberSelect";
import ApproverListItem from "../../../sharedComponents/AppComponents/Approvals/components/approverList";
import 
{
  addWorkBoardTodoMemberAction,
  removeToDoMemebr,
  addCustomTagMember,
  addCustomTag
} from "../store/action";

import { getAllCustomTagMember } from "../store/action";

import { NoDataFound } from "../../workboard/Dashboard";
import { useParams } from "react-router-dom";
import { addMember } from "../store/slice";
import Avatar from "../../../sharedComponents/Avatar/avatarOLD";
import { getAllEmployees } from "../../../../utils/Shared/store/actions";
//import { deleteLeadManagerMember } from "../../store/slice";

function MemberModal({ isOpen = false, data }) {
  console.log(data, "dataaaaaa")
  const dispatch = useDispatch();

  const modalRequest = useSelector((state) => state.customTagSlice.addMemberModal);
  
  console.log(modalRequest,"modalRequest");
  const employees = useSelector((state) => state.sharedSlice.employees);
  const [firstTimeEmpData, setFirstTimeEmpData] = useState([]);
  const [isFirstTimeDataLoaded, setIsFirstTimeDataLoaded] = useState(false);
  const [value, setValue] = useState([]);

  let ModalOpen = modalRequest.status;

  // useEffect(() => {
  //   getAllCustomTagMember(data.id);
  // }, []);

  useEffect(() => {
    fetchEmployees("", 0);
  }, []);

  const fetchEmployees = (text, pgNo) => {
   dispatch(getAllEmployees({ text, pgNo, pgSize: 20 }));
  };

  const handleClose = () => {
    dispatch(addMember(false));
  };
  console.log(data, 'dataiud')
  
  const handleChange = (myId) => {
    console.log(myId,"myIddd");
    let memberId = myId.toString();
    const membersData = {
      // referenceId: data.id,
      id: data[2].id,
      memberId: memberId,
    };
   console.log(membersData, "payloaddata")
    dispatch(addCustomTagMember(membersData));
   

    // let a = data.member.filter((item) => {
    //   return item.member.id === membersData.memberId;
    // });
    // let b = a[0] ? a[0].memberId : "";
    // if (membersData.memberId === b) {
    //   return message.error("Member Already Added");
    // } else {
    //   dispatch(addCustomTagMember({membersData}));
    // }
  };

  useEffect(() => {
    if (employees.length > 0 && !isFirstTimeDataLoaded) {
      setIsFirstTimeDataLoaded(true);
      setFirstTimeEmpData(employees);
    }
  }, [employees]);

  const handleDeleteMember = (myId) => {
    let memberId = myId.toString();
    const membersData = {
      id: data.id,
      memberId: memberId,
    };
    //dispatch(removeToDoMemebr(membersData));
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
                name={opt?.name}
                src={opt?.image || "https://joeschmoe.io/api/v1/random"}
                round={true}
                width={"30px"}
                height={"30px"}
              />
              {opt?.name}
            </>
          );
        }}
        dataVal={value}
        name="member"
        showSearch={true}
        // direction={Direction}
        rules={[
          {
            required: true,
            message: "Please Select Member",
          },
        ]}
      />
      {data[2]?.members?.length > 0 ? (
        <ApproverListItem
          className="AddMemberModal"
          data={data[2]?.members}
          handleDelete={handleDeleteMember}
        />
      ):
      (
       <NoDataFound></NoDataFound>
      )}

    </Modal>
  );
}

export default MemberModal;
