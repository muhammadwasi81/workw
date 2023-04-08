import React, { useEffect } from "react";
import { notification } from "antd";
import { useSelector } from "react-redux";
import { CloseCircleOutlined } from "@ant-design/icons";
import messageTune from "../../../content/audio/messageTune.mp3";
import Avatar from "../../sharedComponents/Avatar/avatarOLD";

const getAvatar = (src, name) => {
	if(src || name){
		return <Avatar
		src={src}
		name={name || "Anonymous"}
		size={38}
		round={true}
		contStyle={{ marginTop: "-10px", marginLeft: "-10px" }}
	/>
	}else{
		return <></>
	}
}

const openNotification = options => {
	const {
		title = "",
		message = "",
		direction = "bottomLeft",
		duration = 4,
		onClick = () => {},
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
		avatarName
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
	});
	if (playSound) {
		const audio = new Audio(soundTune);
		audio.autoplay = true;
	}
};

const MainNotification = () => {
	const { notification } = useSelector(state => state.sharedSlice);
	useEffect(() => {
		notification.message && openNotification(notification);
	}, [notification]);
	return <></>;
};

export default MainNotification;
