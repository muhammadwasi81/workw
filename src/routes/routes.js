import { lazy } from "react";
// import { STRINGS } from "../utils/base";
import { ROUTES } from "../utils/routes";

export const routes = {
	Public: [
		{
			path: ROUTES.AUTH.SIGN_IN,
			component: lazy(() => import("../main/features/auth/view")),
		},
	],

	// Private Route Here
	Private: [
		{
			path: ROUTES.ROOT,
			component: lazy(() => import("../main/features/feed/ui/index")),
		},
		{
			path: ROUTES.MESSENGER.DEFAULT,
			component: lazy(() => import("../main/features/Messenger/")),
		},
		// {
		//   path: `${ROUTES.MAIL.DEFAULT}`,
		//   component: lazy(() => import("../components/MainMenu/Mail/")),
		// },
		{
			path: `${ROUTES.TASK.DEFAULT}`,
			component: lazy(() => import("../main/features/task/view")),
		},
		{
			path: `${ROUTES.TRAVEL.DEFAULT}`,
			component: lazy(() => import("../main/features/travel/")),
		},
		{
			path: `${ROUTES.EMPLOYEES.DEFAULT}`,
			component: lazy(() => import("../main/features/employee/")),
		},
		{
			path: `${ROUTES.WARNINGS.DEFAULT}`,
			component: lazy(() =>
				import("../main/features/warning/view/Warning")
			),
		},
		{
			path: `${ROUTES.HR.WARNINGS.APPROVALS}`,
			component: lazy(() =>
				import("../components/HrMenu/Warnings/Approvals/")
			),
		},
		{
			path: `${ROUTES.COMPLAINS.DEFAULT}`,
			component: lazy(() =>
				import("../main/features/complain/view/Complain")
			),
		},
		{
			path: `${ROUTES.HR.BONUS.DEFAULT}`,
			component: lazy(() => import("../components/HrMenu/Bonus/")),
		},

		//Hr Router
		{
			path: `${ROUTES.ADMINISTRATOR.DEFAULT}`,
			component: lazy(() => import("../main/features/administration")),
		},
		{
			path: `${ROUTES.REWARDS.DEFAULT}`,
			component: lazy(() =>
				import("../main/features/reward/view/Reward")
			),
		},
		{
			path: `${ROUTES.LEAVES.DEFAULT}`,
			component: lazy(() => import("../main/features/leave/view/Leave")),
		},
	],
	AdminRoutes: [
		{
			path: `${"/hr/administrator/"},`,
			component: lazy(() => {
				import("../main/features/accessRole/view/AccessRole");
			}),
		},
		{
			path: `${ROUTES.ADMINISTRATOR.GRADE},`,
			component: lazy(() => {
				import("../main/features/grade/view/index");
			}),
		},
		{
			path: `${ROUTES.ADMINISTRATOR.DESIGNATION},`,
			component: lazy(() => {
				import("../main/features/designation/view/index");
			}),
		},

		{
			path: `${ROUTES.ADMINISTRATOR.APPRASIAL},`,
			component: lazy(() => {
				import(
					"../main/features/appraisal/appraisalQuestion/view/index"
				);
			}),
		},
		{
			path: `${ROUTES.ADMINISTRATOR.OFFICETIME},`,
			component: lazy(() => {
				import("../main/features/officeTimings/view/index");
			}),
		},
		{
			path: `${ROUTES.ADMINISTRATOR.LEAVE_TYPES},`,
			component: lazy(() => {
				import("../main/features/leave/leaveType/view/index");
			}),
		},
		{
			path: `${ROUTES.ADMINISTRATOR.EXPENSE_HEADERS},`,
			component: lazy(() => {
				import("../main/features/expenseHeader/view/index");
			}),
		},
		{
			path: `${ROUTES.ADMINISTRATOR.SALARY_HEADERS},`,
			component: lazy(() => {
				import("../main/features/salaryHeader/view/index");
			}),
		},

		{
			path: `${ROUTES.ADMINISTRATOR.EMAIL_CONFIG},`,
			component: lazy(() => {
				import("../main/features/emailConfiguration/view/index");
			}),
		},

		{
			path: `${ROUTES.ADMINISTRATOR.CUSTOM_APPROVAL_CATEGORY},`,
			component: lazy(() => {
				import("../main/features/customApprovalCategory/view");
			}),
		},
		{
			path: `${ROUTES.ADMINISTRATOR.ALLOWANCES},`,
			component: lazy(() => {
				import("../main/features/allowance/view/index");
			}),
		},
		{
			path: `${ROUTES.ADMINISTRATOR.JOB_SKILLS},`,
			component: lazy(() => {
				import("../main/features/jobDescription/view/index");
			}),
		},

		{
			path: `${ROUTES.ADMINISTRATOR.REWARD_CATEGORY},`,
			component: lazy(() => {
				import("../main/features/reward/rewardCategory/view");
			}),
		},
		{
			path: `${ROUTES.ADMINISTRATOR.WARNING_CATEGORY},`,
			component: lazy(() => {
				import("../main/features/warning/warningCategory/view");
			}),
		},
	],
	Rewards: [],
};
