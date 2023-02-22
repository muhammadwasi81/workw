// import { ROUTES } from "../../../../utils/routes";
import React from "react";
import {
  InfoCircleOutlined,
  DashboardOutlined,
  MailOutlined,
  IdcardOutlined,
} from "@ant-design/icons";

export const listitem = [
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
  },
  {
    IconName: (
      <IdcardOutlined
        style={{ fontSize: 20, margin: "15px" }}
        color={"var(--currentThemeColor)"}
      />
    ),
    displayName: "billing",
    classObj: "button",
    to: (id) => `/companies/info/billing/${id}`,
  },
];
