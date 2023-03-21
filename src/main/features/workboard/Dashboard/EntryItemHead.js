import React, { useEffect, useState, useContext } from "react";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { WorkBoardDictionary } from "../localization";
const CreateEntryHead = () => {
//   const { userLanguage } = useContext(LanguageChangeContext);
//   const { vouncherDictionary, Direction } = voucherDictionaryList[userLanguage];

const { userLanguage } = useContext(LanguageChangeContext);
const { WorkBoardDictionaryList, Direction } = WorkBoardDictionary[
  userLanguage
];
  return (
    <thead>
      <tr>
        <th style={{ width: "50px" }}>{WorkBoardDictionaryList.labels.name}</th>
        <th style={{ width: "230px" }}>{WorkBoardDictionaryList.labels.description}</th>
        <th style={{ width: "100px" }}>{WorkBoardDictionaryList.labels.members}</th>
        <th style={{ width: "150px" }}>{WorkBoardDictionaryList.labels.createdDate}</th>
      </tr>
    </thead>
  );
};
export default CreateEntryHead;
