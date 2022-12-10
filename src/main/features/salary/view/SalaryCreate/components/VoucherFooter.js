import React, { useEffect, useState, useContext } from "react";
import { salaryDictionaryList } from "../../../localization/index";
import { LanguageChangeContext } from "../../../../../../utils/localization/localContext/LocalContext";

const VoucherFooter = ({ amount = 0 }) => {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { salaryDictionary } = salaryDictionaryList[userLanguage];
  const { totalAmount } = salaryDictionary;
  return (
    <div className="flex items-center">
      <div className="totalAmountItem flex mx-5">
        <div className="totalAmountLabel">{totalAmount}: </div>
        <div className="totalAmountValue">{amount.toFixed(2)}</div>
      </div>
    </div>
  );
};
export default VoucherFooter;
