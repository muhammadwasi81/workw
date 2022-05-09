import { lazy } from "react";
import { Navigate } from "react-router-dom";
import { STRINGS } from "../utils/base";
import { ROUTES } from "../utils/routes";

export const routes = {
	Public: [
		{
			path: STRINGS.ROUTES.AUTH.SIGN_IN,
			component: lazy(() => import("../main/features/auth/view")),
		},
	],

	// Private Route Here
	Private: [
		{
			path: STRINGS.ROUTES.ROOT,
			component: lazy(() => import("../components/MainMenu/Home/")),
		},
		{
			path: STRINGS.ROUTES.MESSENGER.DEFAULT,
			component: lazy(() => import("../main/features/Messenger/")),
		},
		// {
		// 	path: STRINGS.ROUTES.GROUP.DEFAULT,
		// 	component: lazy(() => import("../components/MainMenu/Groups/")),
		//
		// },
		// {
		// 	path: STRINGS.ROUTES.PROJECT.DEFAULT,
		// 	component: lazy(() => import("../components/MainMenu/Projects/")),
		//
		// },

		{
			path: `${STRINGS.ROUTES.MAIL.DEFAULT}`,
			component: lazy(() => import("../components/MainMenu/Mail/")),
		},
		// {
		// 	path: `${STRINGS.ROUTES.DOCUMENTS.DEFAULT}`,
		// 	component: lazy(() => import("../components/MainMenu/Documents/")),
		//
		// },
		// {
		// 	path: `${STRINGS.ROUTES.WORK_BOARD.DEFAULT}`,
		// 	component: lazy(() =>
		// 		import("../components/MainMenu/WorkBoard/WorkBoard")
		// 	),
		//
		// },
		// {
		// 	path: `${STRINGS.ROUTES.LEAD_MANAGER.DEFAULT}`,
		// 	component: lazy(() =>
		// 		import("../components/MainMenu/LeadManager/LeadManager")
		// 	),
		//
		// },
		{
			path: `${STRINGS.ROUTES.TASK.DEFAULT}`,
			component: lazy(() => import("../main/features/task/view")),
		},
		{
			path: `${STRINGS.ROUTES.HR.RESIGNATIONS.DEFAULT}`,
			component: lazy(() =>
				import("../components/HrMenu/Resignations/Resignation")
			),
		},
		// {
		// 	path: `${STRINGS.ROUTES.EXPENSE.DEFAULT}`,
		// 	component: lazy(() =>
		// 		import("../components/MainMenu/Expense/Index")
		// 	),
		//
		// },
		{
			path: `${STRINGS.ROUTES.TRAVEL.DEFAULT}`,
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
			path: `${STRINGS.ROUTES.HR.EMPLOYEES.DEFAULT}`,
			component: lazy(() => import("../main/features/employee/")),
		},
		// {
		// 	path: `${ROUTES.HR.REWARDS.DEFAULT}`,
		// 	component: lazy(() =>
		// 		import("../main/features/reward/view/Reward")
		// 	),
		// },
		{
			path: `${STRINGS.ROUTES.HR.WARNINGS.DEFAULT}`,
			component: lazy(() => import("../components/HrMenu/Warnings/")),
		},
		{
			path: `${STRINGS.ROUTES.HR.WARNINGS.APPROVALS}`,
			component: lazy(() =>
				import("../components/HrMenu/Warnings/Approvals/")
			),
		},
		{
			path: `${STRINGS.ROUTES.HR.COMPLAINS.DEFAULT}`,
			component: lazy(() => import("../components/HrMenu/Complains/")),
		},
		{
			path: `${STRINGS.ROUTES.HR.BONUS.DEFAULT}`,
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
