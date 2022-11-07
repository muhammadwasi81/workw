import { KeyOutlined, SettingOutlined } from "@ant-design/icons";

export const listitem = [
  {
    IconName: (
      <KeyOutlined
        size={20}
        color={"var(--currentThemeColor)"}
        style={{ fontSize: 20, margin: "15px" }}
      />
    ),
    displayName: "Change Password",
    classObj: "button",
    to: "/settings/changePassword",
  },
  {
    IconName: (
      <SettingOutlined
        size={20}
        color={"var(--currentThemeColor)"}
        style={{ fontSize: 20, margin: "15px" }}
      />
    ),
    displayName: "Basic Information",
    classObj: "button",
    to: "/settings/basicInfo",
  },
];
