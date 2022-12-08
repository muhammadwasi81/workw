import React, { useEffect, useState, useContext } from "react";
import { voucherDictionaryList } from "../../localization/index";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";

const VoucherFooter = ({ dr, cr }) => {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { vouncherDictionary, Direction } = voucherDictionaryList[userLanguage];
  return (
    <div className="flex items-center">
      <div className="totalAmountItem flex mx-5">
        <div className="totalAmountLabel">{vouncherDictionary.Dr} : </div>
        <div className="totalAmountValue">{dr.toFixed(2)}</div>
      </div>
      <div className="totalAmountItem flex mx-5">
        <div className="totalAmountLabel">{vouncherDictionary.Cr} : </div>
        <div className="totalAmountValue">{cr.toFixed(2)}</div>
      </div>
      <div className="totalAmountItem flex mx-5">
        <div className="totalAmountLabel">
          {vouncherDictionary.differences} :
        </div>
        <div className="totalAmountValue">{(dr - cr).toFixed(2)}</div>
      </div>
    </div>
  );
};
export default VoucherFooter;
