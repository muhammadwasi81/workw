import React, { useContext } from "react";
import { ROUTES } from "../../../../utils/routes";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { dictionaryList } from "../../../../utils/localization/languages";
import { companyDictionaryList } from "./localization/index";
import CompanyList from "./view/CompanyList";

const MyTeam = () => {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { sharedLabels } = dictionaryList[userLanguage];
  const { companyDictionary } = companyDictionaryList[userLanguage];
  const labels = companyDictionary.company;

  return (
        <CompanyList />
  );
};
export default MyTeam;
