import React from "react";
import MemberCard from "./MemberCard";

function SelectMemberList({ selectedMembers, onDelete }) {
  return (
    <div className="selectMemberList">
      <div className="selectMemberList__header">
        <p>SELECTED</p>
        <p>{selectedMembers.length}</p>
      </div>
      <div className="selectMemberList__body">
        {selectedMembers.map(({ name, designation, image, id }) => {
          return (
            <MemberCard
              name={name}
              designation={designation}
              image={image}
              id={id}
              key={id}
              crossIcon
              onMember={onDelete}
            />
          );
        })}
      </div>
    </div>
  );
}

export default SelectMemberList;
