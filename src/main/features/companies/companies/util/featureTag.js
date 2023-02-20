// import { ROUTES } from "../../../../utils/routes";
import React from "react";
import {
  InfoCircleOutlined,
  DashboardOutlined,
  MailOutlined
} from "@ant-design/icons";

export const featureTags = [
  {
    IconName: (
      <InfoCircleOutlined
        style={{ fontSize: 20, margin: "15px" }}
        color={"var(--currentThemeColor)"}
      />
    ),
    displayName: "basicInfo",
    classObj: "button",
    to: (id) => `/companies/info/basicInfo/${id}`,
  },
  {
    IconName: (
      <MailOutlined
        style={{ fontSize: 20, margin: "15px" }}
        color={"var(--currentThemeColor)"}
      />
    ),
    displayName: "sendEmail",
    classObj: "button",
    to: (id) => `/companies/info/leaves/${id}`,
  },
  {
    IconName: (
      <DashboardOutlined
        style={{ fontSize: 20, margin: "15px" }}
        color={"var(--currentThemeColor)"}
      />
    ),
    displayName: "dashBoard",
    classObj: "button",
    to: (id) => `/companies/info/dashboard/${id}`,
  }
];


function getFeatureTags(value) {
    return value
}