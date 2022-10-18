import React, { useEffect } from "react";
import TeamActivities from "./TeamActivities";
import { TeamPanelContainer } from "../../../Styles/team.style";
import TeamRoutes from "../TeamRoutes/routes";
import { useParams } from "react-router-dom";
import {
  ContBody,
  TabbableContainer,
} from "../../../../../sharedComponents/AppComponents/MainFlexContainer";
import Header from "../../../../../layout/header";

function TeamUpdate() {
  const { "*": id } = useParams();
  console.log(id, "ID");
  const userId = id.split("/")[1];
  const items = [
    {
      name: "Team Details",
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
