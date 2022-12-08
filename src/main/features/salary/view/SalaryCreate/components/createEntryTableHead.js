import React, { useEffect, useState, useContext } from "react";
import { salaryDictionaryList } from "../../../localization/index";
import { LanguageChangeContext } from "../../../../../../utils/localization/localContext/LocalContext";

const CreateEntryHead = () => {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { salaryDictionary } = salaryDictionaryList[userLanguage];
  const {
    sno,
    EffectiveDate,
    employee,
    grade,
    BasicSalary,
    allowaces,
    deductions,
    NetSalary,
    Approvers,
    description,
  } = salaryDictionary;
  return (
    <thead>
      <tr className="whitespace-nowrap">
        <th style={{ minWidth: "50px" }}>{sno}</th>
        <th style={{ minWidth: "130px" }}>{EffectiveDate}</th>
        <th style={{ minWidth: "230px" }}>{employee}</th>
        <th style={{ minWidth: "170px" }}>{grade}</th>
        <th style={{ minWidth: "150px" }}>{BasicSalary}</th>
        <th style={{ minWidth: "150px" }}>{allowaces}</th>
        <th style={{ minWidth: "150px" }}>{deductions}</th>
        <th style={{ minWidth: "150px" }}>{NetSalary}</th>
        <th style={{ minWidth: "300px" }}>{Approvers}</th>
        <th style={{ minWidth: "250px" }}>{description}</th>
        <th style={{ minWidth: "45px" }}></th>
      </tr>
    </thead>
  );
};
export default CreateEntryHead;
