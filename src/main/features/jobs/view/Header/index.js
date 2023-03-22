import React, { useContext } from "react";
import { ROUTES } from "../../../../../utils/routes";
import MainHeader from "../../../../layout/header";
import { jobsDictionaryList } from "../../localization/index";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";

const Header = () => {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { jobsDictionary } = jobsDictionaryList[userLanguage];
  const items = [
    {
      name: jobsDictionary.jobBoard,
      to: `${ROUTES.JOBS.ROOT}`,
      renderButton: [1],
    },
  ];
  return <MainHeader items={items} />;
};

export default Header;
