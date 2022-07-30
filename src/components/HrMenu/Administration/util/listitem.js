import { ROUTES } from "../../../../utils/routes";

import { FaBriefcase, FaUserLock } from "react-icons/fa";

import { BsFillPersonCheckFill } from "react-icons/bs";
import { HiCurrencyYen } from "react-icons/hi";
// import {
// 	IoAlertCircleOutline,
// 	IoIosArrowDown,
// 	IoPersonCircleSharp,
// } from "react-icons/io";

import { ImOffice } from "react-icons/im";

import {
  AiFillStar,
  AiFillLike,
  AiFillDollarCircle,
  AiOutlineStar,
} from "react-icons/ai";
import {
  RiMedal2Line,
  RiUser2Fill,
  RiTerminalWindowFill,
  RiMailSettingsFill,
  RiMedalFill,
} from "react-icons/ri";
export const listitem = [
  {
    IconName: (
      <FaUserLock size={20} color={"var(--primary_theme_color_green)"} />
    ),
    displayName: "AccessRole",
    classObj: "button",
    to: ROUTES.ADMINISTRATOR.ADMINISTRATION,
  },
  {
    IconName: (
      <AiFillStar size={20} color={"var(--primary_theme_color_green)"} />
    ),
    displayName: "Grade",
    classObj: "button",
    to: ROUTES.ADMINISTRATOR.GRADE,
  },
  {
    IconName: (
      <RiMedal2Line size={20} color={"var(--primary_theme_color_green)"} />
    ),
    displayName: "Designation",
    classObj: "button",
    to: ROUTES.ADMINISTRATOR.DESIGNATION,
  },
  {
    IconName: (
      <AiFillLike size={20} color={"var(--primary_theme_color_green)"} />
    ),
    displayName: "Appraisal",
    classObj: "button",
    to: ROUTES.ADMINISTRATOR.APPRASIAL,
  },
  {
    IconName: <ImOffice size={20} color={"var(--primary_theme_color_green)"} />,
    displayName: "Office_Timings",
    classObj: "button",
    to: ROUTES.ADMINISTRATOR.OFFICETIME,
  },
  {
    IconName: (
      <RiTerminalWindowFill
        size={20}
        color={"var(--primary_theme_color_green)"}
      />
    ),
    displayName: "Leave_Types",
    classObj: "button",
    to: ROUTES.ADMINISTRATOR.LEAVE_TYPES,
  },
  {
    IconName: (
      <RiUser2Fill size={20} color={"var(--primary_theme_color_green)"} />
    ),
    displayName: "User_Types",
    classObj: "button",
    to: ROUTES.ADMINISTRATOR.USER_TYPES,
  },
  {
    IconName: (
      <HiCurrencyYen size={20} color={"var(--primary_theme_color_green)"} />
    ),
    displayName: "Expense_Headers",
    classObj: "button",
    to: ROUTES.ADMINISTRATOR.EXPENSE_HEADERS,
  },
  {
    IconName: (
      <AiFillDollarCircle
        size={20}
        color={"var(--primary_theme_color_green)"}
      />
    ),
    displayName: "Salary_Headers",
    classObj: "button",
    to: ROUTES.ADMINISTRATOR.SALARY_HEADERS,
  },
  {
    IconName: (
      <RiMailSettingsFill
        size={20}
        color={"var(--primary_theme_color_green)"}
      />
    ),
    displayName: "Email_Configuration",
    classObj: "button",
    to: ROUTES.ADMINISTRATOR.EMAIL_CONFIG,
  },
  // {
  //   IconName: <IoPersonCircleSharp size={20} color={"var(--primary_theme_color_green)"} />,
  //   displayName: "Request_For_Right",
  //   classObj: "button",
  //   to: ROUTES.ADMINISTRATOR.REQUEST_FOR_RIGHTS,
  // },
  {
    IconName: (
      <BsFillPersonCheckFill
        size={20}
        color={"var(--primary_theme_color_green)"}
      />
    ),
    displayName: "Custom_Approval_Category",
    classObj: "button",
    to: ROUTES.ADMINISTRATOR.CUSTOM_APPROVAL_CATEGORY,
  },
  {
    IconName: (
      <AiOutlineStar size={20} color={"var(--primary_theme_color_green)"} />
    ),
    displayName: "Allowances",
    classObj: "button",
    to: ROUTES.ADMINISTRATOR.ALLOWANCES,
  },
  {
    IconName: (
      <AiOutlineStar size={20} color={"var(--primary_theme_color_green)"} />
    ),
    displayName: "Default_Approvals",
    classObj: "button",
    to: ROUTES.ADMINISTRATOR.DEFAULT_APPROVALS,
  },
  {
    IconName: (
      <FaBriefcase size={20} color={"var(--primary_theme_color_green)"} />
    ),
    displayName: "Job_Description",
    classObj: "button",
    to: ROUTES.ADMINISTRATOR.JOB_SKILLS,
  },
  {
    IconName: (
      <RiMedalFill size={20} color={"var(--primary_theme_color_green)"} />
    ),
    displayName: "Reward_Category",
    classObj: "button",
    to: ROUTES.ADMINISTRATOR.REWARD_CATEGORY,
  },
  {
    IconName: (
      <RiMedalFill size={20} color={"var(--primary_theme_color_green)"} />
    ),
    displayName: "Warning_Category",
    classObj: "button",
    to: ROUTES.ADMINISTRATOR.WARNING_CATEGORY,
  },
];
