import { Input } from "antd";
import React from "react";
import MemberCard from "./MemberCard";
import { useDispatch } from "react-redux";
import { getAllEmployeeShort } from "../../../../../utils/Shared/store/actions";

function MemberList({ allMembers = [], onMember, cloneMembers }) {
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

      {allMembers.map(({ name, designation, image, id }) => {
        return (
          <MemberCard
            isChecked={cloneMembers[id]}
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
  );
}

export default MemberList;
