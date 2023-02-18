
export const FeaturesEnum = {
  Feed:1,
  Mailbox:2,
  Messenger:3,
  Group:4,
  Project:5,
  Task:6,
  Workboard:7,
  Lead:8,
  Expense:9,
  Schedule:10,
  Travel:11,
  Document:12,
  ELearning:13,
  Asset:14,
  CustomApproval:15,
  Employees:16,
  Administration:17,
  Appraisal:18,
  Department:19,
  Leave:20,
  Loan:21,
  Holiday:22,
  Career:23,
  AudioCalling:24,
  VideoCalling:25,
  Salary:26,
  Attendance:27,
  Requisition:28,
  Payroll:29,
  Rewards:30,
  Complains:31,
  Warnings:32,
  Bonus:33,
  Promotion:34,
  OrganizationalChart:35,
  MyTeam:36,
  JobBoard:37,
  Form:38,
  Resignation:39,
  BusinessPolicy:40,
  ChartofAccount:41,
  Voucher:42,
  Quotation:43,
  Company:44,
}

export const  FeaturePermissionEnum =
{
  ViewFeed:1,
  PostFeed:2,
  ViewMailbox:3,
  ViewMessenger:4,
  ViewGroup:5,
  CreateGroup:6,
  ViewProject:7,
  CreateProject:8,
  ViewTask:9,
  CreateTask:10,
  ViewWorkboard:11,
  CreateWorkboard:12,
  ViewLeadManager:13,
  CreateLeadManagerGroup:14,
  ViewExpense:15,
  CreateExpense:16,
  ViewSchedule:17,
  CreateSchedule:18,
  InviteExternals:19,
  ViewTravel:20,
  CreateTravel:21,
  ViewDocument:22,
  CreateDocument:23,
  ViewElearning:24,
  CreateCourse:25,
  CreateQuiz:26,
  CreateeBooks:27,
  CreateTedTalks:28,
  CreateVideos:29,
  ViewAsset:30,
  CreateAsset:31,
  ViewCustomApproval:32,
  CreateCustomApproval:33,
  ViewEmployees:34,
  CreateEmployees:35,
  UpdateEmployees:36,
  DisableEmployees:37,
  AccessRole:38,
  Grade:39,
  BusinessLogo:40,
  FiscalYear:41,
  PayrollGroup:42,
  TaxSlabsGroup:43,
  eLearningCategory:44,
  Subsidiary:45,
  SubsidiaryOffice:46,
  ComplainCategory:47,
  DefaultHiringCriteria:48,
  Designation:49,
  Appraisal:50,
  OfficeTimings:51,
  LeaveTypes:52,
  ExpenseHeader:53,
  SalaryHeader:54,
  EmailConfiguration:55,
  ViewAppraisal:56,
  CreateAppraisal:57,
  ViewDepartment:58,
  CreateDepartment:59,
  ViewLeave:60,
  CreateLeave:61,
  ViewLoan:62,
  CreateLoan:63,
  ViewHoliday:64,
  CreateHoliday:65,
  ViewCareer:66,
  CreateCareer:67,
  ViewSalary:68,
  CreateSalary:69,
  ViewAttendanceCheckIn:70,
  ViewRequisition:71,
  CreateRequisition:72,
  ViewPayroll:73,
  CreatePayroll:74,
  ViewRewards:75,
  CreateRewards:76,
  ViewComplains:77,
  CreateComplains:78,
  ViewWarnings:79,
  CreateWarnings:80,
  ViewBonus:81,
  CreateBonus:82,
  ViewPromotion:83,
  CreatePromotion:84,
  ViewOrganizationalChart:85,
  ViewMyTeam:86,
  ViewJobBoard:87,
  ViewForm:88,
  CreateForm:89,
  ViewResignation:90,
  CreateResignation:91,
  ViewBusinessPolicy:92,
  CreateBusinessPolicy:93,
  ViewChartOfAccount:94,
  CreateChartOfAccount:95,
  ViewVouchers:96,
  CreateVouchers:97,
  ViewQuotation:98,
  CreateQuotation:99,
  ViewCompany:100,
}

