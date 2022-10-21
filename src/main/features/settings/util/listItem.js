import { KeyOutlined, SettingOutlined } from "@ant-design/icons";

export const listitem = [
  {
    IconName: <KeyOutlined size={20} color={"var(--currentThemeColor)"} />,
    displayName: "Change Password",
    classObj: "button",
    to: "/settings/changePassword",
  },
  {
    IconName: <SettingOutlined size={20} color={"var(--currentThemeColor)"} />,
    displayName: "basic Information",
    classObj: "button",
    to: "/settings/basicInfo",
  },
];
