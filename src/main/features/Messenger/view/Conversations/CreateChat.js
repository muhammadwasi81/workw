import { Drawer, Input } from "antd";
import React, { useEffect, useState } from "react";
import SingleUpload from "../../../../sharedComponents/Upload/singleUpload";
import MemberList from "./MemberList";
import { useDispatch, useSelector } from "react-redux";
import { getAllEmployeeShort } from "../../../../../utils/Shared/store/actions";
function CreateChat({ onClose, visible }) {
  const dispatch = useDispatch();
  const { employeeShort: members } = useSelector((state) => state.sharedSlice);
  const [selectedMembers, setSelectedMembers] = useState([]);
  useEffect(() => {
    dispatch(
      getAllEmployeeShort({
        pageNo: "1",
        search: "",
      })
    );
  }, []);
  const onMemberSelect = (member) => {
    setSelectedMembers([
      ...selectedMembers,
      member.id
    ])
  };
  const onMemberRemove = (member) => {
    setSelectedMembers(selectedMembers.filter(it => it !== member.id))
  }
  console.log(selectedMembers, "Member Here");

  return (
    <Drawer
      placement="right"
      onClose={onClose}
      visible={visible}
      className="createChat"
      width={500}
      destroyOnClose={true}
    >
      <div className="bg-white m-2 rounded-md">
        <div className="createChat__header">
          <SingleUpload
            //   handleImageUpload={}
            uploadText={""}
            multiple={false}
          />
          <Input placeholder="Name Your Group" />
        </div>
        <div className="createChat__body">
          <MemberList
            allMembers={members}
            onMemberSelect={onMemberSelect}
            onMemberRemove={onMemberRemove}
            selectedMembers={selectedMembers}
          />
        </div>
        <div className="" >
          
        </div>
      </div>
    </Drawer>
  );
}

export default CreateChat;
