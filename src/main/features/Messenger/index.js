import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ConversationListCont from "./view/Conversations/ConversationListCont";
import MessengerBox from "./view/MessengerBox";
import "./style/style.css";
import { getAllChats } from "./store/Api";
import { MessengerContainer } from "./style/SideChatBar.style";

const Index = () => {
	const { isMobileScreen } = useSelector(state => state.responsiveSlice);
	const isOpenMessenger = useSelector(state => state.MessengerSlice.mobileIsopenChat);

	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getAllChats());
	}, []);

	return (
		<MessengerContainer isMobileScreen={isMobileScreen} isOpenMessenger={isOpenMessenger}>
			<ConversationListCont />
			<MessengerBox />
		</MessengerContainer>
	);
};
export default Index;
