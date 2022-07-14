import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import CustomModal from "../../Modal/CustomModal";
import { handleCardDetail } from "../../store/slice";
import WorkBoardDetail from "../../WorkBoardDetail/WorkBoardDetail";

function CardDetailModal() {
	const [isOpenDetail, setIsOpenDetail] = useState(false);
	const dispatch = useDispatch();
	const handleOpenDetails = () => {
		dispatch(handleCardDetail({ cardDetail: null, type: "close" }));
	};
	const cardDetail = useSelector(state => state.trelloSlice.cardDetail);
	useEffect(() => {
		if (cardDetail) {
			setIsOpenDetail(true);
			return;
		} else {
			setIsOpenDetail(false);
		}
	}, [cardDetail]);
	return (
		<CustomModal
			isModalVisible={isOpenDetail}
			footer={null}
			width={1000}
			onCancel={handleOpenDetails}
		>
			<WorkBoardDetail />
		</CustomModal>
	);
}

export default CardDetailModal;
