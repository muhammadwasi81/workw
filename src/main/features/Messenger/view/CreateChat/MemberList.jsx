/* eslint-disable array-callback-return */
import { Input, Divider } from "antd";
import React from "react";
import MemberCard from "./MemberCard";
import { useDispatch } from "react-redux";
import { getAllEmployeeShort } from "../../../../../utils/Shared/store/actions";

function MemberList({
  allMembers = [],
  onMemberSelect,
  onMemberRemove,
  selectedMembers,
}) {
  const dispatch = useDispatch();

  return (
    <div className="memberList">
      <div className="memberList__header">
        <Input
          placeholder="Search members to add"
          onChange={(e) => {
            dispatch(
              getAllEmployeeShort({
                pageNo: "1",
                text: e.target.value,
              })
            );
          }}
        />
      </div>
      <Divider>Contacts</Divider>
      <div className="contact" style={{ position: "relative" }}>
        {allMembers.map((item) => {
          return (
            <MemberCard
              onMemberSelect={onMemberSelect}
              onMemberRemove={onMemberRemove}
              item={item}
              key={item.id}
              isChecked={selectedMembers.includes(item.id)}
            />
          );
        })}
      </div>
    </div>
  );
}

export default MemberList;
