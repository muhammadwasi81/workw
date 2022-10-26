import React, { useEffect, useContext } from "react";
import TeamActivities from "./TeamActivities";
import { TeamPanelContainer } from "../../../Styles/team.style";
import TeamRoutes from "../TeamRoutes/routes";
import { useParams } from "react-router-dom";
import {
  ContBody,
  TabbableContainer,
} from "../../../../../sharedComponents/AppComponents/MainFlexContainer";
import Header from "../../../../../layout/header";
import { LanguageChangeContext } from "../../../../../../utils/localization/localContext/LocalContext";
import { dictionaryList } from "../../../../../../utils/localization/languages";
import { teamDictionaryList } from "../../../localization/index";

function TeamUpdate() {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { sharedLabels } = dictionaryList[userLanguage];
  const { teamDictionary } = teamDictionaryList[userLanguage];
  const labels = teamDictionary.teamDetail;

  const { "*": id } = useParams();
  console.log(id, "ID");
  const userId = id.split("/")[1];

  const items = [
    {
      name: labels.teamDetails,
    },
  ];
  return (
    <>
      <TeamPanelContainer>
        <TabbableContainer>
          <Header items={items} />
          <ContBody>
            <TeamActivities id={id} />

            <TeamRoutes />
          </ContBody>
        </TabbableContainer>
      </TeamPanelContainer>
    </>
  );
}
export default TeamUpdate;
