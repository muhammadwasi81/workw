export const ProjectFeatureEnums = {
  Feed: 1,
  Schedule: 2,
  WorkBoard: 3,
  Document: 4,
  Task: 5,
  Expense: 6,
  Travel: 7,
  Quotation: 8,
};

export const projectFeatureEnums = [
  {
    label: "Feed",
    value: ProjectFeatureEnums.Feed,
    description: "A board to have open conversations",
  },
  {
    label: "Task",
    value: ProjectFeatureEnums.Task,
    description: "Key tasks and milestones",
  },
  {
    label: "WorkBoard",
    value: ProjectFeatureEnums.WorkBoard,
    description: "A Kanban methodology board to manage tasks",
  },
  {
    label: "Expense",
    value: ProjectFeatureEnums.Expense,
    description: "Expense management",
  },
  {
    label: "Schedule",
    value: ProjectFeatureEnums.Schedule,
    description: "Schedule to manage timelines",
  },
  {
    label: "Travel",
    value: ProjectFeatureEnums.Travel,
    description: "ManagementTravel requirements",
  },
  {
    label: "Documents",
    value: ProjectFeatureEnums.Document,
    description: "documents",
  },

  {
    label: "Quotation",
    value: ProjectFeatureEnums.Quotation,
    description: "Quotation",
  },
];

