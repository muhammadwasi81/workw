import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { SideChatBar } from "./SideChatBar.style";
import SideBarHead from "./SideBarHead";
import SideBarList from "./SideBarList";
import SideBarSearch from "./SideBarSearch";
import "./style.css";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAllChats } from "../Messenger/store/actions";
import ChatBoxCont from "../../../components/SharedComponentOld/ChatBox/ChatBoxCont";
export const Index = () => {
	const sideBarStatus = useSelector(
		state => state.sideBarChatSlice.sideBarChatStatus
	);
	const sideBarChatIsDefault = useSelector(
		state => state.sideBarChatSlice.sideBarChatIsDefault
	);
	const conversations = useSelector(state => state.MessengerSlice.Conversations);
	const [isHide, setIsHide] = useState(false);
	const location = useLocation();
	const dispatch = useDispatch();
	useEffect(() => {
		if (location.pathname.includes("/messenger")) {
			setIsHide(true);
		} else setIsHide(false);
	}, [location]);
	useEffect(() => {
		dispatch(getAllChats());
	}, [])

	let isMobileView = window.innerWidth < 800;
	return (
		<>
			<SideChatBar
				sideBarStatus={sideBarStatus}
				isDefault={sideBarChatIsDefault}
				style={{ display: isHide ? "none" : "block" }}
				isMobileView={isMobileView}
			>
				<SideBarHead />
				<SideBarList chatList={conversations} />
				<SideBarSearch />
			</SideChatBar>
			<ChatBoxCont />
		</>
	);
};

export default Index;
