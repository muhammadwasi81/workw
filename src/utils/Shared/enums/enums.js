export const userType = Object.freeze([
  {
    id: 2,
    name: "Admin",
  },
  {
    id: 3,
    name: "Employee",
  },
]);
export const userTitle = Object.freeze([
  {
    id: 1,
    name: "Mr",
  },
  {
    id: 2,
    name: "Mrs",
  },
]);

export const genderList = Object.freeze([
  {
    id: 1,
    name: "Male",
  },
  {
    id: 2,
    name: "Female",
  },
  {
    id: 3,
    name: "Non Binary",
  },
  {
    id: 4,
    name: "PreferNotToSay",
  },
]);

export const maritalStatusList = Object.freeze([
  {
    id: 1,
    name: "Single",
  },
  {
    id: 2,
    name: "Engaged",
  },
  {
    id: 3,
    name: "Married",
  },
  {
    id: 4,
    name: "Divorced",
  },
  {
    id: 5,
    name: "Widow",
  },
  {
    id: 6,
    name: "Widower",
  },
  {
    id: 7,
    name: "PreferNotToStay",
  },
]);

export const relations = Object.freeze([
  {
    id: 1,
    name: "Father",
  },
  {
    id: 2,
    name: "Mother",
  },
  {
    id: 3,
    name: "Brother",
  },
  {
    id: 4,
    name: "Sister",
  },
]);

export const employmentType = Object.freeze([
  {
    id: 1,
    name: "FullTime",
  },
  {
    id: 2,
    name: "PartTime",
  },
]);
export const cityApiPrefix = "/api/Utility/GetAllCities";
export const defaultUiid = "00000000-0000-0000-0000-000000000000";
export const FilterSortEnum = Object.freeze({
  CreateDateDesc: 1,
  CreateDateAsc: 2,
  SubjectDesc: 3,
  SubjectAsc: 4,
  StatusDesc: 5,
  StatusAsc: 6,
  ApproverStatusDesc: 7,
  ApproverStatusAsc: 8,
  AgentStatusDesc: 9,
  AgentStatusAsc: 10,
  ReferenceNoDesc: 11,
  ReferenceNoAsc: 12,
});

export const privacyOption = Object.freeze({
  Public: 1,
  Private: 2,
  External: 3,
});

export const PostPrivacyType = Object.freeze({
  PUBLIC: 1,
  PRIVATE: 2,
  EXTERNAL: 3,
  getPostTypeIcon: (type) => {
    // eslint-disable-next-line default-case
    switch (type) {
      case PostPrivacyType.PUBLIC:
        return "https://konnect.im/static/media/world.f69f1142.svg";
      case PostPrivacyType.PRIVATE:
        return "https://konnect.im/static/media/padlock.35a2d6ca.svg";
    }
  },
});
export const ThemeColorEnum = [
  "#64c4b2",
  "#45c6ee",
  "#526bb1",
  "#e8137b",
  "#f7d447",
];
export const defualtThemeColor = "#526bb1";

export const FeaturesEnum = {
  Feed: 1,
  Mailbox: 2,
  Messenger: 3,
  Group: 4,
  Project: 5,
  Task: 6,
  WorkBoard: 7,
  Lead: 8,
  Expense: 9,
  Schedule: 10,
  Travel: 11,
  Document: 12,
  ELearning: 13,
  Asset: 14,
  CustomApproval: 15,
  Employee: 16,
  Administration: 17,
  Appraisal: 18,
  Department: 19,
  Leave: 20,
  Loan: 21,
  Holiday: 22,
  Career: 23,
  AudioCalling: 24,
  VideoCalling: 25,
  Attendance: 27,
  Requisition: 28,
  MileBoard: 29,
  MileGrid: 30,
  MilePad: 31,
  Payroll: 32,
  Rewards: 33,
  Complains: 34,
  Warnings: 35,
  Bonus: 36,
  Promotion: 37,
  OrganizationalChart: 38,
  MyTeam: 39,
  Grade: 40,
};

export const ReactionModuleEnum = {
  Feed: 1,
  UserTask: 2,
  FeedComment: 3,
  WorkBoard: 4,
  WorkBoardTodo: 5,
  Document: 6,
  LeadManager: 7,
  LeadManagerDetail: 8,
  LeadManagerDetailContact: 9,
  ScheduleComment: 10,
};
