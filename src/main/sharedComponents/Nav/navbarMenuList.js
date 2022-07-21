import { useContext } from "react";
import { LanguageChangeContext } from "../../../utils/localization/localContext/LocalContext";
import { dictionaryList } from "../../../utils/localization/languages";
import { ROUTES } from "../../../utils/routes";
import newsIcon from "../../../content/svg/menu/newNavBarIcon/News Feed.svg";
import mailsIcon from "../../../content/svg/menu/newNavBarIcon/Mail Box.svg";
import messengerIcon from "../../../content/svg/menu/newNavBarIcon/Messenger.svg";
import groupsIcon from "../../../content/svg/menu/newNavBarIcon/Groups.svg";
import projectsIcon from "../../../content/svg/menu/newNavBarIcon/Projects.svg";
import taskIcon from "../../../content/svg/menu/newNavBarIcon/Tasks.svg";
import todoBoard from "../../../content/svg/menu/newNavBarIcon/Work Board.svg";
import contactManagerIcon from "../../../content/svg/menu/newNavBarIcon/Lead Manager.svg";
import schedulesIcon from "../../../content/svg/menu/newNavBarIcon/Schedules.svg";
import expensesIcon from "../../../content/svg/menu/newNavBarIcon/Expenses.svg";
import travelIcon from "../../../content/svg/menu/newNavBarIcon/Travel.svg";
import documentsIcon from "../../../content/svg/menu/newNavBarIcon/Docs-Archives.svg";
import eLearningIcon from "../../../content/svg/menu/newNavBarIcon/E Learning.svg";
import inventory from "../../../content/svg/menu/newNavBarIcon/Inventory.svg";
import customApprovalIcon from "../../../content/svg/menu/newNavBarIcon/Custom Approval.svg";
import teamIcon from "../../../content/svg/menu/newNavBarIcon/My Team.svg";
import orgChartIcon from "../../../content/svg/menu/newNavBarIcon/Org Chart.svg";
import payRollIcon from "../../../content/svg/menu/newNavBarIcon/Payroll.svg";
import employeeIcon from "../../../content/svg/menu/newNavBarIcon/Employees.svg";
import administrator from "../../../content/svg/menu/newNavBarIcon/Administration.svg";
import appraisalsIcon from "../../../content/svg/menu/newNavBarIcon/Appraisals.svg";
import leavesIcon from "../../../content/svg/menu/newNavBarIcon/Leaves.svg";
import loanIcon from "../../../content/svg/menu/newNavBarIcon/Loan.svg";
import holiday_event from "../../../content/svg/menu/newNavBarIcon/Holidays.svg";
import career from "../../../content/svg/menu/newNavBarIcon/Career.svg";
import resignation from "../../../content/svg/menu/newNavBarIcon/resignation.svg";
import rewardIcon from "../../../content/svg/menu/rewardIcon.svg";
import complainIcon from "../../../content/svg/menu/newNavBarIcon/complainIcon.svg";
import departmentIcon from "../../../content/NewContent/department/departmentIcon.svg";
import bonusIcon from "../../../content/NewContent/bonus/bonus.svg";

