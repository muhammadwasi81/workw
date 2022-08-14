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
  RequisitionApproval: 13,
  PromotionApproval: 14,
  RequestForItemApproval: 15,
  LoanApproval: 16,
  CustomApproval: 17,
  FormApproval: 18,
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
      label: statusLabels.Resend,
      color: "#008eff",
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
      color: "#1ECB40",
    },
    [ApprovalStatus.ApprovalRequired]: {
      label: statusLabels.ApprovalRequired,
      color: "#1ECB40",
    },
    [ApprovalStatus.Hold]: { label: statusLabels.Hold, color: "#1a5669" },
  };
};
