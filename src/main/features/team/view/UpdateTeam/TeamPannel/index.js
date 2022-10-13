import React, { useEffect } from "react";
import TeamActivities from "./TeamActivities";
import { TeamPanelContainer } from "../../../Styles/team.style";
import TeamRoutes from "../TeamRoutes/routes";
import { useParams } from "react-router-dom";

function TeamUpdate() {
  const { "*": id } = useParams();
  console.log(id, "ID");
  const userId = id.split("/")[1];
  return (
    <>
      <TeamPanelContainer>
        <TeamActivities id={id} />
        <TeamRoutes />
      </TeamPanelContainer>
    </>
  );
}
export default TeamUpdate;
