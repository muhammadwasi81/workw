import React, { useEffect, useState } from "react";
import CustomModal from "../CustomModal";
import ModalTitle from "../UI/ModalTitle";
import LabelInput from "./LabelInput";
import { useDispatch } from "react-redux";
import {
	addWorkBoardTodoLabel,
	removeWorkBoardTodoLabel,
} from "../../store/action";

function LabelModal({ todoDetail, showLabelModal, isLabelModalVisible }) {
	const dispatch = useDispatch();
	let labelObj = [
		{ colorCode: "#61bd4f" },
		{ colorCode: "#f2d600" },
		{ colorCode: "#ff9f1a" },
		{ colorCode: "#eb5a46" },
		{ colorCode: "#c377e0" },
		{ colorCode: "#0079bf" },
		{ colorCode: "#00c2e0" },
		{ colorCode: "#51e898" },
		{ colorCode: "#ff78cb" },
		{ colorCode: "#344563" },
	];
	if (todoDetail) {
		labelObj = labelObj.map(item => ({
			...item,
			label: "",
			workBoardTodoId: todoDetail.id,
		}));
	}
	const handleWorkBoardTodoLabel = labelObj => {
		if (todoDetail) {
			if (
				todoDetail.labels.filter(
					label => label.colorCode === labelObj.colorCode
				).length > 0
			) {
				const filteredArray = todoDetail.labels.filter(
					label => label.colorCode !== labelObj.colorCode
				);
				const filteredObj = todoDetail.labels.filter(
					label => label.colorCode === labelObj.colorCode
				);

				dispatch(
					removeWorkBoardTodoLabel({
						id: filteredObj[0].id,
						sectionId: todoDetail.sectionId,
						labels: filteredArray,
						todoId: todoDetail.id,
					})
				);
			} else {
				dispatch(
					addWorkBoardTodoLabel({
						labelObj,
						sectionId: todoDetail.sectionId,
					})
				);
			}
		}
	};

	// useEffect(() => {
	// 	if (todoLabelsNew.length > 0) {
	// 		dispatch(
	// 			updateWorkBoardTodoLabel({
	// 				labelObj: todoLabelsNew,
	// 				sectionId: todoDetail.sectionId,
	// 				todoId: todoDetail.id,
	// 			})
	// 		);
	// 	} else {
	// 		dispatch(
	// 			updateWorkBoardTodoLabel({
	// 				labelObj: [],
	// 				sectionId: todoDetail.sectionId,
	// 				todoId: todoDetail.id,
	// 			})
	// 		);
	// 	}
	// }, [todoLabelsNew]);

	return (
		<CustomModal
			title={<ModalTitle title={"Labels"} />}
			centered={false}
			isModalVisible={isLabelModalVisible}
			onCancel={showLabelModal}
			footer={null}
		>
			<>
				<div>Labels</div>
				<div className="">
					{labelObj.map((label, index) => (
						<LabelInput
							labelObj={label}
							todoDetail={todoDetail}
							key={index}
							handleWorkBoardTodoLabel={handleWorkBoardTodoLabel}
						/>
					))}
				</div>
			</>
		</CustomModal>
	);
}

export default LabelModal;
