import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ConversationListCont from "./view/Conversations/ConversationListCont";
import MessengerBox from "./view/MessengerBox/MessengerCont";
import "./style.css";
import { getAllChats } from "./store/Api";

const Index = () => {
	const { isMobileScreen } = useSelector(state => state.responsiveSlice);
	const isOpenMessenger = useSelector(state => state.MessengerSlice.mobileIsopenChat);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getAllChats());
	}, []);
	return (
		<div
			className={`MessengerCont ${
				isMobileScreen && isOpenMessenger === true
					? "openMobileMessenger"
					: isMobileScreen && isOpenMessenger === false
					? "closeMobileMessenger"
					: ""
			}`}
		>
			<ConversationListCont />
			<MessengerBox />
		</div>
	);
};
export default Index;
