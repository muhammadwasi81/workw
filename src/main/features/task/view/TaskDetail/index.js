import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { dictionaryList } from "../../../../../utils/localization/languages";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";
import { ContBody, HeaderMenuContainer, TabbableContainer } from "../../../../sharedComponents/AppComponents/MainFlexContainer";
import { ContainerHeader } from "../../../../sharedComponents/AppComponents/MainHeader";
import HeaderNavLink from "../../../../sharedComponents/AppComponents/MainHeader/HeaderNavLink";
import TaskDetailRigthCol from "./rigthColumn";
import TaskDetailCard from "./taskDetailCard";

function TaskDetail() {
  const { userLanguage } = useContext(LanguageChangeContext);
  const label = dictionaryList[userLanguage];

  const { search } = useLocation();

  return (
    <TabbableContainer>
      <ContainerHeader>
        <HeaderMenuContainer>
          <HeaderNavLink isDefault={true} linkName={"My Task"} />
        </HeaderMenuContainer>
        <div className="right-menu"></div>
        <span className="ln" />
      </ContainerHeader>

      <ContBody>
        <div className="lf-col">
          <TaskDetailCard />
        </div>
        <div className="rt-col detail-rigth-column">
          <TaskDetailRigthCol />
        </div>
      </ContBody>
    </TabbableContainer>
  );
}

export default TaskDetail;
