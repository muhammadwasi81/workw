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
import marketPlace from "../../../content/svg/menu/newNavBarIcon/new/marketplace.svg";
import contactManagerIcon from "../../../content/svg/menu/newNavBarIcon/Lead Manager.svg";
import schedulesIcon from "../../../content/svg/menu/newNavBarIcon/Schedules.svg";
import expensesIcon from "../../../content/svg/menu/newNavBarIcon/Expenses.svg";
import travelIcon from "../../../content/svg/menu/newNavBarIcon/Travel.svg";
import eLearningIcon from "../../../content/svg/menu/newNavBarIcon/E Learning.svg";
import customApprovalIcon from "../../../content/svg/menu/newNavBarIcon/Custom Approval.svg";
import promotionIcon from "../../../content/svg/menu/newNavBarIcon/promotionIcon.svg";
import teamIcon from "../../../content/svg/menu/newNavBarIcon/My Team.svg";
import payrollIcon from "../../../content/svg/menu/newNavBarIcon/PayrolIcon.svg";
import employeeIcon from "../../../content/svg/menu/newNavBarIcon/Employees.svg";
import administrator from "../../../content/svg/menu/newNavBarIcon/Administration.svg";
import appraisalsIcon from "../../../content/svg/menu/newNavBarIcon/Appraisals.svg";
import leavesIcon from "../../../content/svg/menu/newNavBarIcon/Leaves.svg";
import companyIcon from "../../../content/svg/menu/newNavBarIcon/companies.svg";
import loanIcon from "../../../content/svg/menu/newNavBarIcon/Loan.svg";
import career from "../../../content/svg/menu/newNavBarIcon/Career.svg";
import resignation from "../../../content/svg/menu/newNavBarIcon/resignation.svg";
import rewardIcon from "../../../content/svg/menu/rewardIcon.svg";
import complainIcon from "../../../content/svg/menu/newNavBarIcon/complainIcon.svg";
import departmentIcon from "../../../content/NewContent/department/departmentIcon.svg";
import bonusIcon from "../../../content/NewContent/bonus/bonus.svg";
import orgChartIcon from "../../../content/svg/menu/newNavBarIcon/Org Chart.svg";
import coaIcon from "../../../content/NewContent/chartOfAccount/coa.svg";
import reportIcon from "../../../content/NewContent/report/report.svg";
import documentIcon from "../../../content/NewContent/Documents/file/folder.svg";
import voucherIcon from "../../../content/NewContent/voucher/voucher.svg";
import requisitionIcon from "../../../content/svg/menu/newNavBarIcon/Employees.svg";
import assetsIcon from "../../../content/svg/menu/newNavBarIcon/assetsIC.svg";
import businessPolicy from "../../../content/svg/menu/newNavBarIcon/businessPolicy.svg";
import salaryIcon from "../../../content/svg/menu/newNavBarIcon/salary.svg";
import assetsAllocationIcon from "../../../content/svg/menu/newNavBarIcon/assetAllocation.svg";
import createAssetsIcon from "../../../content/svg/menu/newNavBarIcon/createassets.svg";
import requestListIcon from "../../../content/svg/menu/newNavBarIcon/requestItems.svg";
import quotationIcon from "../../../content/svg/menu/newNavBarIcon/quotationsIcon.svg";
import chartAccountIcon from "../../../content/svg/menu/newNavBarIcon/chartAccountsIcon.svg";
import { DOMAIN_PREFIX } from "../../../utils/routes";
import { FeaturesEnum } from "../../../utils/Shared/enums/featuresEnums";

