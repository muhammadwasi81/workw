/* eslint-disable array-callback-return */
import { Input, Divider } from "antd";
import React, { useContext } from "react";
import MemberCard from "./MemberCard";
import { useDispatch } from "react-redux";
import { getAllEmployeeShort } from "../../../../../utils/Shared/store/actions";
import { useSelector } from "react-redux";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";
import { messengerDictionaryList } from "../../localization";

function MemberList({
  allMembers = [],
  onMemberSelect,
  onMemberRemove,
  selectedMembers,
}) {
  const dispatch = useDispatch();
  const userSlice = useSelector((state) => state.userSlice);
  const { userLanguage } = useContext(LanguageChangeContext);
  const { messengerDictionary } = messengerDictionaryList[userLanguage];
  return (
    <div className="memberList">
      <div className="memberList__header">
        <Input
          placeholder={messengerDictionary.searchMemberToAdd}
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
      <Divider>{messengerDictionary.contacts}</Divider>
      <div className="contact" style={{ position: "relative" }}>
        {allMembers
          .filter((it) => it.id !== userSlice.user.id)
          .map((item) => {
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
