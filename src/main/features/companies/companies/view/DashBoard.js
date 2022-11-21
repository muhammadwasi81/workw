import React, { useContext, useEffect } from "react";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";
import { dictionaryList } from "../../../../../utils/localization/languages";
import { companyDictionaryList } from "../localization/index";
import { useDispatch } from "react-redux";
import { Divider } from "antd";
import OverAllDashboard from "../../view/Dashboard/Sections/overAll";

function DashBoard() {
  const dispatch = useDispatch();
  const { userLanguage } = useContext(LanguageChangeContext);
  const { sharedLabels } = dictionaryList[userLanguage];
  const { companyDictionary } = companyDictionaryList[userLanguage];
  


  return (
    <div className="SendEmail">
      <Divider orientation="left"> {"Dashboard"}</Divider>
      <OverAllDashboard />
    </div>
  );
}
export default DashBoard;