const NavMenuList = (notificationCounts) => {
  // const { Direction } = dictionaryList[userLanguage];
  const { userLanguage } = useContext(LanguageChangeContext);
  const label = dictionaryList[userLanguage];

  const menuItems = [
    {
      name: label.navMenuLabel.feed,
      counter: 0,
      to: DOMAIN_PREFIX,
      icon: newsIcon,
      isActive: 1,
      key: label.navMenuLabel.menu,
      featureId: FeaturesEnum.Feed,
      notificationCount: notificationCounts.feed,
    },
    {
      name: label.navMenuLabel.schedules,
      counter: 0,
      to: ROUTES.SCHEDULES.LINK + "?f=cal",
      icon: schedulesIcon,
      isActive: true,
      key: label.navMenuLabel.menu,
      featureId: FeaturesEnum.Schedule,
      notificationCount: notificationCounts.schedule,
    },
    {
      name: label.navMenuLabel.messenger,
      counter: 0,
      to: ROUTES.MESSENGER.DEFAULT,
      icon: messengerIcon,
      isActive: 3,
      key: label.navMenuLabel.menu,
      featureId: FeaturesEnum.Messenger,
      notificationCount: notificationCounts.messenger,
    },
    {
      name: label.navMenuLabel.mailBox,
      counter: 0,
      to: ROUTES.MAIL.ROOT + "/INBOX",
      icon: mailsIcon,
      isActive: 3,
      key: label.navMenuLabel.menu,
      featureId: FeaturesEnum.Mailbox,
      notificationCount: notificationCounts.mailbox,
    },
    {
      name: label.navMenuLabel.leadManager,
      counter: 0,
      to: ROUTES.LEAD_MANAGER.DEFAULT,
      icon: contactManagerIcon,
      isActive: 8,
      key: label.navMenuLabel.menu,
      featureId: FeaturesEnum.Lead,
      notificationCount: notificationCounts.lead,
    },
    {
      name: label.navMenuLabel.customApprovals,
      counter: 0,
      to: ROUTES.CUSTOM_APPROVALS.ROOT,
      icon: customApprovalIcon,
      isActive: 4,
      key: label.navMenuLabel.menu,
      featureId: FeaturesEnum.CustomApproval,
      notificationCount: notificationCounts.customApproval,
    },
    {
      name: label.navMenuLabel.travel,
      counter: 0,
      to: `${ROUTES.TRAVELS}?f=trv`,
      icon: travelIcon,
      isActive: 11,
      key: label.navMenuLabel.menu,
      featureId: FeaturesEnum.Travel,
      notificationCount: notificationCounts.travel,
    },
    {
      name: label.navMenuLabel.docsArchives,
      counter: 0,
      to: ROUTES.DOCUMENTS.DOCUMENT,
      icon: documentIcon,
      // isActive: 6,
      key: label.navMenuLabel.menu,
      featureId: FeaturesEnum.Document,
      notificationCount: notificationCounts.document,
    },
    {
      name: label.navMenuLabel.LD,
      counter: 0,
      icon: eLearningIcon,
      to: ROUTES.ELearning.LINK,
      isActive: true,
      key: label.navMenuLabel.menu,
      featureId: FeaturesEnum.ELearning,
      notificationCount: notificationCounts.eLearning,
    },
    {
      name: label.navMenuLabel.employee,
      counter: 0,
      icon: employeeIcon,
      to: ROUTES.EMPLOYEES.EMPLOYEELINK,
      isActive: true,
      key: label.navMenuLabel.hr,
      featureId: FeaturesEnum.Employees,
    },
    {
      name: label.navMenuLabel.appraisals,
      counter: 0,
      icon: appraisalsIcon,
      to: ROUTES.APPRAISALS.ROOT,
      isActive: true,
      key: label.navMenuLabel.hr,
      featureId: FeaturesEnum.Appraisal,
      notificationCount: notificationCounts.appraisal,
    },
    {
      name: label.navMenuLabel.projects,
      counter: 0,
      to: ROUTES.PROJECT.DEFAULT,
      icon: projectsIcon,
      isActive: true,
      key: label.navMenuLabel.menu,
      featureId: FeaturesEnum.Project,
      notificationCount: notificationCounts.project,
    },
    {
      name: label.navMenuLabel.workBoard,
      counter: 0,
      to: ROUTES.TODO.DEFAULT,
      icon: todoBoard,
      isActive: true,
      key: label.navMenuLabel.menu,
      featureId: FeaturesEnum.Workboard,
      notificationCount: notificationCounts.workboard,
    },
    {
      name: label.navMenuLabel.groups,
      counter: 0,
      to: ROUTES.GROUP.DEFAULT,
      icon: groupsIcon,
      isActive: true,
      key: label.navMenuLabel.menu,
      featureId: FeaturesEnum.Group,
      notificationCount: notificationCounts.group,
    },
    {
      name: label.navMenuLabel.expense,
      counter: 0,
      to: `${ROUTES.EXPENSES.EXPENSES}?f=my`,
      icon: expensesIcon,
      isActive: 10,
      key: label.navMenuLabel.menu,
      featureId: FeaturesEnum.Expense,
      notificationCount: notificationCounts.expense,
    },
    {
      name: label.navMenuLabel.administration,
      counter: 0,
      icon: administrator,
      to: ROUTES.ADMINISTRATOR.ADMINISTRATION,
      isActive: true,
      key: label.navMenuLabel.hr,
      featureId: FeaturesEnum.Administration,
    },

    {
      name: label.navMenuLabel.tasks,
      counter: 0,
      to: `${ROUTES.TASK.ROOT}`,
      icon: taskIcon,
      isActive: 6,
      key: label.navMenuLabel.menu,
      featureId: FeaturesEnum.Task,
      notificationCount: notificationCounts.task,
    },
    {
      name: label.navMenuLabel.promotions,
      counter: 0,
      to: `${ROUTES.PROMOTION.ROOT}`,
      icon: promotionIcon,
      isActive: 7,
      key: label.navMenuLabel.hr,
      featureId: FeaturesEnum.Promotion,
      notificationCount: notificationCounts.promotion,
    },
    {
      name: label.navMenuLabel.warnings,
      counter: 0,
      icon: career,
      to: ROUTES.WARNINGS.WARNING,
      isActive: true,
      key: label.navMenuLabel.hr,
      featureId: FeaturesEnum.Warnings,
      notificationCount: notificationCounts.warning,
    },
    {
      name: label.navMenuLabel.bonus,
      counter: 0,
      icon: bonusIcon,
      to: ROUTES.BONUS.ROOT,
      isActive: true,
      key: label.navMenuLabel.hr,
      featureId: FeaturesEnum.Bonus,
      notificationCount: notificationCounts.bonus,
    },
    {
      name: label.navMenuLabel.orgChart,
      counter: 0,
      icon: orgChartIcon,
      to: ROUTES.OrganizationalChart.ROOT,
      isActive: true,
      key: label.navMenuLabel.hr,
      featureId: FeaturesEnum.OrganizationalChart,
    },

    {
      name: label.navMenuLabel.complains,
      counter: 0,
      icon: complainIcon,
      to: ROUTES.COMPLAINS.ROOT,
      isActive: true,
      key: label.navMenuLabel.hr,
      featureId: FeaturesEnum.Complains,
      notificationCount: notificationCounts.complain,
    },
    {
      name: label.navMenuLabel.rewards,
      counter: 0,
      icon: rewardIcon,
      to: ROUTES.REWARDS.REWARD,
      isActive: true,
      key: label.navMenuLabel.hr,
      featureId: FeaturesEnum.Rewards,
      notificationCount: notificationCounts.reward,
    },
    {
      name: label.navMenuLabel.teams,
      counter: 0,
      icon: teamIcon,
      to: ROUTES.TEAMS.TEAM,
      isActive: true,
      key: label.navMenuLabel.hr,
      featureId: FeaturesEnum.MyTeam,
    },
    {
      name: label.navMenuLabel.leaves,
      counter: 0,
      icon: leavesIcon,
      to: ROUTES.LEAVES.LEAVE,
      isActive: true,
      key: label.navMenuLabel.hr,
      featureId: FeaturesEnum.Leave,
      notificationCount: notificationCounts.leave,
    },
    {
      name: label.navMenuLabel.departments,
      counter: 0,
      icon: departmentIcon,
      to: ROUTES.DEPARTMENTS.DEPARTMENT,
      isActive: true,
      key: label.navMenuLabel.hr,
      featureId: FeaturesEnum.Department,
    },
    {
      name: label.navMenuLabel.jobBoard,
      counter: 0,
      icon: voucherIcon,
      to: ROUTES.JOBS.ROOT,
      isActive: true,
      key: label.navMenuLabel.menu,
      featureId: FeaturesEnum.JobBoard,
    },
    {
      name: label.navMenuLabel.careers,
      counter: 0,
      icon: career,
      to: ROUTES.CAREER.CAREERLINK,
      isActive: true,
      key: label.navMenuLabel.hr,
      featureId: FeaturesEnum.Career,
      notificationCount: notificationCounts.career,
    },
    {
      name: label.navMenuLabel.chartOfAccount,
      counter: 0,
      to: ROUTES.FINANCE.CHART_OF_ACCOUNT.ROOT,
      icon: chartAccountIcon,
      isActive: true,
      key: label.navMenuLabel.finance,
      featureId: FeaturesEnum.ChartofAccount,
    },
    {
      name: label.navMenuLabel.Quotation,
      counter: 0,
      to: ROUTES.QUOTATION.ROOT,
      icon: quotationIcon,
      isActive: true,
      key: label.navMenuLabel.finance,
      featureId: FeaturesEnum.Quotation,
    },
    // {
    //   name: label.navMenuLabel.QuotationClient,
    //   counter: 0,
    //   to: ROUTES.QUOTATIONCLIENT.ROOT,
    //   icon: coaIcon,
    //   isActive: true,
    //   key: label.navMenuLabel.finance,
    // },
    {
      name: label.navMenuLabel.voucher,
      counter: 0,
      to: ROUTES.FINANCE.VOUCHER.ROOT,
      icon: voucherIcon,
      isActive: true,
      key: label.navMenuLabel.finance,
      featureId: FeaturesEnum.Voucher,
    },
    {
      name: label.navMenuLabel.transaction,
      counter: 0,
      to: ROUTES.FINANCE.TRANSACTION.ROOT,
      icon: taskIcon,
      isActive: true,
      key: label.navMenuLabel.finance,
      featureId: FeaturesEnum.Transaction,
    },
    {
      name: label.navMenuLabel.ledgerReport,
      counter: 0,
      to: ROUTES.FINANCE.REPORT.ROOT,
      icon: reportIcon,
      isActive: true,
      key: label.navMenuLabel.finance,
      featureId: FeaturesEnum.Report,
    },
    {
      name: label.navMenuLabel.payroll,
      counter: 0,
      to: ROUTES.PAYROLL.ROOT,
      icon: payrollIcon,
      isActive: true,
      key: label.navMenuLabel.finance,
      featureId: FeaturesEnum.Payroll,
    },
    {
      name: label.navMenuLabel.salary,
      counter: 0,
      to: ROUTES.SALARY.ROOT,
      icon: salaryIcon,
      isActive: true,
      key: label.navMenuLabel.hr,
      featureId: FeaturesEnum.Salary,
      notificationCount: notificationCounts.salary,
    },
    {
      name: label.navMenuLabel.businessPolicy,
      counter: 0,
      to: ROUTES.BUSINESS_POLICY.DEFAULT,
      icon: businessPolicy,
      isActive: true,
      key: label.navMenuLabel.menu,
      featureId: FeaturesEnum.BusinessPolicy,
    },
    {
      name: label.navMenuLabel.form,
      counter: 0,
      to: ROUTES.FORMS.ROOT,
      icon: coaIcon,
      isActive: true,
      key: label.navMenuLabel.menu,
      featureId: FeaturesEnum.Form,
      notificationCount: notificationCounts.form,
    },
    {
      name: label.navMenuLabel.marketPlace,
      counter: 0,
      to: ROUTES.MARKETPLACE.ROOT,
      icon: marketPlace,
      isActive: true,
      key: label.navMenuLabel.menu,
      featureId: FeaturesEnum.Form,
    },
    {
      name: label.navMenuLabel.loan,
      counter: 0,
      icon: loanIcon,
      to: ROUTES.LOAN.LOAN,
      isActive: true,
      key: label.navMenuLabel.hr,
      featureId: FeaturesEnum.Loan,
      notificationCount: notificationCounts.loan,
    },
    {
      name: label.navMenuLabel.resignations,
      counter: 0,
      icon: resignation,
      to: ROUTES.RESIGNATION.RESIGNATION,
      isActive: true,
      key: label.navMenuLabel.hr,
      featureId: FeaturesEnum.Resignation,
      notificationCount: notificationCounts.resignation,
    },
    {
      name: label.navMenuLabel.requisition,
      counter: 0,
      icon: requisitionIcon,
      to: ROUTES.REQUISITION.REQUISITION,
      isActive: true,
      key: label.navMenuLabel.inventory,
      featureId: FeaturesEnum.Requisition,
      notificationCount: notificationCounts.requisition,
    },
    {
      name: label.navMenuLabel.assets,
      counter: 0,
      icon: assetsAllocationIcon,
      to: `${ROUTES.ASSETS.ROOT}`,
      isActive: true,
      key: label.navMenuLabel.inventory,
      featureId: FeaturesEnum.Asset,
    },
    {
      name: label.navMenuLabel.createAssets,
      counter: 0,
      icon: createAssetsIcon,
      to: ROUTES.CREATE_ASSETS.DEFAULT,
      isActive: true,
      key: label.navMenuLabel.inventory,
      featureId: FeaturesEnum.Asset,
    },
    {
      name: label.navMenuLabel.assetsList,
      counter: 0,
      icon: assetsIcon,
      to: ROUTES.ASSETS_TABLE_LIST.DEFAULT,
      isActive: true,
      key: label.navMenuLabel.inventory,
      featureId: FeaturesEnum.Asset,
    },
    {
      name: label.navMenuLabel.requestListItems,
      counter: 0,
      icon: requestListIcon,
      to: ROUTES.REQUEST_LIST_ITEM.DEFAULT,
      isActive: true,
      key: label.navMenuLabel.inventory,
      featureId: FeaturesEnum.Asset,
      notificationCount: notificationCounts.asset,
    },
    {
      name: label.navMenuLabel.companies,
      counter: 0,
      icon: companyIcon,
      to: ROUTES.COMPANIES.ROOT,
      isActive: true,
      key: label.navMenuLabel.workWiseCompanies,
      featureId: FeaturesEnum.Company,
    },
  ];
  return {
    menuItems,
  };
};
export default NavMenuList;
