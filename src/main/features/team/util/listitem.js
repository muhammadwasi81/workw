import { ROUTES } from "../../../../utils/routes";
import {
  CheckCircleOutlined,
  StarOutlined,
  WarningOutlined,
  MailOutlined,
  ScheduleOutlined,
  FolderOpenOutlined,
  DollarCircleOutlined,
  ClearOutlined,
  RightCircleOutlined,
  ProjectOutlined,
  AreaChartOutlined,
} from "@ant-design/icons";

export const listitem = [
  {
    IconName: (
      <CheckCircleOutlined
        style={{ fontSize: 20, margin: "15px" }}
        color={"var(--currentThemeColor)"}
      />
    ),
    displayName: "Attendence",
    classObj: "button",
    to: (id) => `/teams/info/attendence/${id}`,
  },
  {
    IconName: (
      <ScheduleOutlined
        style={{ fontSize: 20, margin: "15px" }}
        color={"var(--currentThemeColor)"}
      />
    ),
    displayName: "Check-In",
    classObj: "button",
    to: (id) => `/teams/info/check-in/${id}`,
  },
  {
    IconName: (
      <ClearOutlined
        style={{ fontSize: 20, margin: "15px" }}
        color={"var(--currentThemeColor)"}
      />
    ),
    displayName: "Leaves",
    classObj: "button",
    to: (id) => `/teams/info/leaves/${id}`,
  },
  {
    IconName: (
      <StarOutlined
        style={{ fontSize: 20, margin: "15px" }}
        color={"var(--currentThemeColor)"}
      />
    ),
    displayName: "Rewards",
    classObj: "button",
    to: (id) => `/teams/info/rewards/${id}`,
  },
  {
    IconName: (
      <ProjectOutlined
        style={{ fontSize: 20, margin: "15px" }}
        color={"var(--currentThemeColor)"}
      />
    ),
    displayName: "Appraisals",
    classObj: "button",
    to: (id) => `/teams/info/appraisals/${id}`,
  },
  {
    IconName: (
      <WarningOutlined
        style={{ fontSize: 20, margin: "15px" }}
        color={"var(--currentThemeColor)"}
      />
    ),
    displayName: "Warnings",
    classObj: "button",
    to: (id) => `/teams/info/warnings/${id}`,
  },
  {
    IconName: (
      <MailOutlined
        style={{ fontSize: 20, margin: "15px" }}
        color={"var(--currentThemeColor)"}
      />
    ),
    displayName: "Complains",
    classObj: "button",
    to: (id) => `/teams/info/complains/${id}`,
  },
  {
    IconName: (
      <FolderOpenOutlined
        style={{ fontSize: 20, margin: "15px" }}
        color={"var(--currentThemeColor)"}
      />
    ),
    displayName: "Courses",
    classObj: "button",
    to: (id) => `/teams/info/courses/${id}`,
  },
  {
    IconName: (
      <ScheduleOutlined
        style={{ fontSize: 20, margin: "15px" }}
        color={"var(--currentThemeColor)"}
      />
    ),
    displayName: "Education",
    classObj: "button",
    to: (id) => `/teams/info/education/${id}`,
  },
  {
    IconName: (
      <AreaChartOutlined
        style={{ fontSize: 20, margin: "15px" }}
        color={"var(--currentThemeColor)"}
      />
    ),
    displayName: "Experience",
    classObj: "button",
    to: (id) => `/teams/info/experience/${id}`,
  },
  {
    IconName: (
      <DollarCircleOutlined
        style={{ fontSize: 20, margin: "15px" }}
        color={"var(--currentThemeColor)"}
      />
    ),
    displayName: "Loan",
    classObj: "button",
    to: (id) => `/teams/info/loan/${id}`,
  },
  {
    IconName: (
      <RightCircleOutlined
        style={{ fontSize: 20, margin: "15px" }}
        color={"var(--currentThemeColor)"}
      />
    ),
    displayName: "Activity Log",
    classObj: "button",
    to: (id) => `/teams/info/activity-log/${id}`,
  },
];
