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
    displayName: "My_Team",
    classObj: "button",
    to: (id) => `${ROUTES.EMPLOYEES.EMPLOYEELINK}/info/team/${id}`,
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
    displayName: "Appraisal",
    classObj: "button",
    to: (id) => `${ROUTES.EMPLOYEES.EMPLOYEELINK}/info/appraisal/${id}`,
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
  {
    displayName: "Family",
    classObj: "button",
    to: (id) => `${ROUTES.EMPLOYEES.EMPLOYEELINK}/info/family/${id}`,
  },
  {
    displayName: "Attachments",
    classObj: "button",
    to: (id) => `${ROUTES.EMPLOYEES.EMPLOYEELINK}/info/attachments/${id}`,
  },
  {
    displayName: "Employees_Linkage",
    classObj: "button",
    to: (id) => `${ROUTES.EMPLOYEES.EMPLOYEELINK}/info/employee-linkage/${id}`,
  },
];
