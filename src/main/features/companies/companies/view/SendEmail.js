import React, { useContext, useEffect } from "react";
import { TeamTable } from "./TaskTable/TeamTable";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";
import { dictionaryList } from "../../../../../utils/localization/languages";
import { companyDictionaryList } from "../localization/index";
import { useDispatch, useSelector } from "react-redux";
import { getAllLeaveAction } from "../store/action";
import { useParams } from "react-router-dom";
import moment from "moment";
import { Button, Divider } from "antd";

function SendEmail() {
  const dispatch = useDispatch();
  const { userLanguage } = useContext(LanguageChangeContext);
  const { sharedLabels } = dictionaryList[userLanguage];
  const { companyDictionary } = companyDictionaryList[userLanguage];
  const labels = companyDictionary.sendEmail;
  const { companyDetail } = companyDictionary;

  return (
    <div className="SendEmail">
      <Divider orientation="right"> {companyDetail.sendEmail}</Divider>
      <p>{labels.sendWelcomeEmail}</p>
      <Button className="ThemeBtn">{companyDetail.reSend}</Button>
    </div>
  );
}
export default SendEmail;
