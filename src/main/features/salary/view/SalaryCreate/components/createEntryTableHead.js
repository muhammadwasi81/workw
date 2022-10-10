import React, { useEffect, useState,useContext } from 'react';
import { LanguageChangeContext } from '../../../../../../utils/localization/localContext/LocalContext';
import { salaryDictionary } from '../../../localization';

const CreateEntryHead = () => {

  const { userLanguage } = useContext(LanguageChangeContext);
  const { salary_Dictionary } = salaryDictionary[userLanguage];


  return (
    <thead>
      <tr className='whitespace-nowrap' >
        <th style={{ minWidth: "50px" }} >
        {salary_Dictionary.SNo}
        </th>
        <th style={{ minWidth: "130px" }}>
        {salary_Dictionary.EffectiveDate}
        </th>
        <th style={{ minWidth: "230px" }}>
        {salary_Dictionary.Employee}
        </th>
        <th style={{ minWidth: "170px" }}>
        {salary_Dictionary.Grade}
        </th>
        <th style={{ minWidth: "150px" }}>
        {salary_Dictionary.BasicSalary}
        </th>
        <th style={{ minWidth: "150px" }}>
        {salary_Dictionary.Allowances}
        </th>
        <th style={{ minWidth: "150px" }}>
        {salary_Dictionary.Deductions}
        </th>
        <th style={{ minWidth: "150px" }}>
        {salary_Dictionary.NetSalary}
        </th>
        <th style={{ minWidth: "300px" }}>
        {salary_Dictionary.Approvers}
        </th>
        <th style={{ minWidth: "250px" }}>
        {salary_Dictionary.Descrption}
        </th>
        <th style={{ minWidth: "45px" }}>
        </th>
      </tr>
    </thead>
  )
}
export default CreateEntryHead;