export const ApprovalsModule = {
  ExpenseApproval: 1,
  ExpenseExecutor: 2,
  ExpenseFinance: 3,
  LeaveApproval: 4,
  TravelApproval: 5,
  TravelAgent: 6,
  WarningApproval: 7,
  UserEducation: 8,
  UserWorkExperience: 9,
  ComplainApproval: 10,
  RewardApproval: 11,
  BonusApproval: 12,
  PromotionApproval: 13,
  RequestForItemApproval: 14,
  LoanApproval: 15,
  CustomApproval: 16,
  FormApproval: 17,
  DocumentApproval: 18,
  SalaryApproval: 19,
  SignupApproval: 20,
  PayrollApproval: 21,
  CareerApproval: 22,
  RequisitionApproval: 23,
  RequisitionFinalApproval: 24,
  RequestForItemAssetControllerApproval: 25,
  ItemApproval: 26,
  AssetApproval: 27,
  ResignationAdminApproval: 28,
  ResignationExitApproval: 29,
  ResignationFinanceApproval: 30,
  ResignationHrApproval: 31,
  ResignationItApproval: 32,
  ResignationOtherApproval: 33,
  ResignationReportingToApproval: 34,
  QuotationApproval: 35,
  QuotationClientApproval: 36,
};

export const ApprovalStatus = {
  InProcess: 1,
  Approved: 2,
  Declined: 3,
  Resend: 4,
  Inactive: 5,
  NotRequired: 6,
  Cancelled: 7,
  ApprovalRequired: 8,
  Hold: 9,
  NoStatus: 0,
};
export const ApproverType = {
  All: 0,
  User: 1,
  Department: 2,
};
export const getStatusLabelAndColor = (module, statusLabels) => {
  return {
    [ApprovalStatus.InProcess]: {
      label: statusLabels.InProcess,
      color: "#1a5669",
    },
    [ApprovalStatus.Approved]: {
      label: statusLabels.Approved,
      color: "#1ECB40",
    },
    [ApprovalStatus.Declined]: {
      label: statusLabels.Declined,
      color: "#FF0000",
    },
    [ApprovalStatus.Resend]: {
      // label: statusLabels.Resend,
      // color: "#008eff",
      label: statusLabels.Cancelled,
      color: "#a40d0d",
    },
    [ApprovalStatus.Inactive]: {
      label: statusLabels.Inactive,
      color: "#1ECB40",
    },
    [ApprovalStatus.NotRequired]: {
      label: statusLabels.NotRequired,
      color: "#1ECB40",
    },
    [ApprovalStatus.Cancelled]: {
      label: statusLabels.Cancelled,
      color: "#a40d0d",
    },
    [ApprovalStatus.ApprovalRequired]: {
      label: statusLabels.ApprovalRequired,
      color: "#1ECB40",
    },
    [ApprovalStatus.NoStatus]: {
      label: "No Status",
      color: "Red",
    },
    [ApprovalStatus.Hold]: { label: statusLabels.Hold, color: "#ffa500" },
  };
};
