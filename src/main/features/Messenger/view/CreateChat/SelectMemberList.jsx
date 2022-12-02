import React, { useContext } from "react";
import MemberCard from "./MemberCard";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";
import { messengerDictionaryList } from "../../localization";

function SelectMemberList({ selectedMembers, onDelete }) {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { messengerDictionary } = messengerDictionaryList[userLanguage];
  return (
    <div className="selectMemberList">
      <div className="selectMemberList__header">
        <p>{messengerDictionary.selected}</p>
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