export const ProjectFeaturePermissionEnum = {
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

export const ProjectFeaturePermissionEnumList = [
  {
    id: ProjectFeaturePermissionEnum.ViewFeed,
    name: "View Feed",
    featureId: ProjectFeatureEnums.Feed,
  },
  {
    id: ProjectFeaturePermissionEnum.PostFeed,
    name: "Post Feed",
    featureId: ProjectFeatureEnums.Feed,
  },
  {
    id: ProjectFeaturePermissionEnum.ViewSchedule,
    name: "View Schedule",
    featureId: ProjectFeatureEnums.Schedule,
  },
  {
    id: ProjectFeaturePermissionEnum.CreateFeature,
    name: "Create Schedule",
    featureId: ProjectFeatureEnums.Schedule,
  },
  {
    id: ProjectFeaturePermissionEnum.ViewExpense,
    name: "View Expense",
    featureId: ProjectFeatureEnums.Expense,
  },
  {
    id: ProjectFeaturePermissionEnum.CreateExpense,
    name: "Create Expense",
    featureId: ProjectFeatureEnums.Expense,
  },
  {
    id: ProjectFeaturePermissionEnum.ViewTask,
    name: "View Task",
    featureId: ProjectFeatureEnums.Task,
  },
  {
    id: ProjectFeaturePermissionEnum.CreateTask,
    name: "Create Task",
    featureId: ProjectFeatureEnums.Task,
  },
  {
    id: ProjectFeaturePermissionEnum.ViewDocument,
    name: "View Document",
    featureId: ProjectFeatureEnums.Document,
  },
  {
    id: ProjectFeaturePermissionEnum.CreateDocument,
    name: "Create Document",
    featureId: ProjectFeatureEnums.Document,
  },
  {
    id: ProjectFeaturePermissionEnum.InviteExternals,
    name: "Invite External",
    featureId: ProjectFeatureEnums.Setting,
  },
  {
    id: ProjectFeaturePermissionEnum.ViewMember,
    name: "View Member",
    featureId: ProjectFeatureEnums.Setting,
  },
  {
    id: ProjectFeaturePermissionEnum.CreateMember,
    name: "Create Member",
    featureId: ProjectFeatureEnums.Setting,
  },
  {
    id: ProjectFeaturePermissionEnum.ViewSummary,
    name: "View Summary",
    featureId: ProjectFeatureEnums.Setting,
  },
  {
    id: ProjectFeaturePermissionEnum.CreateSummary,
    name: "Create Summary",
    featureId: ProjectFeatureEnums.Setting,
  },
  {
    id: ProjectFeaturePermissionEnum.ViewFeature,
    name: "View Feature",
    featureId: ProjectFeatureEnums.Setting,
  },
  {
    id: ProjectFeaturePermissionEnum.CreateFeature,
    name: "Create Feature",
    featureId: ProjectFeatureEnums.Setting,
  },
];

// export const ProjectFeatureEnums = {
//     Feed:1,
//     Schedule:2,
//     WorkBoard:3,
//     Documents:4,
//     Task:5,
//     Expense:6,
//     Travel:7,
//     BudgetApproval:8,
//     Setting:9,
// }

// export const ProjectFeaturePermissionEnum = {
//     ViewFeed:1,
//     PostFeed:2,
//     ViewSchedule:3,
//     CreateSchedule:4,
//     InviteExternals:5,
//     ViewWorkBoard:6,
//     CreateWorkBoard:7,
//     ViewDocument:8,
//     CreateDocument:9,
//     ViewTask:10,
//     CreateTask:11,
//     ViewExpense:12,
//     CreateExpense:13,
//     ViewTravel:14,
//     CreateTravel:15,
//     ViewBudgetApproval:16,
//     CreateBudgetApproval:17,
//     ViewMember:18,
//     CreateMember:19,
//     ExternalMember:20,
//     ViewFeature:21,
//     CreateFeature:22,
//     ViewSummary:23,
//     CreateSummary:24,
//     ViewAccessRole:25,
//     CreateAccessRole:26,
//     ViewProjectStickyNote:27,
//     CreateProjectStickyNote:28
// }

// export const ProjectFeaturePermissionEnumList = [
//   {
//     id: ProjectFeaturePermissionEnum.ViewFeed,
//     name: "View Feed",
//     featureId: ProjectFeatureEnums.Feed,
//   },
//   {
//     id: ProjectFeaturePermissionEnum.PostFeed,
//     name: "Post Feed",
//     featureId: ProjectFeatureEnums.Feed,
//   },
//   {
//     id: ProjectFeaturePermissionEnum.ViewSchedule,
//     name: "View Schedule",
//     featureId: ProjectFeatureEnums.Schedule,
//   },
//   {
//     id: ProjectFeaturePermissionEnum.CreateFeature,
//     name: "Create Schedule",
//     featureId: ProjectFeatureEnums.Schedule,
//   },
//   {
//     id: ProjectFeaturePermissionEnum.ViewExpense,
//     name: "View Expense",
//     featureId: ProjectFeatureEnums.Expense,
//   },
//   {
//     id: ProjectFeaturePermissionEnum.CreateExpense,
//     name: "Create Expense",
//     featureId: ProjectFeatureEnums.Expense,
//   },
//   {
//     id: ProjectFeaturePermissionEnum.ViewTask,
//     name: "View Task",
//     featureId: ProjectFeatureEnums.Task,
//   },
//   {
//     id: ProjectFeaturePermissionEnum.CreateTask,
//     name: "Create Task",
//     featureId: ProjectFeatureEnums.Task,
//   },
//   {
//     id: ProjectFeaturePermissionEnum.ViewDocument,
//     name: "View Document",
//     featureId: ProjectFeatureEnums.Document,
//   },
//   {
//     id: ProjectFeaturePermissionEnum.CreateDocument,
//     name: "Create Document",
//     featureId: ProjectFeatureEnums.Document,
//   },
//   {
//     id: ProjectFeaturePermissionEnum.InviteExternals,
//     name: "Invite External",
//     featureId: ProjectFeatureEnums.Setting,
//   },
//   {
//     id: ProjectFeaturePermissionEnum.ViewMember,
//     name: "View Member",
//     featureId: ProjectFeatureEnums.Setting,
//   },
//   {
//     id: ProjectFeaturePermissionEnum.CreateMember,
//     name: "Create Member",
//     featureId: ProjectFeatureEnums.Setting,
//   },
//   {
//     id: ProjectFeaturePermissionEnum.ViewSummary,
//     name: "View Summary",
//     featureId: ProjectFeatureEnums.Setting,
//   },
//   {
//     id: ProjectFeaturePermissionEnum.CreateSummary,
//     name: "Create Summary",
//     featureId: ProjectFeatureEnums.Setting,
//   },
//   {
//     id: ProjectFeaturePermissionEnum.ViewFeature,
//     name: "View Feature",
//     featureId: ProjectFeatureEnums.Setting,
//   },
//   {
//     id: ProjectFeaturePermissionEnum.CreateFeature,
//     name: "Create Feature",
//     featureId: ProjectFeatureEnums.Setting,
//   },
// ]