import { DOMAIN_PREFIX } from "../../../utils/routes";
const NavMenuList = () => {
  const { userLanguage } = useContext(LanguageChangeContext);
  const label = dictionaryList[userLanguage];
  const { Direction } = dictionaryList[userLanguage];
  const navMenuData = [
    {
      name: label.navMenuLabel.feed,
      counter: 0,
      to: DOMAIN_PREFIX,
      icon: newsIcon,
      isActive: 1,
    },
    {
      name: label.navMenuLabel.expense,
      counter: 0,
      to: `${ROUTES.EXPENSES.EXPENSES}?f=my`,
      icon: expensesIcon,
      isActive: 10,
      key: label.navMenuLabel.hr,
    },
    {
      name: label.navMenuLabel.travel,
      counter: 0,
      to: `${ROUTES.TRAVELS}`,
      icon: travelIcon,
      isActive: 11,
      key: label.navMenuLabel.hr,
    },
    {
      name: label.navMenuLabel.travel,
      counter: 0,
      to: `${ROUTES.TRAVELS}?f=trv`,
      icon: travelIcon,
      isActive: 11,
    },
  ];
  const navHrMenuData = [
    {
      name: label.navMenuLabel.messenger,
      counter: 0,
      to: ROUTES.MESSENGER.DEFAULT,
      icon: messengerIcon,
      isActive: 3,
      key: label.navMenuLabel.menu,
    },
    {
      name: label.navMenuLabel.docsArchives,
      counter: 0,
      to: ROUTES.DOCUMENTS.DOCUMENT,
      icon: messengerIcon,
      // isActive: 6,
      key: label.navMenuLabel.hr,
    },
    {
      name: label.navMenuLabel.customApprovals,
      counter: 0,
      to: ROUTES.CUSTOM_APPROVALS.DEFAULT,
      icon: customApprovalIcon,
      isActive: 4,
      key: label.navMenuLabel.menu,
    },
    {
      name: label.navMenuLabel.travel,
      counter: 0,
      to: `${ROUTES.TRAVELS}?f=trv`,
      icon: travelIcon,
      isActive: 11,
      key: label.navMenuLabel.hr,
    },
    {
      name: label.navMenuLabel.feed,
      counter: 0,
      to: DOMAIN_PREFIX,
      icon: newsIcon,
      isActive: 1,
      key: label.navMenuLabel.menu,
    },
    {
      name: label.navMenuLabel.employee,
      counter: 0,
      icon: employeeIcon,
      to: ROUTES.EMPLOYEES.EMPLOYEELINK,
      isActive: true,
      key: label.navMenuLabel.hr,
    },
    {
      name: label.navMenuLabel.projects,
      counter: 0,
      to: ROUTES.PROJECT.DEFAULT,
      icon: projectsIcon,
      isActive: true,
      key: label.navMenuLabel.menu,
    },
    {
      name: label.navMenuLabel.workBoard,
      counter: 0,
      to: ROUTES.TODO.DEFAULT,
      icon: todoBoard,
      isActive: true,
      key: label.navMenuLabel.menu,
    },
    {
      name: label.navMenuLabel.groups,
      counter: 0,
      to: ROUTES.GROUP.DEFAULT,
      icon: groupsIcon,
      isActive: true,
      key: label.navMenuLabel.menu,
    },
    {
      name: label.navMenuLabel.expense,
      counter: 0,
      to: `${ROUTES.EXPENSES.EXPENSES}?f=my`,
      icon: expensesIcon,
      isActive: 10,
      key: label.navMenuLabel.hr,
    },
    {
      name: label.navMenuLabel.administration,
      counter: 0,
      icon: administrator,
      to: ROUTES.ADMINISTRATOR.ADMINISTRATION,
      isActive: true,
      key: label.navMenuLabel.hr,
    },
    {
      name: label.navMenuLabel.tasks,
      counter: 0,
      to: `${ROUTES.TASKS}`,
      icon: taskIcon,
      isActive: 6,
      key: label.navMenuLabel.hr,
    },
    {
      name: label.navMenuLabel.promotions,
      counter: 0,
      to: `${ROUTES.PROMOTION}`,
      icon: customApprovalIcon,
      isActive: 7,
      key: label.navMenuLabel.hr,
    },
    {
      name: label.navMenuLabel.warnings,
      counter: 0,
      icon: career,
      to: ROUTES.WARNINGS.WARNING,
      isActive: true,
      key: label.navMenuLabel.hr,
    },
    {
      name: label.navMenuLabel.bonus,
      counter: 0,
      icon: bonusIcon,
      to: ROUTES.BONUS.DEFAULT,
      isActive: true,
      key: label.navMenuLabel.hr,
    },
    {
      name: label.navMenuLabel.complains,
      counter: 0,
      icon: complainIcon,
      to: ROUTES.COMPLAINS.COMPLAIN,
      isActive: true,
      key: label.navMenuLabel.hr,
    },
    {
      name: label.navMenuLabel.rewards,
      counter: 0,
      icon: rewardIcon,
      to: ROUTES.REWARDS.REWARD,
      isActive: true,
      key: label.navMenuLabel.hr,
    },
    {
      name: label.navMenuLabel.leaves,
      counter: 0,
      icon: leavesIcon,
      to: ROUTES.LEAVES.LEAVE,
      isActive: true,
      key: label.navMenuLabel.hr,
    },
    {
      name: label.navMenuLabel.departments,
      counter: 0,
      icon: departmentIcon,
      to: ROUTES.DEPARTMENTS.DEPARTMENT,
      isActive: true,
      key: label.navMenuLabel.hr,
    },
    {
      name: label.navMenuLabel.careers,
      counter: 0,
      icon: career,
      to: ROUTES.CAREER.CAREERLINK,
      isActive: true,
      key: label.navMenuLabel.hr,
    },
    {
      name: label.navMenuLabel.loan,
      counter: 0,
      icon: loanIcon,
      to: ROUTES.LOAN.LOAN,
      isActive: true,
      key: label.navMenuLabel.hr,
    },
    {
      name: label.navMenuLabel.resignations,
      counter: 0,
      icon: resignation,
      to: ROUTES.RESIGNATION.RESIGNATION,
      isActive: true,
      key: label.navMenuLabel.hr,
    },
  ];
  return { navMenuData, navHrMenuData };
};
export default NavMenuList;
