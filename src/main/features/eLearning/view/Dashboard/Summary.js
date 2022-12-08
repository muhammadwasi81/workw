import React, { useContext } from "react";
import DashboardLayout from "./Layout/DashboardLayout";
import { elearningDictionaryList } from "../../localization/index";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";

function Summary() {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { Direction, elearningDictionary } = elearningDictionaryList[
    userLanguage
  ];
  return (
    <DashboardLayout>
      <div>{elearningDictionary.summary}</div>
    </DashboardLayout>
  );
}

export default Summary;
