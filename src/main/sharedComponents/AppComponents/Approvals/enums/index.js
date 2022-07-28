export const statusEnum = {
  ExpenseApproval: [
    {
      label: "In-Process",
      color: "#1a5669",
    },
    {
      label: "Approved",
      color: "#1ECB40",
    },
    {
      label: "Declined",
      color: "#FF0000",
    },
    {
      label: "Resend",
      color: "#1ECB40",
    },
    {
      label: "Inactive",
      color: "#1ECB40",
    },
    {
      label: "NotRequired",
      color: "#1ECB40",
    },
    {
      label: "Cancelled",
      color: "#1ECB40",
    },
    {
      label: "ApprovalRequired",
      color: "#1ECB40",
    },
  ],
};
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
};
export const ApproverType = {
  All: 0,
  User: 1,
  Department: 2,
};
