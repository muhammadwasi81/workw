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
		IconName: <FaUserLock size={20} color={"#1A5669"} />,
		displayName: "AccessRole",
		classObj: "button",
		to: ROUTES.HR.ADMINISTRATOR.ADMINISTRATION,
	},
	{
		IconName: <AiFillStar size={20} color={"#1A5669"} />,
		displayName: "Grade",
		classObj: "button",
		to: ROUTES.HR.ADMINISTRATOR.GRADE,
	},
	{
		IconName: <RiMedal2Line size={20} color={"#1A5669"} />,
		displayName: "Designation",
		classObj: "button",
		to: ROUTES.HR.ADMINISTRATOR.DESIGNATION,
	},
	{
		IconName: <AiFillLike size={20} color={"#1A5669"} />,
		displayName: "Appraisal",
		classObj: "button",
		to: ROUTES.HR.ADMINISTRATOR.APPRASIAL,
	},
	{
		IconName: <ImOffice size={20} color={"#1A5669"} />,
		displayName: "Office_Timings",
		classObj: "button",
		to: ROUTES.HR.ADMINISTRATOR.OFFICETIME,
	},
	{
		IconName: <RiTerminalWindowFill size={20} color={"#1A5669"} />,
		displayName: "Leave_Types",
		classObj: "button",
		to: ROUTES.HR.ADMINISTRATOR.LEAVE_TYPES,
	},
	{
		IconName: <RiUser2Fill size={20} color={"#1A5669"} />,
		displayName: "User_Types",
		classObj: "button",
		to: ROUTES.HR.ADMINISTRATOR.USER_TYPES,
	},
	{
		IconName: <HiCurrencyYen size={20} color={"#1A5669"} />,
		displayName: "Expense_Headers",
		classObj: "button",
		to: ROUTES.HR.ADMINISTRATOR.EXPENSE_HEADERS,
	},
	{
		IconName: <AiFillDollarCircle size={20} color={"#1A5669"} />,
		displayName: "Salary_Headers",
		classObj: "button",
		to: ROUTES.HR.ADMINISTRATOR.SALARY_HEADERS,
	},
	{
		IconName: <RiMailSettingsFill size={20} color={"#1A5669"} />,
		displayName: "Email_Configuration",
		classObj: "button",
		to: ROUTES.HR.ADMINISTRATOR.EMAIL_CONFIG,
	},
	// {
	//   IconName: <IoPersonCircleSharp size={20} color={"#1A5669"} />,
	//   displayName: "Request_For_Right",
	//   classObj: "button",
	//   to: ROUTES.HR.ADMINISTRATOR.REQUEST_FOR_RIGHTS,
	// },
	{
		IconName: <BsFillPersonCheckFill size={20} color={"#1A5669"} />,
		displayName: "Custom_Approval_Category",
		classObj: "button",
		to: ROUTES.HR.ADMINISTRATOR.CUSTOM_APPROVAL_CATEGORY,
	},
	{
		IconName: <AiOutlineStar size={20} color={"#1A5669"} />,
		displayName: "Allowances",
		classObj: "button",
		to: ROUTES.HR.ADMINISTRATOR.ALLOWANCES,
	},
	{
		IconName: <AiOutlineStar size={20} color={"#1A5669"} />,
		displayName: "Default_Approvals",
		classObj: "button",
		to: ROUTES.HR.ADMINISTRATOR.DEFAULT_APPROVALS,
	},
	{
		IconName: <FaBriefcase size={20} color={"#1A5669"} />,
		displayName: "Job_Description",
		classObj: "button",
		to: ROUTES.HR.ADMINISTRATOR.JOB_SKILLS,
	},
	{
		IconName: <RiMedalFill size={20} color={"#1A5669"} />,
		displayName: "Reward_Category",
		classObj: "button",
		to: ROUTES.HR.ADMINISTRATOR.REWARD_CATEGORY,
	},
	{
		IconName: <RiMedalFill size={20} color={"#1A5669"} />,
		displayName: "Warning_Category",
		classObj: "button",
		to: ROUTES.HR.ADMINISTRATOR.WARNING_CATEGORY,
	},
];
