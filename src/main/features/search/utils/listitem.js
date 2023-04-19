import { ROUTES, DOMAIN_PREFIX } from "../../../../utils/routes";

import newsIcon from "../../../../content/svg/menu/newNavBarIcon/News Feed.svg";
import todoBoard from "../../../../content/svg/menu/newNavBarIcon/Work Board.svg";
import contactManagerIcon from "../../../../content/svg/menu/newNavBarIcon/Lead Manager.svg";
import documentIcon from "../../../../content/svg/menu/newNavBarIcon/Docs-Archives.svg"
import projectsIcon from "../../../../content/svg/menu/newNavBarIcon/Projects.svg";
import groupsIcon from "../../../../content/svg/menu/newNavBarIcon/Groups.svg";
import expensesIcon from "../../../../content/svg/menu/newNavBarIcon/Expenses.svg";
import employeeIcon from "../../../../content/svg/menu/newNavBarIcon/Employees.svg";
import eLearningIcon from "../../../../content/svg/menu/newNavBarIcon/E Learning.svg";


import { FaUserLock , FaVideo , FaDiscourse} from "react-icons/fa";

export const listitem = [
  {
    IconName: newsIcon,
    displayName: "All",
    classObj: "button",
    to: ROUTES.SEARCH.SEA,
  },
  {
    IconName: newsIcon,
    displayName: "feed",
    classObj: "button",
    to: ROUTES.SEARCH.FEED,
  },
  {
    IconName: contactManagerIcon,
    displayName: "Lead_Manager",
    classObj: "button",
    to: ROUTES.SEARCH.LEAD,
  },
  // {
  //   IconName: <FaUserLock size={20} color={"var(--currentThemeColor)"} />,
  //   displayName: "Travel",
  //   classObj: "button",
  //   to: ROUTES.SEARCH.TRAVEL,
  // },
  {
    IconName: documentIcon,
    displayName: "Document",
    classObj: "button",
    to: ROUTES.SEARCH.DOCUMENT,
  },
  {
    IconName: projectsIcon,
    displayName: "Project",
    classObj: "button",
    to: ROUTES.SEARCH.PROJECT,
  },
  {
    IconName: todoBoard,
    displayName: "Workboard",
    classObj: "button",
    to: ROUTES.SEARCH.WORKBOARD,
  },
  {
    IconName: groupsIcon,
    displayName: "Group",
    classObj: "button",
    to: ROUTES.SEARCH.GROUP,
  },
  {
    IconName:expensesIcon,
    displayName: "Expense",
    classObj: "button",
    to: ROUTES.SEARCH.EXPENSE,
  },
  // {
  //   IconName: <FaUserLock size={20} color={"var(--currentThemeColor)"} />,
  //   displayName: "Task",
  //   classObj: "button",
  //   to: ROUTES.SEARCH.TASK,
  // },
  {
    IconName: employeeIcon,
    displayName: "Employee",
    classObj: "button",
    to: ROUTES.SEARCH.EMPLOYEE,
  },
  {
    IconName: eLearningIcon,
    displayName: "e_learning_course",
    classObj: "button",
    to: ROUTES.SEARCH.ELEARNINGCOURSE,
  },
  {
    IconName: eLearningIcon,
    displayName: "e_learning_videos",
    classObj: "button",
    to: ROUTES.SEARCH.ELEARNINGVIDEOS,
  },
  {
    IconName: eLearningIcon,
    displayName: "e_learning_article",
    classObj: "button",
    to: ROUTES.SEARCH.ELEARNINGARTICLE,
  },
  // {
  //   IconName: <FaUserLock size={20} color={"var(--currentThemeColor)"} />,
  //   displayName: "e_learning_quiz",
  //   classObj: "button",
  //   to: ROUTES.SEARCH.ELEARNINGQUIZ,
  // },
  {
    IconName: eLearningIcon,
    displayName: "e_learning_book",
    classObj: "button",
    to: ROUTES.SEARCH.ELEARNINGBOOK,
  },
  {
    IconName: eLearningIcon,
    displayName: "e_learning_tedTalks",
    classObj: "button",
    to: ROUTES.SEARCH.ELEARNINGTEDTALKS,
  },
  // {
  //   IconName: <FaUserLock size={20} color={"var(--currentThemeColor)"} />,
  //   displayName: "rewards",
  //   classObj: "button",
  //   to: ROUTES.SEARCH.REWARDS,
  // },
];
