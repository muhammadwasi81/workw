import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DatePicker } from "antd";
import { addListCardDueDate, openDateModal } from "../store/slice";
import CustomModal from "./CustomModal";
import ModalTitle from "./UI/ModalTitle";
import ModalFooter from "./UI/ModalFooter";
import moment from "moment";
function DateModal() {
	const addMemberCardId = useSelector(
		state => state.trelloSlice.addMemberCardId
	);
	const cardDetail = useSelector(state => state.trelloSlice[addMemberCardId]);
	const [date, setDate] = useState("");
	const [dueDate, setDueDate] = useState("");

	useEffect(() => {
		if (cardDetail !== undefined) {
			if (dueDate !== cardDetail.cardDueDate.dueDate) {
				setDueDate(cardDetail.cardDueDate.dueDate);
			}
		}
	}, [cardDetail]);

	const dispatch = useDispatch();
	const showDateModal = useSelector(state => state.trelloSlice.showDateModal);
	const handleDateModal = () => {
		dispatch(
			addListCardDueDate({
				dueDate: date,
				isCardCompleted: false,
				cardId: addMemberCardId,
			})
		);
		dispatch(openDateModal({ isDateModalOpen: !showDateModal }));
	};
	const onChange = (date, dateString) => {
		setDate(dateString);
	};

	return (
		<CustomModal
			isModalVisible={showDateModal}
			title={<ModalTitle title={"Dates"} />}
			footer={<ModalFooter onSave={handleDateModal} />}
			onCancel={() => {
				handleDateModal();
			}}
		>
			<DatePicker
				format={["DD/MM/YYYY", "DD/MM/YY"]}
				onChange={onChange}
				defaultValue={
					dueDate.length > 0 && moment(dueDate, "DD/MM/YYYY")
				}
			/>
		</CustomModal>
	);
}

export default DateModal;
