import React, { useEffect, useState, useContext } from "react";
import { quotationDictionaryList } from "../../../localization/index";
import { LanguageChangeContext } from "../../../../../../utils/localization/localContext/LocalContext";

const CreateEntryHead = () => {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { quotationDictionary, Direction } = quotationDictionaryList[
    userLanguage
  ];
  return (
    <thead>
      <tr className="whitespace-nowrap">
        <th style={{ minWidth: "6%" }}>{quotationDictionary.sno}</th>
        <th style={{ minWidth: "40%" }}>{quotationDictionary.serviceItem}</th>
        <th style={{ minWidth: "10%" }}>{quotationDictionary.price}</th>
        <th style={{ minWidth: "6%" }}>{quotationDictionary.quantity}</th>
        <th style={{ minWidth: "16%" }}>{quotationDictionary.tax}</th>
        <th style={{ minWidth: "16%" }}>{quotationDictionary.totalAmount}</th>
        {/* <th style={{ minWidth: "150px" }}>
          Deductions
        </th>
        <th style={{ minWidth: "150px" }}>
          Net Salary
        </th>
        <th style={{ minWidth: "300px" }}>
          Approvers
        </th>
        <th style={{ minWidth: "250px" }}>
          Descrption
        </th>*/}
        <th style={{ minWidth: "6%" }}></th>
      </tr>
    </thead>
  );
};
export default CreateEntryHead;
