import React, { useContext } from "react";
import DashboardLayout from "../Dashboard/Layout/DashboardLayout";
import { elearningDictionaryList } from "../../localization/index";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";

function Courses() {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { Direction, elearningDictionary } = elearningDictionaryList[
    userLanguage
  ];
  return (
    <DashboardLayout>
      <div>{"Courses"}</div>
    </DashboardLayout>
  );
}

export default Courses
