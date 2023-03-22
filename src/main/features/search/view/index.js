import React, { useEffect } from "react";
import Header from "../../../layout/header";
import { ROUTES } from "../../../../utils/routes";
import {
  ContBody,
  TabbableContainer,
} from "../../../sharedComponents/AppComponents/MainFlexContainer";
import GroupContainer from "../components/groupsConatiner/GroupContainer";
import "../styles/style.css";
import RewardContainer from "../components/rewardsConatiner/RewardContainer";
import UserContainer from "../components/usersContainer";
import LeadContainer from "../components/leadContainer/LeadContainer";
import { globalSearch } from "../store/actions";
import { Route, Routes } from "react-router-dom";
import Groups from "../../groups/view";
import { useDispatch, useSelector } from "react-redux";
import { SearchFilterEnum } from "../enums/enums";
import TravelContainer from "../components/travelContainer/TravelContainer";
import DocumentContainer from "../components/documentContainer/DocumentContainer";
import ProjectContainer from "../components/projectsContainer/ProjectContainer";
import WorkBoardContainer from "../components/workBoardContainer/WorkBoardContainer";
import ExpenseContainer from "../components/expenseContainer/ExpenseContainer";
import TaskContainer from "../components/taskContainer/TaskContainer";
import EmployeesContainer from "../components/employeesContainer/EmployeesContainer";
function Index() {
  const dispatch = useDispatch();

  const items = [
    {
      name: "Search",
      to: `${ROUTES.SEARCH.DEFAULT}`,
      renderButton: [1],
    },
  ];

  return (
    <TabbableContainer>
      <Header items={items} />
      <ContBody>
        <div className="mainSearchContainer">
          <LeadContainer />
          <TravelContainer />
          <DocumentContainer />
          <ProjectContainer />
          <WorkBoardContainer />
          <GroupContainer />
          <ExpenseContainer />
          <TaskContainer />
          <EmployeesContainer />
          <RewardContainer />
          <UserContainer />
        </div>
      </ContBody>
    </TabbableContainer>
  );
}

export default Index;
