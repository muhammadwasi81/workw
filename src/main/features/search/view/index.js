import React, { useEffect } from "react";
import Header from "../../../layout/header";
import { ROUTES } from "../../../../utils/routes";
import {
  ContBody,
  TabbableContainer,
} from "../../../sharedComponents/AppComponents/MainFlexContainer";
import GroupContainer from "./groupsConatiner/GroupContainer";
import "../styles/style.css";
import RewardContainer from "./rewardsConatiner/RewardContainer";
import UserContainer from "./usersContainer";
import LeadContainer from "./leadContainer/LeadContainer";
import { globalSearch } from "../store/actions";
import { Route, Routes } from "react-router-dom";
import Groups from "../../groups/view";
import { useDispatch, useSelector } from "react-redux";
import TravelContainer from "./travelContainer/TravelContainer";
import DocumentContainer from "./documentContainer/DocumentContainer";
import ProjectContainer from "./projectsContainer/ProjectContainer";
import WorkBoardContainer from "./workBoardContainer/WorkBoardContainer";
import ExpenseContainer from "./expenseContainer/ExpenseContainer";
import TaskContainer from "./taskContainer/TaskContainer";
import EmployeesContainer from "./employeesContainer/EmployeesContainer";
import CoursesContainer from "./coursesContainer/CoursesContainer";
import VideoContainer from "./videosContainer/VideoContainer";
import ArticleContainer from "./articleContainer/ArticleContainer";
import QuizContainer from "./quizContainer/QuizContainer";
import BookContainer from "./bookContainer/BookContainer";
import TedTalks from "./tedTalksContainer/TedTalks";
import { AdminPanelContainer } from "../styles/admin.style";
import MenuList from "../panel/menulist";
import MenuRoutes from "../panel/menuRoutes";
import GlobalSearch from "../panel";
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

      {/* <ContBody>
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
          <CoursesContainer />
          <VideoContainer />
          <ArticleContainer />
          <QuizContainer />
          <BookContainer />
          <TedTalks />
          <RewardContainer />
        </div>
      </ContBody> */}
      <ContBody>
        <GlobalSearch />
      </ContBody>
    </TabbableContainer>
  );
}

export default Index;
