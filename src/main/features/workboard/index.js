import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomModal from "./Modal/CustomModal";
import MemberModal from "./Modal/MemberModal";
import {
	addListCardMembers,
	handleCardDetail,
	handleChangeMembers,
	openMembersModal,
} from "./store/slice";
import Board from "./Trello/Board";
import EditMembers from "./Trello/EditMembers/EditMembers";
import CardDetailModal from "./Trello/Modal/CardDetailModal";
import Header from "./UI/Header";
import WorkBoardDetail from "./WorkBoardDetail/WorkBoardDetail";

function WorkBoard() {
	// const [isOpenDetail, setIsOpenDetail] = useState(false);
	// const dispatch = useDispatch();
	// const handleOpenDetails = () => {
	// 	dispatch(handleCardDetail({ cardDetail: null, type: "close" }));
	// };
	// const cardDetail = useSelector(state => state.trelloSlice.cardDetail);
	// useEffect(() => {
	// 	if (cardDetail) {
	// 		setIsOpenDetail(true);
	// 		return;
	// 	} else {
	// 		setIsOpenDetail(false);
	// 	}
	// }, [cardDetail]);

	const onSaveMembers = members => {
		// dispatch(addListCardMembers({ cardId, members }));
		// console.log("members");
	};
	// console.log("workboard");

	return (
		<>
			{/* <Board /> */}
			<Header />
		</>
	);
}

export default WorkBoard;
