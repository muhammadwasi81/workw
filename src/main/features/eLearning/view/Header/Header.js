import React, { useContext } from "react";
import LayoutHeader from "../../../../layout/header";
import CreateLearningDropdown from "../../components/createLearningDropdown";
import { elearningDictionaryList } from "../../localization/index";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";

function Header({ dictionary, direction }) {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { Direction, elearningDictionary } = elearningDictionaryList[
    userLanguage
  ];
  const items = [
    {
      name: elearningDictionary.dashboard,
      to: `/eLearning`,
      renderButton: [1],
    },
    {
      name: elearningDictionary.teamDashboard,
      to: `/eLearning/teamDashboard`,
      renderButton: [1],
    },
    {
      name: elearningDictionary.summary,
      to: `/eLearning/summary`,
      renderButton: [1],
    },
  ];

  const buttons = [
    {
      render: <CreateLearningDropdown />,
    },
  ];
  return <LayoutHeader backButton={false} items={items} buttons={buttons} />;
}

export default Header;
