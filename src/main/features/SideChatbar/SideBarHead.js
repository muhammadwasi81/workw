import React, { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import ChatIcon from "../../../content/NewContent/Sidebar/svg/Messenger.svg";
import { sideBarOpen } from "./store/sideBarChatSlice";
import { VideoCameraOutlined } from "@ant-design/icons";
import { Dropdown, Menu, Modal, Space, Typography } from "antd";
import { message } from "antd";
import { LanguageChangeContext } from "../../../utils/localization/localContext/LocalContext";
import CreateRoom from "../calling/components/createRoom/CreateRoom";
import { sideChatBarList } from "./localization";
import { handleCreateRoomModal } from "../calling/store/slice";
import { instantCall } from "../calling/store/action";
import CreateCall from "./createCall";
export const SideBarHead = ({ sideBarStatus }) => {
	const dispatch = useDispatch();
	const isCreateRoomModalOpen = useSelector(state => state.callingSlice.isCreateRoomModalOpen);
	const { user } = useSelector(state => state.userSlice);
	const { userLanguage } = useContext(LanguageChangeContext);
	const { createRoom, instantCall: icall } = sideChatBarList[userLanguage];
	// const [visible, setVisible] = useState(false);

	const handleClick = () => {
		dispatch(sideBarOpen(!sideBarStatus));
	};

	return (
		<>
			<div className={`sideBarHead`}>
				<div className={`headIcon ${sideBarStatus ? " openSideBarHead" : ""}`}>
					<div className={`halfHeader`} >
						<img src={ChatIcon} alt="" onClick={handleClick} />
					</div>
					<div className={`fullHeader ${!sideBarStatus ? " closeSideBarHead" : ""}`}>
						<div>Create Room</div>
						<div><CreateCall /></div>
					</div>
				</div>
				<div className="myDivider"></div>
			</div>
		</>
	);
};

export default SideBarHead;
