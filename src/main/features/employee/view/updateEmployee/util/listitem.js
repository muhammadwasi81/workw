import { ROUTES } from "../../../../../../utils/routes";

export const listitem = [
  {
    displayName: "Basic_Info",
    classObj: "button",
    to: (id) => `${ROUTES.EMPLOYEES.EMPLOYEELINK}/info/basicInfo/${id}`,
  },
  {
    displayName: "Email_Configuration",
    classObj: "button",
    to: (id) =>
      `${ROUTES.EMPLOYEES.EMPLOYEELINK}/info/emailConfiguration/${id}`,
  },
  {
    displayName: "Bank_Detail",
    classObj: "button",

    to: (id) => `${ROUTES.EMPLOYEES.EMPLOYEELINK}/info/bankDetail/${id}`,
  },
  {
    displayName: "Education",
    classObj: "button",
    to: (id) => `${ROUTES.EMPLOYEES.EMPLOYEELINK}/info/education/${id}`,
  },
  {
    displayName: "Emergency_Info",
    classObj: "button",
    to: (id) => `${ROUTES.EMPLOYEES.EMPLOYEELINK}/info/emergencyInfo/${id}`,
  },
  {
    displayName: "Experience",
    classObj: "button",
    to: (id) => `${ROUTES.EMPLOYEES.EMPLOYEELINK}/info/experience/${id}`,
  },
  {
    displayName: "Rebate",
    classObj: "button",
    to: (id) => `${ROUTES.EMPLOYEES.EMPLOYEELINK}/info/rebate/${id}`,
  },
  {
    displayName: "Salary",
    classObj: "button",
    to: (id) => `${ROUTES.EMPLOYEES.EMPLOYEELINK}/info/salary/${id}`,
  },
  {
    displayName: "Leaves",
    classObj: "button",
    to: (id) => `${ROUTES.EMPLOYEES.EMPLOYEELINK}/info/leaves/${id}`,
  },
  {
    displayName: "Devices",
    classObj: "button",
    to: (id) => `${ROUTES.EMPLOYEES.EMPLOYEELINK}/info/devices/${id}`,
  },
];
