import React, { useEffect, useState, useContext } from "react";
import { voucherDictionaryList } from "../../localization/index";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";
const CreateEntryHead = () => {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { vouncherDictionary, Direction } = voucherDictionaryList[userLanguage];
  return (
    <thead>
      <tr>
        <th style={{ width: "50px" }}>{vouncherDictionary.sno}</th>
        <th style={{ width: "230px" }}>{vouncherDictionary.account}</th>
        <th style={{ width: "100px" }}>{vouncherDictionary.chequeNo}</th>
        <th>Naration</th>
        <th style={{ width: "150px" }}>{vouncherDictionary.amount}</th>
        <th style={{ width: "120px" }}>{vouncherDictionary.drCr}</th>
        <th style={{ width: "45px" }}></th>
      </tr>
    </thead>
  );
};
export default CreateEntryHead;
