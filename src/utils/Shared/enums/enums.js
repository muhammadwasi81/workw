export const userType = Object.freeze([
  {
    id: 1,
    name: "SuperAdmin",
  },
  {
    id: 2,
    name: "Admin",
  },
  {
    id: 3,
    name: "Employee",
  },
  {
    id: 4,
    name: "Individual",
  },
  {
    id: 5,
    name: "Calling",
  },
  {
    id: 6,
    name: "ProjectExternal",
  },
  {
    id: 7,
    name: "Guest",
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
