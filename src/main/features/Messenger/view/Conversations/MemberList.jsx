/* eslint-disable array-callback-return */
import { Input, Divider } from "antd";
import React from "react";
import MemberCard from "./MemberCard";
import { useDispatch } from "react-redux";
import { getAllEmployeeShort } from "../../../../../utils/Shared/store/actions";

function MemberList({
  allMembers = [],
  onMember,
  selectedMembers,
  currentMember,
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
                search: e.target.value,
              })
            );
          }}
        />
      </div>
      {selectedMembers.length > 0 && (
        <div className="selectedMembers">
          <Divider>Selected {selectedMembers.length}</Divider>
          {selectedMembers.map(({ name, designation, image, id }) => {
            return (
              <MemberCard
                onMember={onMember}
                name={name}
                designation={designation}
                image={image}
                id={id}
                key={id}
                isChecked={true}
              />
            );
          })}
        </div>
      )}
      <Divider>Contacts</Divider>
      <div className="contact" style={{ position: "relative" }}>
        {allMembers.map(({ name, designation, image, id }) => {
          if (!selectedMembers.find((o) => o.id === id))
            return (
              <MemberCard
                onMember={onMember}
                name={name}
                designation={designation}
                image={image}
                id={id}
                key={id}
              />
            );
        })}
      </div>
    </div>
  );
}

export default MemberList;
