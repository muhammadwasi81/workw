import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Modal } from "antd";
import { useSelector } from "react-redux";
import CustomSelect from "../AntdCustomSelects/SharedSelects/MemberSelect";
import ApproverListItem from "../AppComponents/Approvals/components/approverList";
// import {
//   getAllGroupMemberAction,
//   addGroupMemberAction,
// } from "../../store/actions";
// import { addMember, deleteGroupMember } from "../../store/slice";
import { handleItemDetailModal } from "../../../utils/Shared/store/slice";
import Avatar from "../Avatar/avatarOLD";
import { getAllEmployees } from "../../../utils/Shared/store/actions";
// import { deleteGroupMemberAction } from "../../store/actions";
import { useParams } from "react-router-dom";
import ListItem from "./itemListing";

function ItemDetailModal({
  isOpen = false,
  data,
  isDeleteDisabled = false,
  addEnabled = false,
  addFunc = () => {},
  onDelete = () => {},
}) {
  const dispatch = useDispatch();
  // const modalRequest = useSelector((state) => state.groupSlice.addMemberModal);
  // const {}
  const { employees, itemDetailModal } = useSelector(
    (state) => state.sharedSlice
  );
  const [firstTimeEmpData, setFirstTimeEmpData] = useState([]);
  const [isFirstTimeDataLoaded, setIsFirstTimeDataLoaded] = useState(false);
  const [value, setValue] = useState([]);
  const params = useParams();
  const [open, setOpen] = useState(isOpen);
  const [myData, setMyData] = useState([]);
  const { groupDetailid } = params;
  // let ModalOpen = modalRequest.status;

  useEffect(() => {
    fetchEmployees("", 0);
    setMyData(data);
  }, []);

  const fetchEmployees = (text, pgNo) => {
    dispatch(getAllEmployees({ text, pgNo, pgSize: 20 }));
  };

  console.log(data, "members");

  const handleClose = () => {
    dispatch(handleItemDetailModal(false));
    // setMyData([]);
  };

  // useEffect(() => {
  //   return () => {
  //     console.log("unmounting");
  //     setMyData([]);
  //   };
  // }, []);

  // const handleChange = (myid) => {
  //   let memberId = myid.toString();
  //   const members = {
  //     id: data.id,
  //     memberId: memberId,
  //   };
  //   dispatch(addGroupMemberAction(members));
  // };

  // useEffect(() => {
  //   if (data.length > 0) {
  //     setMyData(data);
  //     console.log("data change", data);
  //   }
  // }, [data]);

  useEffect(() => {
    if (employees.length > 0 && !isFirstTimeDataLoaded) {
      setIsFirstTimeDataLoaded(true);
      setFirstTimeEmpData(employees);
    }
  }, [employees]);

  // const handleDeleteMember = (myid) => {
  //   const memberId = myid.toString();
  //   const delmembers = {
  //     id: data.id || groupDetailid,
  //     memberId: memberId,
  //   };

  //   dispatch(deleteGroupMemberAction(delmembers));
  // };
  return (
    <Modal
      open={itemDetailModal}
      onOk={(e) => {}}
      onCancel={handleClose}
      footer={false}
      closeIcon={<div />}
      className="ApproverModal"
      width={"360px"}
      destroyOnClose={true}
      // afterClose={afterClose}
      forceRender={true}
    >
      {addEnabled && (
        <CustomSelect
          style={{ marginBottom: "0px" }}
          data={firstTimeEmpData}
          selectedData={addFunc}
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
      )}

      <ListItem
        ListData={data}
        deleteDisabled={isDeleteDisabled}
        onDelete={onDelete}
      />

      {/* <ApproverListItem
        className="AddMemberModal"
        data={data?.members}
        handleDelete={handleDeleteMember}
      /> */}
    </Modal>
  );
}

export default ItemDetailModal;
