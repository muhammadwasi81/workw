import React, { useEffect } from "react";
import { notification } from "antd";
import { useSelector } from "react-redux";
import { CloseCircleOutlined } from "@ant-design/icons";
import messageTune from "../../../content/audio/messageTune.mp3";
import Avatar from "../../sharedComponents/Avatar/avatarOLD";

const openNotification = options => {
	const {
		title = "",
		message = "",
		direction = "bottomLeft",
		duration = 4.5,
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
		// icon = (
		// 	<Avatar
		// 		src={
		// 			"https://konnect.im/upload/2021/3/5325454b-1c5d-40f1-b95d-df0fad2d4da9.jpeg"
		// 		}
		// 		name={"Test"}
		// 		size={38}
		// 		round={true}
		// 		contStyle={{ marginTop: "-10px", marginLeft: "-10px" }}
		// 	/>
		// ),
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
		// icon,
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
