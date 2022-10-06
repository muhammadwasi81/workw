import { ROUTES } from "../../../../../../utils/routes";

export const listitem = [
  {
    displayName: "Basic_Info",
    classObj: "button",
    to: (id) => `/employees/info/basicInfo/${id}`,
  },
  {
    displayName: "Bank_Detail",
    classObj: "button",

    to: (id) => `/employees/info/bankDetail/${id}`,
  },
  {
    displayName: "Education",
    classObj: "button",
    to: (id) => `/employees/info/education/${id}`,
  },
  {
    displayName: "Emergency_Info",
    classObj: "button",
    to: (id) => `/employees/info/emergencyInfo/${id}`,
  },
  {
    displayName: "Experience",
    classObj: "button",
    to: (id) => `/employees/info/experience/${id}`,
  },
  {
    displayName: "Rebate",
    classObj: "button",
    to: (id) => `/employees/info/rebate/${id}`,
  },
  {
    displayName: "Salary",
    classObj: "button",
    to: (id) => `/employees/info/salary/${id}`,
  },
  {
    displayName: "Leaves",
    classObj: "button",
    to: (id) => `/employees/info/leaves/${id}`,
  },
];
