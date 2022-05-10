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
			component: lazy(() => import("../components/MainMenu/Home/")),
		},
		{
			path: ROUTES.MESSENGER.DEFAULT,
			component: lazy(() => import("../main/features/Messenger/")),
		},
		// {
		// 	path: ROUTES.GROUP.DEFAULT,
		// 	component: lazy(() => import("../components/MainMenu/Groups/")),
		//
		// },
		// {
		// 	path: ROUTES.PROJECT.DEFAULT,
		// 	component: lazy(() => import("../components/MainMenu/Projects/")),
		//
		// },

		{
			path: `${ROUTES.MAIL.DEFAULT}`,
			component: lazy(() => import("../components/MainMenu/Mail/")),
		},
		// {
		// 	path: `${ROUTES.DOCUMENTS.DEFAULT}`,
		// 	component: lazy(() => import("../components/MainMenu/Documents/")),
		//
		// },
		// {
		// 	path: `${ROUTES.WORK_BOARD.DEFAULT}`,
		// 	component: lazy(() =>
		// 		import("../components/MainMenu/WorkBoard/WorkBoard")
		// 	),
		//
		// },
		// {
		// 	path: `${ROUTES.LEAD_MANAGER.DEFAULT}`,
		// 	component: lazy(() =>
		// 		import("../components/MainMenu/LeadManager/LeadManager")
		// 	),
		//
		// },
		{
			path: `${ROUTES.TASK.DEFAULT}`,
			component: lazy(() => import("../main/features/task/view")),
		},
		{
			path: `${ROUTES.HR.RESIGNATIONS.DEFAULT}`,
			component: lazy(() =>
				import("../components/HrMenu/Resignations/Resignation")
			),
		},
		// {
		// 	path: `${ROUTES.EXPENSE.DEFAULT}`,
		// 	component: lazy(() =>
		// 		import("../components/MainMenu/Expense/Index")
		// 	),
		//
		// },
		{
			path: `${ROUTES.TRAVEL.DEFAULT}`,
			component: lazy(() => import("../main/features/travel/")),
		},

		//Hr Router
		{
			path: `${ROUTES.HR.ADMINISTRATOR.DEFAULT}`,
			component: lazy(() =>
				import("../components/HrMenu/Administration/")
			),
		},
		{
			path: `${ROUTES.HR.EMPLOYEES.DEFAULT}`,
			component: lazy(() => import("../main/features/employee/")),
		},
		// {
		// 	path: `${ROUTES.HR.REWARDS.DEFAULT}`,
		// 	component: lazy(() =>
		// 		import("../main/features/reward/view/Reward")
		// 	),
		// },
		{
			path: `${ROUTES.HR.WARNINGS.DEFAULT}`,
			component: lazy(() => import("../components/HrMenu/Warnings/")),
		},
		{
			path: `${ROUTES.HR.WARNINGS.APPROVALS}`,
			component: lazy(() =>
				import("../components/HrMenu/Warnings/Approvals/")
			),
		},
		{
			path: `${ROUTES.HR.COMPLAINS.DEFAULT}`,
			component: lazy(() => import("../components/HrMenu/Complains/")),
		},
		{
			path: `${ROUTES.HR.BONUS.DEFAULT}`,
			component: lazy(() => import("../components/HrMenu/Bonus/")),
		},
		{
			path: `${ROUTES.HR.REWARDS.DEFAULT}`,
			component: lazy(() =>
				import("../main/features/reward/view/Reward")
			),
		},

		// {
		// path: `${ROUTES.HR.REWARDS.APPROVALS}`,
		// component: lazy(() =>
		// 	import("../main/features/reward/view/BonusApproval/")
		// ),
		//
		// },
	],
};
