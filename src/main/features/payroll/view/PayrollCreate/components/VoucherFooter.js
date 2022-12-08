import { Button } from "antd";
import React, { useEffect, useState, useContext } from "react";
import { payrollDictionaryList } from "../../../localization/index";
import { LanguageChangeContext } from "../../../../../../utils/localization/localContext/LocalContext";

const VoucherFooter = ({ amount = 0, handleSubmit }) => {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { payrollDictionary, Direction } = payrollDictionaryList[userLanguage];
  return (
    <div className="bg-white p-4 rounded-md flex w-full justify-between mt-5 sticky bottom-2">
      <div>
        <Button className="ThemeBtn mr-2" onClick={handleSubmit}>
          {payrollDictionary.createPayroll}
        </Button>
      </div>
      <div className="flex items-center">
        <div className="totalAmountItem flex mx-5">
          <div className="totalAmountLabel">
            {" "}
            {payrollDictionary.totalAmount}:{" "}
          </div>
          <div className="totalAmountValue">
            {(amount ? amount : 0).toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
};
export default VoucherFooter;
