import React from "react";
import { Route, Routes } from "react-router-dom";
import { ROUTES } from "../../../../utils/routes";
import ExpenseHeader from "../../../../main/features/expenseHeader/view/index";
import Grade from "../../../../main/features/grade/view/index";
import Designation from "../../../../main/features/designation/view/index";
import Appraisal from "../../../../main/features/appraisal/appraisalQuestion/view/index";
import LeaveType from "../../../../main/features/leaveType/view/index";
import SalaryHeader from "../../../../main/features/salaryHeader/view/index";
import EmailConfiguration from "../../../../main/features/emailConfiguration/view/index";
import Allowance from "../../../../main/features/allowance/view/index";
import JobDescription from "../../../../main/features/jobDescription/view/index";
import RewardCategory from "../../../../main/features/reward/rewardCategory/view";
import OfficeTiming from "../../../../main/features/officeTimings/view/index";
import CustomApprovalCategory from "../../../../main/features/customApprovalCategory/view";
import WargningCategory from "../../../../main/features/warningCategory/view";
import AccessRole from "../../../../main/features/accessRole/view/AccessRole";

const AdminRoutes = () => {
	return (
		<Routes>
			<Route path={"/"} element={<AccessRole />} />
			<Route path={ROUTES.HR.ADMINISTRATOR.GRADE} element={<Grade />} />
			<Route
				path={ROUTES.HR.ADMINISTRATOR.DESIGNATION}
				element={<Designation />}
			/>
			<Route
				path={ROUTES.HR.ADMINISTRATOR.APPRASIAL}
				element={<Appraisal />}
			/>
			<Route
				path={ROUTES.HR.ADMINISTRATOR.OFFICETIME}
				element={<OfficeTiming />}
			/>
			<Route
				path={ROUTES.HR.ADMINISTRATOR.LEAVE_TYPES}
				element={<LeaveType />}
			/>
			{/* <Route path={ROUTES.HR.ADMINISTRATOR.USER_TYPES} element={} />  */}
			<Route
				path={ROUTES.HR.ADMINISTRATOR.EXPENSE_HEADERS}
				element={<ExpenseHeader />}
			/>
			<Route
				path={ROUTES.HR.ADMINISTRATOR.SALARY_HEADERS}
				element={<SalaryHeader />}
			/>
			<Route
				path={ROUTES.HR.ADMINISTRATOR.EMAIL_CONFIG}
				element={<EmailConfiguration />}
			/>
			{/* <Route path={ROUTES.HR.ADMINISTRATOR.REQUEST_FOR_RIGHTS} element={} /> */}
			<Route
				path={ROUTES.HR.ADMINISTRATOR.CUSTOM_APPROVAL_CATEGORY}
				element={<CustomApprovalCategory />}
			/>
			<Route
				path={ROUTES.HR.ADMINISTRATOR.ALLOWANCES}
				element={<Allowance />}
			/>
			<Route
				path={ROUTES.HR.ADMINISTRATOR.JOB_SKILLS}
				element={<JobDescription />}
			/>
			<Route
				path={ROUTES.HR.ADMINISTRATOR.REWARD_CATEGORY}
				element={<RewardCategory />}
			/>
			<Route
				path={ROUTES.HR.ADMINISTRATOR.WARNING_CATEGORY}
				element={<WargningCategory />}
			/>
		</Routes>
	);
};

export default AdminRoutes;
