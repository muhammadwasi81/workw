import { Drawer, Input } from "antd";
import React, { useEffect, useState } from "react";
import SingleUpload from "../../../../sharedComponents/Upload/singleUpload";
import MemberList from "./MemberList";
import SelectMemberList from "./SelectMemberList";
import { useDispatch, useSelector } from "react-redux";
import { getAllEmployeeShort } from "../../../../../utils/Shared/store/actions";
function CreateChat({ onClose, visible }) {
  const dispatch = useDispatch();
  const { employeeShort: members } = useSelector((state) => state.sharedSlice);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [selectedMembersClone, setSelectedMembersClone] = useState([]);
  useEffect(() => {
    dispatch(
      getAllEmployeeShort({
        pageNo: "1",
        search: "",
      })
    );
  }, []);
  const handleMember = (member) => {
    setSelectedMembers((preValues) => {
      if (!preValues.find((o) => o.id === member.id)) {
        setSelectedMembersClone((preValues) => ({
          ...preValues,
          [member.id]: member.status,
        }));
        return [...preValues, member];
      } else {
        const filterSelectedMember = selectedMembers.filter(({ id }) => {
          return id !== member.id;
        });
        setSelectedMembersClone((preValues) => {
          delete preValues[member.id];
          return preValues;
        });
        return [...filterSelectedMember];
      }
    });
  };
  const handleDeleteMember = (memberRemoved) => {
    const filterSelectedMember = selectedMembers.filter(({ id }) => {
      return id !== memberRemoved.id;
    });

    setSelectedMembersClone((preValues) => {
      delete preValues[memberRemoved.id];
      return preValues;
    });
    setSelectedMembers(filterSelectedMember);
  };
  return (
    <Drawer
      placement="right"
      onClose={onClose}
      visible={visible}
      className="createChat"
      width={500}
    >
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
          onMember={handleMember}
          cloneMembers={selectedMembersClone}
        />
        <SelectMemberList
          selectedMembers={selectedMembers}
          onDelete={handleDeleteMember}
        />
      </div>
    </Drawer>
  );
}

export default CreateChat;
