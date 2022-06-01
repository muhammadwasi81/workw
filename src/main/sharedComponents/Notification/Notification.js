import React, { useEffect } from 'react';
import { notification } from 'antd';
import { useSelector } from 'react-redux';
import { CloseCircleOutlined } from '@ant-design/icons';
import messageTune from "../../../content/audio/messageTune.mp3";
import Avatar from '../../../components/SharedComponent/Avatar/avatar';

const openNotification = (options) => {
  const {
    title = "",
    message = "",
    direction = "bottomLeft",
    duration = 4.5,
    onClick = () => { },
    className = "defaultNotification",
    style = {},
    closeIcon = <CloseCircleOutlined twoToneColor="#fffff" style={{ fontSize: "20px", color: "white" }} />,
    playSound = false,
    soundTune = messageTune,
    icon = <Avatar
      src={options.avatarImage}
      name={options.avatarName}
      size={38}
      round={true}
      contStyle={{position:"relative", top:"-10px", left:"-8px"}} />,
  } = options
  notification.open({
    message: title,
    description: message,
    placement: direction,
    duration,
    onClick,
    style,
    className,
    closeIcon,
    icon: options.avatarImage !== undefined && icon
  });
  if (playSound) {
    const audio = new Audio(soundTune);
    audio.autoplay = true;
  }
};

const MainNotification = () => {
  const { notification } = useSelector((state) => state.sharedSlice)
  useEffect(() => {
    notification.message && openNotification(notification)
  }, [notification])
  return <></>
}


export default MainNotification;