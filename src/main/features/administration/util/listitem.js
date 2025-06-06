import { ROUTES } from "../../../../utils/routes";
import { FaBriefcase, FaUserLock } from "react-icons/fa";
import { BsFillPersonCheckFill } from "react-icons/bs";
import { HiCurrencyYen } from "react-icons/hi";
import { ImOffice } from "react-icons/im";
import {
  AiFillLike,
  AiFillDollarCircle,
  AiOutlineStar,
  AiFillShop,
  AiOutlinePartition,
  AiFillFileImage,
  AiOutlineGroup,
  AiFillGolden,
  AiOutlineCalendar,
  AiOutlineShrink,
  AiFillMoneyCollect,
  AiOutlineReconciliation,
} from "react-icons/ai";
import {
  RiMedal2Line,
  RiUser2Fill,
  RiTerminalWindowFill,
  RiMailSettingsFill,
  RiMedalFill,
} from "react-icons/ri";
import { MdApproval } from "react-icons/md";
import { TiWarning } from "react-icons/ti";
import { TbDiscount2 } from "react-icons/tb";
import { BiNotepad } from "react-icons/bi";
import { GiArmorDowngrade } from "react-icons/gi";

export const listitem = [
  {
    IconName: <FaUserLock size={20} color={"var(--currentThemeColor)"} />,
    displayName: "AccessRole",
    classObj: "button",
    to: ROUTES.ADMINISTRATOR.ACCESSROLES,
  },
  {
    IconName: <GiArmorDowngrade size={20} color={"var(--currentThemeColor)"} />,
    displayName: "Grade",
    classObj: "button",
    to: ROUTES.ADMINISTRATOR.GRADE,
  },

  {
    IconName: <AiFillFileImage size={20} color={"var(--currentThemeColor)"} />,
    displayName: "Business_Logo",
    classObj: "button",
    to: ROUTES.ADMINISTRATOR.BUSINESS_LOGO,
  },
  {
    IconName: (
      <AiOutlineCalendar size={20} color={"var(--currentThemeColor)"} />
    ),
    displayName: "Fiscal_Year",
    classObj: "button",
    to: ROUTES.ADMINISTRATOR.FISCAL_YEAR,
  },
  {
    IconName: <AiOutlineGroup size={20} color={"var(--currentThemeColor)"} />,
    displayName: "Payroll_Group",
    classObj: "button",
    to: ROUTES.ADMINISTRATOR.PAYROLL_GROUP,
  },
  {
    IconName: (
      <AiOutlineReconciliation size={20} color={"var(--currentThemeColor)"} />
    ),
    displayName: "Billing",
    classObj: "button",
    to: ROUTES.ADMINISTRATOR.BILLING,
  },
  {
    IconName: <AiFillShop size={20} color={"var(--currentThemeColor)"} />,
    displayName: "Companies_Policy",
    classObj: "button",
    to: ROUTES.ADMINISTRATOR.COMPANIES_POLICY,
  },

  {
    IconName: <AiFillGolden size={20} color={"var(--currentThemeColor)"} />,
    displayName: "Tax_Slabs_Group",
    classObj: "button",
    to: ROUTES.ADMINISTRATOR.TAX_SLAB,
  },
  {
    IconName: <AiFillGolden size={20} color={"var(--currentThemeColor)"} />,
    displayName: "E_Learning_Category",
    classObj: "button",
    to: ROUTES.ADMINISTRATOR.ELEARNING_CATEGORY,
  },
  // {
  //   IconName: <AiFillGolden size={20} color={'var(--currentThemeColor)'} />,
  //   displayName: 'Tax_Slabs_Group',
  //   classObj: 'button',
  //   to: ROUTES.ADMINISTRATOR.TAX_SLAB_GROUP,
  // },

  {
    IconName: (
      <AiOutlinePartition size={20} color={"var(--currentThemeColor)"} />
    ),
    displayName: "subsidiary",
    classObj: "button",
    to: ROUTES.ADMINISTRATOR.SUBSIDIARY,
  },
  {
    IconName: <AiFillShop size={20} color={"var(--currentThemeColor)"} />,
    displayName: "Subsidiary_Office",
    classObj: "button",
    to: ROUTES.ADMINISTRATOR.SUBSIDIARY_OFFICE,
  },
  {
    IconName: <BiNotepad size={20} color={"var(--currentThemeColor)"} />,
    displayName: "Complain_Category",
    classObj: "button",
    to: ROUTES.ADMINISTRATOR.COMLAIN_CATEGORY,
  },

  {
    IconName: <GiArmorDowngrade size={20} color={"var(--currentThemeColor)"} />,
    displayName: "Custom_Tag",
    classObj: "button",
    to: ROUTES.ADMINISTRATOR.CUSTOMTAG,
  },

  {
    IconName: <AiOutlineShrink size={20} color={"var(--currentThemeColor)"} />,
    displayName: "Default_Hiring_Criteria",
    classObj: "button",
    to: ROUTES.ADMINISTRATOR.DEFAULT_HIRING_CRITERIA,
  },
  {
    IconName: <RiMedal2Line size={20} color={"var(--currentThemeColor)"} />,
    displayName: "Designation",
    classObj: "button",
    to: ROUTES.ADMINISTRATOR.DESIGNATION,
  },
  {
    IconName: <AiFillLike size={20} color={"var(--currentThemeColor)"} />,
    displayName: "Appraisal",
    classObj: "button",
    to: ROUTES.ADMINISTRATOR.APPRASIAL,
  },
  {
    IconName: <ImOffice size={20} color={"var(--currentThemeColor)"} />,
    displayName: "Office_Timings",
    classObj: "button",
    to: ROUTES.ADMINISTRATOR.OFFICETIME,
  },
  {
    IconName: (
      <RiTerminalWindowFill size={20} color={"var(--currentThemeColor)"} />
    ),
    displayName: "Leave_Types",
    classObj: "button",
    to: ROUTES.ADMINISTRATOR.LEAVE_TYPES,
  },
  // {
  //   IconName: <RiUser2Fill size={20} color={"var(--currentThemeColor)"} />,
  //   displayName: "User_Types",
  //   classObj: "button",
  //   to: ROUTES.ADMINISTRATOR.USER_TYPES,
  // },
  {
    IconName: <HiCurrencyYen size={20} color={"var(--currentThemeColor)"} />,
    displayName: "Expense_Headers",
    classObj: "button",
    to: ROUTES.ADMINISTRATOR.EXPENSE_HEADERS,
  },
  {
    IconName: (
      <AiFillDollarCircle size={20} color={"var(--currentThemeColor)"} />
    ),
    displayName: "Salary_Headers",
    classObj: "button",
    to: ROUTES.ADMINISTRATOR.SALARY_HEADERS,
  },
  {
    IconName: (
      <RiMailSettingsFill size={20} color={"var(--currentThemeColor)"} />
    ),
    displayName: "Email_Configuration",
    classObj: "button",
    to: ROUTES.ADMINISTRATOR.EMAIL_CONFIG,
  },
  // {
  //   IconName: <IoPersonCircleSharp size={20} color={"var(--currentThemeColor)"} />,
  //   displayName: "Request_For_Right",
  //   classObj: "button",
  //   to: ROUTES.ADMINISTRATOR.REQUEST_FOR_RIGHTS,
  // },
  {
    IconName: (
      <BsFillPersonCheckFill size={20} color={"var(--currentThemeColor)"} />
    ),
    displayName: "Custom_Approval_Category",
    classObj: "button",
    to: ROUTES.ADMINISTRATOR.CUSTOM_APPROVAL_CATEGORY,
  },

  {
    IconName: <AiOutlineStar size={20} color={"var(--currentThemeColor)"} />,
    displayName: "Allowances",
    classObj: "button",
    to: ROUTES.ADMINISTRATOR.ALLOWANCES,
  },
  {
    IconName: <MdApproval size={20} color={"var(--currentThemeColor)"} />,
    displayName: "Default_Approvals",
    classObj: "button",
    to: ROUTES.ADMINISTRATOR.DEFAULT_APPROVALS,
  },
  {
    IconName: <FaBriefcase size={20} color={"var(--currentThemeColor)"} />,
    displayName: "Job_Description",
    classObj: "button",
    to: ROUTES.ADMINISTRATOR.JOB_SKILLS,
  },
  {
    IconName: <TiWarning size={20} color={"var(--currentThemeColor)"} />,
    displayName: "Reward_Category",
    classObj: "button",
    to: ROUTES.ADMINISTRATOR.REWARD_CATEGORY,
  },
  {
    IconName: <RiMedalFill size={20} color={"var(--currentThemeColor)"} />,
    displayName: "Warning_Category",
    classObj: "button",
    to: ROUTES.ADMINISTRATOR.WARNING_CATEGORY,
  },
  {
    IconName: <TbDiscount2 size={20} color={"var(--currentThemeColor)"} />,
    displayName: "Rebate_Category",
    classObj: "button",
    to: ROUTES.ADMINISTRATOR.REBATE_CATEGORY,
  },
  {
    IconName: <AiOutlineStar size={20} color={"var(--currentThemeColor)"} />,
    displayName: "GRADE_ALLOWANCES",
    classObj: "button",
    to: ROUTES.ADMINISTRATOR.GRADE_ALLOWANCES,
  },
  {
    IconName: (
      <AiFillMoneyCollect size={20} color={"var(--currentThemeColor)"} />
    ),
    displayName: "Assets_Category",
    classObj: "button",
    to: ROUTES.ADMINISTRATOR.ASSETS_CATEGORY,
  },
];
