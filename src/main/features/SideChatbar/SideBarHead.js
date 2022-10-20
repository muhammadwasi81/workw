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
export const SideBarHead = () => {
	const dispatch = useDispatch();
	const isOpenChatBar = useSelector(
		state => state.sideBarChatSlice.sideBarChatStatus
	);
	const isCreateRoomModalOpen = useSelector(
		state => state.callingSlice.isCreateRoomModalOpen
	);
	const { user } = useSelector(state => state.userSlice);
	const { userLanguage } = useContext(LanguageChangeContext);
	const { createRoom, instantCall: icall } = sideChatBarList[userLanguage];
	// const [visible, setVisible] = useState(false);

	const handleClick = () => {
		dispatch(sideBarOpen(!isOpenChatBar));
	};
	const menu = (
		<Menu
			selectable
			items={[
				{
					key: "1",
					label: createRoom,
					onClick: () => {
						console.log("create room cliced");
						dispatch(handleCreateRoomModal(true));
					},
				},
				{
					key: "2",
					label: icall,
					onClick: () => {
						dispatch(instantCall({ isPrivate: false }));
					},
				},
			]}
		/>
	);
	// const intilizeCallwindow = response => {
	// 	const windowURL = `https://192.168.100.70:3300/${response.roomId}`;
	// 	window.open(
	// 		windowURL,
	// 		"_blank",
	// 		"toolbar=1, scrollbars=1, resizable=1, width=" +
	// 			1015 +
	// 			", height=" +
	// 			800
	// 	);
	// 	// window.open(windowURL, "_blank").focus();
	// };

	return (
		<>
			<div className="sideBarHead">
				<div className="headIcon">
					<img src={ChatIcon} alt="" onClick={handleClick} />
					<Dropdown overlay={menu}>
						<Typography.Link>
							<Space>
								<VideoCameraOutlined />
							</Space>
						</Typography.Link>
					</Dropdown>
				</div>

				<div className="myDivider"></div>
			</div>
			<Modal
				title=""
				centered
				visible={isCreateRoomModalOpen}
				// onOk={() => setVisible(false)}
				onCancel={() => {
					dispatch(handleCreateRoomModal(false));
				}}
				width={1000}
				footer={null}
				destroyOnClose={true}
			>
				<CreateRoom />
			</Modal>
		</>
	);
};

export default SideBarHead;
