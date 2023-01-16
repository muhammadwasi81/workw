import { ROUTES } from "../../../../utils/routes";
import React from "react";
import { AiFillLike } from "react-icons/ai";

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
  LikeOutlined,
} from "@ant-design/icons";
//import appraisal  from "../../../../content/NewContent/teams/appraisal.svg";


export const listitem = [
  // {
  //   IconName: (
  //     <CheckCircleOutlined
  //       style={{ fontSize: 20, margin: "15px" }}
  //       color={"var(--currentThemeColor)"}
  //     />
  //   ),
  //   displayName: "attendence",
  //   classObj: "button",
  //   to: (id) => `/teams/info/attendence/${id}`,
  // },
  {
    IconName: (
      <ScheduleOutlined
        style={{ fontSize: 20, margin: "15px" }}
        color={"var(--currentThemeColor)"}
      />
    ),
    displayName: "checkIn",
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
    displayName: "leaves",
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
    displayName: "rewards",
    classObj: "button",
    to: (id) => `/teams/info/rewards/${id}`,
  },
  // {
  //   IconName: (
  //     <ProjectOutlined
  //       style={{ fontSize: 20, margin: "15px" }}
  //       color={"var(--currentThemeColor)"}
  //     />
  //   ),
  //   displayName: "appraisals",
  //   classObj: "button",
  //   to: (id) => `/teams/info/appraisals/${id}`,
  // },
  {
    IconName: (
      <WarningOutlined
        style={{ fontSize: 20, margin: "15px" }}
        color={"var(--currentThemeColor)"}
      />
    ),
    displayName: "warnings",
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
    displayName: "complains",
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
    displayName: "courses",
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
    displayName: "education",
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
    displayName: "experience",
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
    displayName: "loan",
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
    displayName: "activityLog",
    classObj: "button",
    to: (id) => `/teams/info/activity-log/${id}`,
  },

  {
    IconName: (  
      <LikeOutlined
        style={{ fontSize: 20, margin: "15px" }}
        color={"var(--currentThemeColor)"}
      />
    ),
    displayName: "appraisals",
    classObj: "button",
    to: (id) => `/teams/info/appraisals/${id}`,
  },

];