export const FeaturePermissionEnumList=[
  {
      id:FeaturePermissionEnum.ViewFeed,
      name:"View Feed",
      featureId:FeaturesEnum.Feed
  },
  {
    id:FeaturePermissionEnum.PostFeed,
    name:"Post Feed",
    featureId:FeaturesEnum.Feed
  },
  {
    id:FeaturePermissionEnum.ViewMailbox,
    name:"View Mailbox",
    featureId:FeaturesEnum.Mailbox
  },
  {
    id:FeaturePermissionEnum.ViewDocument,
    name:"View Document",
    featureId:FeaturesEnum.Document
  },
  {
    id:FeaturePermissionEnum.ViewMessenger,
    name:"View Document",
    featureId:FeaturesEnum.Messenger
  },
  {
    id:FeaturePermissionEnum.ViewRewards,
    name:"View Reward",
    featureId:FeaturesEnum.Rewards
  },
  {
    id:FeaturePermissionEnum.CreateRewards,
    name:"Create Reward",
    featureId:FeaturesEnum.Rewards
  },
  {
    id:FeaturePermissionEnum.ViewLoan,
    name:"View Loan",
    featureId:FeaturesEnum.Loan
  },
  {
    id:FeaturePermissionEnum.CreateLoan,
    name:"Create Loan",
    featureId:FeaturesEnum.Loan
  },
  {
    id:FeaturePermissionEnum.ViewCustomApproval,
    name:"View Custom Approval",
    featureId:FeaturesEnum.CustomApproval
  },
  {
    id:FeaturePermissionEnum.CreateCustomApproval,
    name:"Create Custom Approval",
    featureId:FeaturesEnum.CustomApproval
  },
  {
    id:FeaturePermissionEnum.ViewGroup,
    name:"View Group",
    featureId:FeaturesEnum.Group
  },
  {
    id:FeaturePermissionEnum.CreateGroup,
    name:"Create Group",
    featureId:FeaturesEnum.Group
  },
  {
    id:FeaturePermissionEnum.ViewComplains,
    name:"View Complains",
    featureId:FeaturesEnum.Complains
  },
  {
    id:FeaturePermissionEnum.CreateComplains,
    name:"Create Complain",
    featureId:FeaturesEnum.Complains
  },
  {
    id:FeaturePermissionEnum.ViewAsset,
    name:"View Asset",
    featureId:FeaturesEnum.Asset
  },
  {
    id:FeaturePermissionEnum.CreateAsset,
    name:"Create Asset",
    featureId:FeaturesEnum.Asset
  },
  {
    id:FeaturePermissionEnum.ViewAppraisal,
    name:"View Appraisal",
    featureId:FeaturesEnum.Appraisal
  },
  {
    id:FeaturePermissionEnum.CreateAppraisal,
    name:"Create Appraisal",
    featureId:FeaturesEnum.Appraisal
  },
  {
    id:FeaturePermissionEnum.ViewBonus,
    name:"View Bonus",
    featureId:FeaturesEnum.Bonus
  },
  {
    id:FeaturePermissionEnum.CreateBonus,
    name:"Create Bonus",
    featureId:FeaturesEnum.Bonus
  },
  {
    id:FeaturePermissionEnum.ViewCareer,
    name:"View Career",
    featureId:FeaturesEnum.Career
  },
  {
    id:FeaturePermissionEnum.CreateCareer,
    name:"Create Career",
    featureId:FeaturesEnum.Career
  },
  {
    id:FeaturePermissionEnum.ViewDepartment,
    name:"View Department",
    featureId:FeaturesEnum.Department
  },
  {
    id:FeaturePermissionEnum.CreateDepartment,
    name:"Create Department",
    featureId:FeaturesEnum.Department
  },
  {
    id:FeaturePermissionEnum.ViewElearning,
    name:"View eLearning",
    featureId:FeaturesEnum.ELearning
  },
  {
    id:FeaturePermissionEnum.ViewEmployees,
    name:"View Employee",
    featureId:FeaturesEnum.Employees
  },
  {
    id:FeaturePermissionEnum.CreateEmployees,
    name:"Create Employee",
    featureId:FeaturesEnum.Employees
  },
  {
    id:FeaturePermissionEnum.ViewExpense,
    name:"View Expense",
    featureId:FeaturesEnum.Expense
  },
  {
    id:FeaturePermissionEnum.CreateExpense,
    name:"Create Expense",
    featureId:FeaturesEnum.Expense
  },
  {
    id:FeaturePermissionEnum.ViewJobBoard,
    name:"View Job Board",
    featureId:FeaturesEnum.JobBoard
  },
  {
    id:FeaturePermissionEnum.ViewLeadManager,
    name:"View Lead Manager",
    featureId:FeaturesEnum.Lead
  },
  {
    id:FeaturePermissionEnum.CreateLeadManagerGroup,
    name:"View Lead Manager Group",
    featureId:FeaturesEnum.Lead
  },
  {
    id:FeaturePermissionEnum.ViewLeave,
    name:"View Leave",
    featureId:FeaturesEnum.Leave
  },
  {
    id:FeaturePermissionEnum.CreateLeave,
    name:"Create Leave",
    featureId:FeaturesEnum.Leave
  },
  {
    id:FeaturePermissionEnum.ViewProject,
    name:"View Project",
    featureId:FeaturesEnum.Project
  },
  {
    id:FeaturePermissionEnum.CreateProject,
    name:"Create Project",
    featureId:FeaturesEnum.Project
  },
  {
    id:FeaturePermissionEnum.ViewRequisition,
    name:"View Requisition",
    featureId:FeaturesEnum.Requisition
  },
  {
    id:FeaturePermissionEnum.CreateRequisition,
    name:"Create Requisition",
    featureId:FeaturesEnum.Requisition
  },
  {
    id:FeaturePermissionEnum.ViewPromotion,
    name:"View Promotion",
    featureId:FeaturesEnum.Promotion
  },
  {
    id:FeaturePermissionEnum.CreatePromotion,
    name:"Create Promotion",
    featureId:FeaturesEnum.Promotion
  },
  {
    id:FeaturePermissionEnum.ViewOrganizationalChart,
    name:"View Org Chart",
    featureId:FeaturesEnum.OrganizationalChart
  },
  {
    id:FeaturePermissionEnum.ViewSchedule,
    name:"View Schedule",
    featureId:FeaturesEnum.Schedule
  },
  {
    id:FeaturePermissionEnum.CreateSchedule,
    name:"Create Schedule",
    featureId:FeaturesEnum.Schedule
  },
  {
    id:FeaturePermissionEnum.ViewTask,
    name:"View Task",
    featureId:FeaturesEnum.Task
  },
  {
    id:FeaturePermissionEnum.CreateTask,
    name:"Create Task",
    featureId:FeaturesEnum.Task
  },
  {
    id:FeaturePermissionEnum.ViewTravel,
    name:"View Travel",
    featureId:FeaturesEnum.Travel
  },
  {
    id:FeaturePermissionEnum.CreateTravel,
    name:"Create Travel",
    featureId:FeaturesEnum.Travel
  },
  {
    id:FeaturePermissionEnum.ViewWarnings,
    name:"View Warning",
    featureId:FeaturesEnum.Warnings
  },
  {
    id:FeaturePermissionEnum.CreateWarnings,
    name:"Create Warning",
    featureId:FeaturesEnum.Warnings
  },
  {
    id:FeaturePermissionEnum.ViewWorkboard,
    name:"View Workboard",
    featureId:FeaturesEnum.Workboard
  },
  {
    id:FeaturePermissionEnum.CreateWorkboard,
    name:"Create Workboard",
    featureId:FeaturesEnum.Workboard
  },
  {
    id:FeaturePermissionEnum.ViewChartOfAccount,
    name:"View Chart Of Account",
    featureId:FeaturesEnum.ChartofAccount
  },
  {
    id:FeaturePermissionEnum.CreateChartOfAccount,
    name:"Create Chart Of Account",
    featureId:FeaturesEnum.ChartofAccount
  },
  {
    id:FeaturePermissionEnum.ViewVouchers,
    name:"View Vouchers",
    featureId:FeaturesEnum.Voucher
  },
  {
    id:FeaturePermissionEnum.CreateVouchers,
    name:"Create Vouchers",
    featureId:FeaturesEnum.Voucher
  },
  {
    id:FeaturePermissionEnum.ViewBusinessPolicy,
    name:"View Business Policy",
    featureId:FeaturesEnum.BusinessPolicy
  },
  {
    id:FeaturePermissionEnum.ViewPayroll,
    name:"View Payroll",
    featureId:FeaturesEnum.Payroll
  },
  {
    id:FeaturePermissionEnum.CreatePayroll,
    name:"Create Payroll",
    featureId:FeaturesEnum.Payroll
  },
  {
    id:FeaturePermissionEnum.ViewQuotation,
    name:"View Quotation",
    featureId:FeaturesEnum.Quotation
  },
  {
    id:FeaturePermissionEnum.CreateQuotation,
    name:"Create Quotation",
    featureId:FeaturesEnum.Quotation
  },
  {
    id:FeaturePermissionEnum.ViewCompany,
    name:"View Company",
    featureId:FeaturesEnum.Company
  },
  {
    id:FeaturePermissionEnum.ViewResignation,
    name:"View Resignation",
    featureId:FeaturesEnum.Resignation
  },
  {
    id:FeaturePermissionEnum.CreateResignation,
    name:"Create Resignation",
    featureId:FeaturesEnum.Resignation
  },

  
]

