import { ActionType } from "../CustomModal";
import { CloseCircleOutlined } from "@ant-design/icons";
import messageTune from "../../../content/audio/messageTune.mp3";
import { notification } from "antd";
import { getAvatar } from "./avatarHelper";

export const openNotification = (options, setIsModalOpen, navigate) => {
  const {
    title = "",
    message = "",
    direction = "bottomLeft",
    duration = 4,
    onClick = () => {
      !message.toLowerCase().includes("online") && setIsModalOpen(true);
      if (options.actionType === ActionType.Route) {
        navigate(options.actionData.path);
        setIsModalOpen(false);
      }
    },
    className = "defaultNotification",
    style = {},
    closeIcon = (
      <CloseCircleOutlined
        twoToneColor="#fffff"
        style={{ fontSize: "20px", color: "white" }}
      />
    ),
    playSound = false,
    soundTune = messageTune,
    type,
    icon,
    avatarImage,
    avatarName,
    referenceId,
    groupId,
    projectId,
  } = options;

  notification.open({
    message: title,
    description: message,
    placement: direction,
    duration,
    onClick,
    style,
    className:
      className +
      (type === "success"
        ? " !bg-[#4CAF50]"
        : type === "error"
        ? " !bg-[#f44336]"
        : ""),
    closeIcon,
    icon: icon || getAvatar(avatarImage, avatarName),
    referenceId,
    groupId,
    projectId,
  });
  if (playSound) {
    const audio = new Audio(soundTune);
    audio.autoplay = true;
  }
};
