import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import CustomModal from "../../Modal/CustomModal";
import { handleCardDetail, openSectionDetail } from "../../store/slice";
import WorkBoardDetail from "../../WorkBoardDetail/WorkBoardDetail";

function CardDetailModal() {
	const [isOpenDetail, setIsOpenDetail] = useState(false);
	const dispatch = useDispatch();
	const handleOpenDetails = () => {
		dispatch(openSectionDetail({ type: "close" }));
	};
	const todoDetail = useSelector(state => state.trelloSlice.todoDetail);
	useEffect(() => {
		if (todoDetail) {
			setIsOpenDetail(true);
			return;
		} else {
			setIsOpenDetail(false);
		}
	}, [todoDetail]);

	return (
		<CustomModal
			isModalVisible={isOpenDetail}
			footer={null}
			width={1000}
			onCancel={handleOpenDetails}
		>
			<WorkBoardDetail todoDetail={todoDetail} />
		</CustomModal>
	);
}

export default CardDetailModal;
