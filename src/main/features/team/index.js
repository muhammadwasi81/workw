import React, { useContext } from "react";
import { ROUTES } from "../../../utils/routes";
import { LanguageChangeContext } from "../../../utils/localization/localContext/LocalContext";
import { dictionaryList } from "../../../utils/localization/languages";
import { teamDictionaryList } from "./localization/index";

import {
  ContBody,
  TabbableContainer,
} from "../../sharedComponents/AppComponents/MainFlexContainer";
import teamRoutes from "./routes/teamRoutes";
import Header from "../../layout/header";
import TeamList from "./view/TeamList";

const MyTeam = () => {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { sharedLabels } = dictionaryList[userLanguage];
  const { teamDictionary } = teamDictionaryList[userLanguage];
  const labels = teamDictionary.team;
  const items = [
    {
      name: labels.teams,
      //   to: ROUTES.EMPLOYEES.EMPLOYEELINK,
      //    renderButton: buttonsEnum.employee,
    },
  ];
  return (
    <TabbableContainer>
      <Header items={items} />
      <ContBody>
        <TeamList />
      </ContBody>
    </TabbableContainer>
  );
};
export default MyTeam;
