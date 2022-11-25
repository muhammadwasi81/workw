import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ROUTES } from '../../../../utils/routes';
import ExpenseHeader from '../../../../main/features/expenseHeader/view/index';
import Grade from '../../../../main/features/grade/view/index';
import Designation from '../../../../main/features/designation/view/index';
import Appraisal from '../../../../main/features/appraisal/appraisalQuestion/view/index';
import LeaveType from '../../../../main/features/leave/leaveType/view/index';
import SalaryHeader from '../../../../main/features/salaryHeader/view/index';
import EmailConfiguration from '../../../../main/features/emailConfiguration/view/index';
import Allowance from '../../../../main/features/allowance/view/index';
import JobDescription from '../../../../main/features/jobDescription/view/index';
import RewardCategory from '../../../../main/features/reward/rewardCategory/view';
import OfficeTiming from '../../../../main/features/officeTimings/view/index';
import CustomApprovalCategory from '../../../../main/features/customApprovalCategory/view';
import WargningCategory from '../../../../main/features/warning/warningCategory/view';
import AccessRole from '../../../../main/features/accessRole/view/AccessRole';
import BusinessPolicy from '../../businessPolicy/view/BusinessPolicy';
import BusinessLogo from '../../businessLogo/view';
import RebateCategory from '../../rebateCategory/view';
import ComplainCategory from '../../complain/complainCategory/view';
import PayrollGroup from '../../payroll/payrollGroup/view';
import DefaultHiringCriteria from '../../careers/defaultHiringCriteria/view';
import Subsidiary from '../../subsidiary/view';
import SubsidiaryOffice from '../../subsidiaryOffice/view';
import TaxSlab from '../../taxSlabs/view';
import Fiscalyear from '../../fiscalYear/view';
import AssetsCategory from '../../assetsCategory/view/index';

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path={ROUTES.ADMINISTRATOR.ACCESSROLES} element={<AccessRole />} />
      <Route
        path={ROUTES.ADMINISTRATOR.PAYROLL_GROUP}
        element={<PayrollGroup />}
      />
      <Route path={ROUTES.ADMINISTRATOR.FISCAL_YEAR} element={<Fiscalyear />} />
      <Route
        path={ROUTES.ADMINISTRATOR.DEFAULT_HIRING_CRITERIA}
        element={<DefaultHiringCriteria />}
      />
      <Route path={ROUTES.ADMINISTRATOR.TAX_SLAB} element={<TaxSlab />} />
      <Route
        path={ROUTES.ADMINISTRATOR.SUBSIDIARY_OFFICE}
        element={<SubsidiaryOffice />}
      />
      <Route path={ROUTES.ADMINISTRATOR.SUBSIDIARY} element={<Subsidiary />} />
      <Route
        path={ROUTES.ADMINISTRATOR.COMLAIN_CATEGORY}
        element={<ComplainCategory />}
      />
      <Route
        path={ROUTES.ADMINISTRATOR.BUSINESS_POLICY}
        element={<BusinessPolicy />}
      />
      <Route
        path={ROUTES.ADMINISTRATOR.BUSINESS_LOGO}
        element={<BusinessLogo />}
      />
      <Route
        path={ROUTES.ADMINISTRATOR.REBATE_CATEGORY}
        element={<RebateCategory />}
      />
      <Route
        path={ROUTES.ADMINISTRATOR.ASSETS_CATEGORY}
        element={<AssetsCategory />}
      />
      <Route path={ROUTES.ADMINISTRATOR.GRADE} element={<Grade />} />
      <Route
        path={ROUTES.ADMINISTRATOR.DESIGNATION}
        element={<Designation />}
      />
      <Route path={ROUTES.ADMINISTRATOR.APPRASIAL} element={<Appraisal />} />
      <Route
        path={ROUTES.ADMINISTRATOR.OFFICETIME}
        element={<OfficeTiming />}
      />
      <Route path={ROUTES.ADMINISTRATOR.LEAVE_TYPES} element={<LeaveType />} />
      {/* <Route path={ROUTES.ADMINISTRATOR.USER_TYPES} element={} />  */}
      <Route
        path={ROUTES.ADMINISTRATOR.EXPENSE_HEADERS}
        element={<ExpenseHeader />}
      />
      <Route
        path={ROUTES.ADMINISTRATOR.SALARY_HEADERS}
        element={<SalaryHeader />}
      />
      <Route
        path={ROUTES.ADMINISTRATOR.EMAIL_CONFIG}
        element={<EmailConfiguration />}
      />
      {/* <Route path={ROUTES.ADMINISTRATOR.REQUEST_FOR_RIGHTS} element={} /> */}
      <Route
        path={ROUTES.ADMINISTRATOR.CUSTOM_APPROVAL_CATEGORY}
        element={<CustomApprovalCategory />}
      />
      <Route path={ROUTES.ADMINISTRATOR.ALLOWANCES} element={<Allowance />} />
      <Route
        path={ROUTES.ADMINISTRATOR.JOB_SKILLS}
        element={<JobDescription />}
      />
      <Route
        path={ROUTES.ADMINISTRATOR.REWARD_CATEGORY}
        element={<RewardCategory />}
      />
      <Route
        path={ROUTES.ADMINISTRATOR.WARNING_CATEGORY}
        element={<WargningCategory />}
      />
    </Routes>
  );
};

export default AdminRoutes;