export const FeaturesEnumList = [
  {
    label: "Feed",
    value: FeaturesEnum.Feed,
    //psermissons:FeaturePermissionEnumList.filter(x=>x.featureId===FeaturesEnum.Feed)
    
  },
  {
    label: "Mailbox",
    value: FeaturesEnum.Mailbox,
  },
  {
    label: "Messenger",
    value: FeaturesEnum.Messenger,
  },
  {
      label: "Group",
      value: 4,
  },
  {
      label: "Project",
      value: 5,
  },
  {
      label: "Task",
      value: 6,
  },
  {
      label: "WorkBoard",
      value: 7,
  },
  {
      label: "Lead",
      value: 8,
  },
  {
      label: "Expense",
      value: 9,
  },
  {
      label: "Schedule",
      value: 10,
  },
  {
      label: "Travel",
      value: 11,
  },
  {
      label: "Document",
      value: 12,
  },
  {
      label: "ELearning",
      value: 13,
  },
  {
      label: "Assets",
      value: 14,
  },
  {
      label: "Custom Approval",
      value: 15,
  },
  {
      label: "Employee",
      value: 16,
  },
  {
      label: "Administration",
      value: 17,
  },
  {
      label: "Appraisal",
      value: 18,
  },
  {
      label: "Department",
      value: 19,
  },
  {
      label: "Leave",
      value: 20,
  },
  {
      label: "Loan",
      value: 21,
  },
  {
      label: "Holiday",
      value: 22,
  },
  {
      label: "Career",
      value: 23,
  },
  {
      label: "Audio Calling",
      value: 24,
  },
  {
      label: "Video Calling",
      value: 25,
  },
  {
      label: "Salary",
      value: 26,
  },
  {
      label: "Attendance",
      value: 27,
  },
  {
      label: "Requisition ",
      value: 28,
  },
  {
      label: "MileBoard",
      value: 29,
  },
  {
      label: "MileGrid",
      value: 30,
  },
  {
      label: "MilePad ",
      value: 31,
  },
  {
      label: "Payroll",
      value: 32,
  },
  {
      label: "Rewards ",
      value: 33,
  },
  {
      label: "Complains ",
      value: 34,
  },
  {
      label: "Warnings ",
      value: 35,
  },
  {
      label: "Bonus ",
      value: 36,
  },
  {
      label: "Promotion ",
      value: 37,
  },
  {
      label: "OrganizationalChart",
      value: 38,
  },
  {
      label: "MyTeam ",
      value: 39,
  },
  {
      label: "Grade",
      value: 40,
  },
  {
      label: "JobBoard",
      value: 41,
  },

];