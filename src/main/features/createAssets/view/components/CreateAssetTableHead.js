import React, { useContext } from "react";
import { createAssetsDictionaryList } from "../../localization/index";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";
const CreateAssetHead = () => {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { createAssetsDictionary, Direction } = createAssetsDictionaryList[
    userLanguage
  ];
  return (
    <thead>
      <tr className="whitespace-nowrap">
        <th style={{ minWidth: "40px" }}>{createAssetsDictionary.sno}</th>
        <th style={{ minWidth: "100px" }}>
          {createAssetsDictionary.inventoryName}
        </th>
        <th style={{ minWidth: "100px" }}>
          {" "}
          {createAssetsDictionary.inventoryValue}
        </th>
        <th style={{ minWidth: "100px" }}>
          {" "}
          {createAssetsDictionary.serialNo}
        </th>
        <th style={{ minWidth: "150px" }}>
          {" "}
          {createAssetsDictionary.category}
        </th>
        <th style={{ minWidth: "150px" }}>{createAssetsDictionary.type}</th>
        <th style={{ minWidth: "150px" }}>{createAssetsDictionary.image}</th>
        <th style={{ minWidth: "230px" }}>{createAssetsDictionary.handover}</th>
        <th style={{ minWidth: "250px" }}>
          {createAssetsDictionary.approvers}
        </th>
      </tr>
    </thead>
  );
};
export default CreateAssetHead;
