import { ROUTES, DOMAIN_PREFIX } from "../../../../utils/routes";

import newsIcon from "../../../../content/svg/menu/newNavBarIcon/News Feed.svg";
import contactManagerIcon from "../../../../content/svg/menu/newNavBarIcon/Lead Manager.svg";
import { FaUserLock } from "react-icons/fa";

export const listitem = [
  {
    IconName: <FaUserLock size={20} color={"var(--currentThemeColor)"} />,
    displayName: "feed",
    classObj: "button",
    to: ROUTES.SEARCH.FEED,
  },
  {
    IconName: <FaUserLock size={20} color={"var(--currentThemeColor)"} />,
    displayName: "Lead_Manager",
    classObj: "button",
    to: ROUTES.SEARCH.LEAD,
  },
  {
    IconName: <FaUserLock size={20} color={"var(--currentThemeColor)"} />,
    displayName: "Travel",
    classObj: "button",
    to: ROUTES.SEARCH.TRAVEL,
  },
  {
    IconName: <FaUserLock size={20} color={"var(--currentThemeColor)"} />,
    displayName: "Document",
    classObj: "button",
    to: ROUTES.SEARCH.DOCUMENT,
  },
  {
    IconName: <FaUserLock size={20} color={"var(--currentThemeColor)"} />,
    displayName: "Project",
    classObj: "button",
    to: ROUTES.SEARCH.PROJECT,
  },
  {
    IconName: <FaUserLock size={20} color={"var(--currentThemeColor)"} />,
    displayName: "Workboard",
    classObj: "button",
    to: ROUTES.SEARCH.WORKBOARD,
  },
  {
    IconName: <FaUserLock size={20} color={"var(--currentThemeColor)"} />,
    displayName: "Group",
    classObj: "button",
    to: ROUTES.SEARCH.GROUP,
  },
  {
    IconName: <FaUserLock size={20} color={"var(--currentThemeColor)"} />,
    displayName: "Expense",
    classObj: "button",
    to: ROUTES.SEARCH.EXPENSE,
  },
  {
    IconName: <FaUserLock size={20} color={"var(--currentThemeColor)"} />,
    displayName: "Task",
    classObj: "button",
    to: ROUTES.SEARCH.TASK,
  },
  {
    IconName: <FaUserLock size={20} color={"var(--currentThemeColor)"} />,
    displayName: "Employee",
    classObj: "button",
    to: ROUTES.SEARCH.EMPLOYEE,
  },
  {
    IconName: <FaUserLock size={20} color={"var(--currentThemeColor)"} />,
    displayName: "e_learning_course",
    classObj: "button",
    to: ROUTES.SEARCH.ELEARNINGCOURSE,
  },
  {
    IconName: <FaUserLock size={20} color={"var(--currentThemeColor)"} />,
    displayName: "e_learning_videos",
    classObj: "button",
    to: ROUTES.SEARCH.ELEARNINGVIDEOS,
  },
  {
    IconName: <FaUserLock size={20} color={"var(--currentThemeColor)"} />,
    displayName: "e_learning_article",
    classObj: "button",
    to: ROUTES.SEARCH.ELEARNINGARTICLE,
  },
  {
    IconName: <FaUserLock size={20} color={"var(--currentThemeColor)"} />,
    displayName: "e_learning_quiz",
    classObj: "button",
    to: ROUTES.SEARCH.ELEARNINGQUIZ,
  },
  {
    IconName: <FaUserLock size={20} color={"var(--currentThemeColor)"} />,
    displayName: "e_learning_book",
    classObj: "button",
    to: ROUTES.SEARCH.ELEARNINGBOOK,
  },
  {
    IconName: <FaUserLock size={20} color={"var(--currentThemeColor)"} />,
    displayName: "e_learning_tedTalks",
    classObj: "button",
    to: ROUTES.SEARCH.ELEARNINGTEDTALKS,
  },
  {
    IconName: <FaUserLock size={20} color={"var(--currentThemeColor)"} />,
    displayName: "rewards",
    classObj: "button",
    to: ROUTES.SEARCH.REWARDS,
  },
];
