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
      path: ROUTES.NEWSFEED.DETAILS,
      component: lazy(() => import("../main/features/feed/ui/postDetail")),
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
      path: ROUTES.CUSTOM_APPROVALS.DEFAULT,
      component: lazy(() =>
        import("../main/features/CustomApprovals/view/CustomApproval")
      ),
    },
    {
      path: `${ROUTES.TASK.DEFAULT}`,
      component: lazy(() => import("../main/features/task/routes/index")),
    },
    {
      path: `${ROUTES.TRAVEL.DEFAULT}`,
      component: lazy(() => import("../main/features/travel/")),
    },
    {
      path: `${ROUTES.TRAVEL.DETAIL}`,
      component: lazy(() =>
        import("../main/features/travel/view/TravelDetail/TravelDetail")
      ),
    },
    {
      path: `${ROUTES.CAREER.JOB_BY_ID}`,
      component: lazy(() =>
        import("../main/features/careers/view/DetailView/index")
      ),
    },
    {
      path: `${ROUTES.EMPLOYEES.DEFAULT}`,
      component: lazy(() => import("../main/features/employee/")),
    },
    {
      path: `${ROUTES.PROJECT.DEFAULT}`,
      component: lazy(() => import("../main/features/projects/index")),
    },
    {
      path: `${ROUTES.GROUP.DEFAULT}`,
      component: lazy(() => import("../main/features/groups/index")),
    },
    {
      path: `${ROUTES.TODO.DEFAULT}`,
      component: lazy(() => import("../main/features/workboard/index")),
    },
    {
      path: `${ROUTES.WARNINGS.DEFAULT}`,
      component: lazy(() => import("../main/features/warning/view/Warning")),
    },
    {
      path: `${ROUTES.HR.WARNINGS.APPROVALS}`,
      component: lazy(() => import("../components/HrMenu/Warnings/Approvals/")),
    },
    {
      path: `${ROUTES.COMPLAINS.DEFAULT}`,
      component: lazy(() => import("../main/features/complain/view/Complain")),
    },
    {
      path: `${ROUTES.HR.BONUS.DEFAULT}`,
      component: lazy(() => import("../main/features/bonus/view/Bonus")),
    },

    {
      path: `${ROUTES.PROMOTION}`,
      component: lazy(() =>
        import("../main/features/promotion/view/Promotions")
      ),
    },

    //Hr Router
    {
      path: `${ROUTES.ADMINISTRATOR.DEFAULT}`,
      component: lazy(() => import("../main/features/administration")),
    },
    {
      path: `${ROUTES.REWARDS.DEFAULT}`,
      component: lazy(() => import("../main/features/reward/view/Reward")),
    },
    {
      path: `${ROUTES.LEAVES.DEFAULT}`,
      component: lazy(() => import("../main/features/leave/view/Leave")),
    },
    {
      path: `${ROUTES.DEPARTMENTS.DEFAULT}`,
      component: lazy(() => import("../main/features/departments/view/index")),
    },
    {
      path: `${ROUTES.CAREER.DEFAULT}`,
      component: lazy(() => import("../main/features/careers/view/")),
    },
    {
      path: `${ROUTES.CAREER.JOB_DETAIL}`,
      component: lazy(() =>
        import("../main/features/careers/view/DetailView/index")
      ),
    },
    {
      path: `${ROUTES.EXPENSES.DEFAULT}`,
      component: lazy(() => import("../main/features/expense/routes/")),
    },
    {
      path: `${ROUTES.DOCUMENTS.DEFAULT}`,
      component: lazy(() => import("../main/features/documents/view/index")),
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
        import("../main/features/appraisal/appraisalQuestion/view/index");
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
