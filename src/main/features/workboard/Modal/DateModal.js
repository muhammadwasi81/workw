import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DatePicker } from "antd";
import { addListCardDueDate, openDateModal } from "../store/slice";
import CustomModal from "./CustomModal";
import ModalTitle from "./UI/ModalTitle";
import ModalFooter from "./UI/ModalFooter";
import moment from "moment";
import { updateWorkBoardTodoDueDate } from "../store/action";
function DateModal() {
	const todoDueDateDetail = useSelector(
		state => state.trelloSlice.todoDueDateDetail
	);
	const [date, setDate] = useState("");
	const [dueDate, setDueDate] = useState("");

	useEffect(() => {
		if (todoDueDateDetail) {
			if (todoDueDateDetail.dueDate) {
				if (dueDate !== todoDueDateDetail.dueDate) {
					setDueDate(todoDueDateDetail.dueDate);
				}
			}
		}
	}, [todoDueDateDetail]);

	const dispatch = useDispatch();
	const showDateModal = useSelector(state => state.trelloSlice.showDateModal);
	const handleDateModal = type => {
		if (type === "save") {
			dispatch(
				updateWorkBoardTodoDueDate({
					todoId: todoDueDateDetail.id,
					sectionId: todoDueDateDetail.sectionId,
					dueDate: moment(date, "DD/MM/YYYY").format(),
				})
			);
		}
		dispatch(openDateModal({ isDateModalOpen: !showDateModal }));
	};
	const onChange = (date, dateString) => {
		setDate(dateString);
	};

	return (
		<CustomModal
			isModalVisible={showDateModal}
			title={<ModalTitle title={"Dates"} />}
			footer={
				<ModalFooter
					onSave={() => {
						handleDateModal("save");
					}}
				/>
			}
			onCancel={() => {
				handleDateModal("cancel");
			}}
		>
			<DatePicker
				format={["DD/MM/YYYY", "DD/MM/YY"]}
				onChange={onChange}
				defaultValue={
					dueDate.length > 0 &&
					moment(new Date(dueDate), "DD/MM/YYYY")
				}
			/>
		</CustomModal>
	);
}

export default DateModal;
