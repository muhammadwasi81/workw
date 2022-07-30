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
export const getStatusLabelAndColor = (module) => {
  return {
    [ApprovalStatus.InProcess]: { label: "In-Process", color: "#1a5669" },
    [ApprovalStatus.Approved]: {
      label: "Approved",
      color: "#1ECB40",
    },
    [ApprovalStatus.Declined]: {
      label: "Declined",
      color: "#FF0000",
    },
    [ApprovalStatus.Resend]: {
      label: "Resend",
      color: "#1ECB40",
    },
    [ApprovalStatus.Inactive]: {
      label: "Inactive",
      color: "#1ECB40",
    },
    [ApprovalStatus.NotRequired]: {
      label: "NotRequired",
      color: "#1ECB40",
    },
    [ApprovalStatus.Cancelled]: {
      label: "Cancelled",
      color: "#1ECB40",
    },
    [ApprovalStatus.ApprovalRequired]: {
      label: "ApprovalRequired",
      color: "#1ECB40",
    },
    [ApprovalStatus.Hold]: { label: "Hold", color: "#1a5669" },
  };
};
