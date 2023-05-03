export const GroupFeatureEnums = {
  Feed: 1,
  Schedule: 2,
  WorkBoard: 3,
  Document: 4,
  Task: 5,
  Expense: 6,
  Travel: 7,
  Quotation: 8,
};

export const groupFeatureEnums = [
  {
    label: "Feed",
    value: GroupFeatureEnums.Feed,
    description:
      "Share your thoughts, ideas, and updates with your team members.",
  },
  {
    label: "Schedule",
    value: GroupFeatureEnums.Schedule,
    description:
      "Plan your meetings, events, and other activities with your team members.",
  },
  {
    label: "WorkBoard",
    value: GroupFeatureEnums.WorkBoard,
    description:
      "Plan your meetings, events, and other activities with your team members.",
  },
  {
    label: "Document",
    value: GroupFeatureEnums,
    description:
      "Plan your meetings, events, and other activities with your team members.",
  },
  {
    label: "Task",
    value: GroupFeatureEnums.Task,
    description:
      "Plan your meetings, events, and other activities with your team members.",
  },
  {
    label: "Expense",
    value: GroupFeatureEnums.Expense,
    description:
      "Plan your meetings, events, and other activities with your team members.",
  },
  {
    label: "Travel",
    value: GroupFeatureEnums.Travel,
    description:
      "plan your meetings, events, and other activities with your team members.",
  },

  {
    label: "Quotation",
    value: GroupFeatureEnums.Quotation,
    description:
      "Plan your meetings, events, and other activities with your team members.",
  },
];

export const GroupFeaturePermissionEnum = {
  ViewFeed: 1,
  PostFeed: 2,
  ViewSchedule: 3,
  CreateSchedule: 4,
  InviteExternals: 5,
  ViewExpense: 6,
  CreateExpense: 7,
  ViewTask: 8,
  CreateTask: 9,
  ViewDocument: 10,
  CreateDocument: 11,
  ViewMember: 12,
  CreateMember: 13,
  ViewFeature: 14,
  CreateFeature: 15,
  ViewSummary: 16,
  CreateSummary: 17,
};

export const GroupFeaturePermissionEnumList = [
  {
    id: GroupFeaturePermissionEnum.ViewFeed,
    name: "View Feed",
    featureId: GroupFeatureEnums.Feed,
  },
  {
    id: GroupFeaturePermissionEnum.PostFeed,
    name: "Post Feed",
    featureId: GroupFeatureEnums.Feed,
  },
  {
    id: GroupFeaturePermissionEnum.ViewSchedule,
    name: "View Schedule",
    featureId: GroupFeatureEnums.Schedule,
  },
  {
    id: GroupFeaturePermissionEnum.CreateFeature,
    name: "Create Schedule",
    featureId: GroupFeatureEnums.Schedule,
  },
  {
    id: GroupFeaturePermissionEnum.ViewExpense,
    name: "View Expense",
    featureId: GroupFeatureEnums.Expense,
  },
  {
    id: GroupFeaturePermissionEnum.CreateExpense,
    name: "Create Expense",
    featureId: GroupFeatureEnums.Expense,
  },
  {
    id: GroupFeaturePermissionEnum.ViewTask,
    name: "View Task",
    featureId: GroupFeatureEnums.Task,
  },
  {
    id: GroupFeaturePermissionEnum.CreateTask,
    name: "Create Task",
    featureId: GroupFeatureEnums.Task,
  },
  {
    id: GroupFeaturePermissionEnum.ViewDocument,
    name: "View Document",
    featureId: GroupFeatureEnums.Document,
  },
  {
    id: GroupFeaturePermissionEnum.CreateDocument,
    name: "Create Document",
    featureId: GroupFeatureEnums.Document,
  },
  {
    id: GroupFeaturePermissionEnum.InviteExternals,
    name: "Invite External",
    featureId: GroupFeatureEnums.Setting,
  },
  {
    id: GroupFeaturePermissionEnum.ViewMember,
    name: "View Member",
    featureId: GroupFeatureEnums.Setting,
  },
  {
    id: GroupFeaturePermissionEnum.CreateMember,
    name: "Create Member",
    featureId: GroupFeatureEnums.Setting,
  },
  {
    id: GroupFeaturePermissionEnum.ViewSummary,
    name: "View Summary",
    featureId: GroupFeatureEnums.Setting,
  },
  {
    id: GroupFeaturePermissionEnum.CreateSummary,
    name: "Create Summary",
    featureId: GroupFeatureEnums.Setting,
  },
  {
    id: GroupFeaturePermissionEnum.ViewFeature,
    name: "View Feature",
    featureId: GroupFeatureEnums.Setting,
  },
  {
    id: GroupFeaturePermissionEnum.CreateFeature,
    name: "Create Feature",
    featureId: GroupFeatureEnums.Setting,
  },
];
