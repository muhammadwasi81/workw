import React from "react";
import { Route, Routes } from "react-router-dom";
import { ROUTES } from "../../../../utils/routes";
import ArticleContainer from "../view/articleContainer/ArticleContainer";
import BookContainer from "../view/bookContainer/BookContainer";
import CoursesContainer from "../view/coursesContainer/CoursesContainer";
import DocumentContainer from "../view/documentContainer/DocumentContainer";
import EmployeesContainer from "../view/employeesContainer/EmployeesContainer";
import ExpenseContainer from "../view/expenseContainer/ExpenseContainer";
import GroupContainer from "../view/groupsConatiner/GroupContainer";
import LeadContainer from "../view/leadContainer/LeadContainer";
import ProjectContainer from "../view/projectsContainer/ProjectContainer";
import QuizContainer from "../view/quizContainer/QuizContainer";
import RewardContainer from "../view/rewardsConatiner/RewardContainer";
import TaskContainer from "../view/taskContainer/TaskContainer";
import TedTalks from "../view/tedTalksContainer/TedTalks";
import TravelContainer from "../view/travelContainer/TravelContainer";
import VideoContainer from "../view/videosContainer/VideoContainer";
import WorkBoardContainer from "../view/workBoardContainer/WorkBoardContainer";

const MenuRoutes = () => {
  return (
    <>
      <Routes>
        <Route path={ROUTES.SEARCH.FEED} element={<LeadContainer />} />
        <Route path={ROUTES.SEARCH.TRAVEL} element={<TravelContainer />} />
        <Route path={ROUTES.SEARCH.DOCUMENT} element={<DocumentContainer />} />
        <Route path={ROUTES.SEARCH.PROJECT} element={<ProjectContainer />} />
        <Route
          path={ROUTES.SEARCH.WORKBOARD}
          element={<WorkBoardContainer />}
        />
        <Route path={ROUTES.SEARCH.GROUP} element={<GroupContainer />} />
        <Route path={ROUTES.SEARCH.EXPENSE} element={<ExpenseContainer />} />
        <Route path={ROUTES.SEARCH.TASK} element={<TaskContainer />} />
        <Route path={ROUTES.SEARCH.EMPLOYEE} element={<EmployeesContainer />} />
        <Route
          path={ROUTES.SEARCH.ELEARNINGCOURSE}
          element={<CoursesContainer />}
        />
        <Route
          path={ROUTES.SEARCH.ELEARNINGVIDEOS}
          element={<VideoContainer />}
        />
        <Route
          path={ROUTES.SEARCH.ELEARNINGARTICLE}
          element={<ArticleContainer />}
        />
        <Route path={ROUTES.SEARCH.ELEARNINGQUIZ} element={<QuizContainer />} />
        <Route path={ROUTES.SEARCH.ELEARNINGBOOK} element={<BookContainer />} />
        <Route path={ROUTES.SEARCH.ELEARNINGTEDTALKS} element={<TedTalks />} />
        <Route path={ROUTES.SEARCH.REWARDS} element={<RewardContainer />} />
      </Routes>
    </>
  );
};
export default MenuRoutes;
