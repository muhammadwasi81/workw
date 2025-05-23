import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { SideChatBar } from "./SideChatBar.style";
import SideBarHead from "./SideBarHead";
import SideBarList from "./SideBarList";
import SideBarSearch from "./SideBarSearch";
import "./style.css";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAllChats, getAllEmployeeWithChat } from "../Messenger/store/actions";
import ChatBoxCont from "./chatBox/ChatBoxCont";
import MinimizedDocuments from "../documents/view/minimizedDocuments";
export const Index = () => {
	const sideBarStatus = useSelector(
		state => state.sideBarChatSlice.sideBarChatStatus
	);
	const sideBarChatIsDefault = useSelector(
		state => state.sideBarChatSlice.sideBarChatIsDefault
	);
	const conversations = useSelector(state => state.MessengerSlice.ConversationsWithEmployee);
	const [isHide, setIsHide] = useState(false);
	const location = useLocation();
	const dispatch = useDispatch();
	useEffect(() => {
		if (location.pathname.includes("/messenger")) {
			setIsHide(true);
		} else setIsHide(false);
	}, [location]);
	useEffect(() => {
		dispatch(getAllEmployeeWithChat());
	}, [])

	let isMobileView = window.innerWidth < 800;
	return (
		<>
			<div style={{ display: isHide ? "none" : "block" }}>
				<SideChatBar
					sideBarStatus={sideBarStatus}
					isDefault={sideBarChatIsDefault}
					isMobileView={isMobileView}
				>
					<SideBarHead sideBarStatus={sideBarStatus} />
					<SideBarList chatList={conversations} />
					<SideBarSearch />
				</SideChatBar>
				<ChatBoxCont isHide={isHide} />
				<MinimizedDocuments />
			</div>
		</>
	);
};

export default Index;
