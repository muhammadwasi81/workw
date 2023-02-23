import React, { useContext } from "react";
import LayoutHeader from "../../../../layout/header";
import CreateLearningDropdown from "../../components/createLearningDropdown";
import { elearningDictionaryList } from "../../localization/index";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";
import { ROUTES } from "../../../../../utils/routes";
import { FeaturePermissionEnum } from "../../../../../utils/Shared/enums/featuresEnums";
import { useSelector } from "react-redux";

function Header({ dictionary, direction }) {
  const {user} = useSelector((state) => state.userSlice);
  const userPermissions = user.permissions
  const { userLanguage } = useContext(LanguageChangeContext);
  const { Direction, elearningDictionary } = elearningDictionaryList[
    userLanguage
  ];
  const items = [
    {
      name: elearningDictionary.dashboard,
      to: `${ROUTES.ELearning.LINK}`,
      renderButton: [1],
    },
    {
      name: elearningDictionary.teamDashboard,
      to: `${ROUTES.ELearning.TEAM_DASHBOARD}`,
      renderButton: [1],
    },
    {
      name: elearningDictionary.summary,
      to: `${ROUTES.ELearning.TEAM_SUMMARY}`,
      renderButton: [1],
    },
  ];

  const buttons = [
    {
      render: <CreateLearningDropdown />,
    },
  ];
  return <LayoutHeader backButton={false} items={items} buttons={userPermissions.includes(FeaturePermissionEnum.CreateCourse) ? buttons : []} />;
}

export default Header;
