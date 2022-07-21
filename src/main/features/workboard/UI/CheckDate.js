import React, { useEffect, useState } from "react";
import { ClockCircleOutlined, DownOutlined } from "@ant-design/icons";
import { Checkbox, Tag } from "antd";
import { useSelector } from "react-redux";
import moment from "moment";
import { useDispatch } from "react-redux";
import { addListCardDueDate, openDateModal } from "../store/slice";

let dDiff;

function CheckDate({ isOutsideRender, todoData }) {
	const [checked, setChecked] = useState(false);
	const dispatch = useDispatch();
	// const cardId = useSelector(state => state.trelloSlice.addMemberCardId);

	const [dateVal, setDateVal] = useState("");

	const [dueDate, setDueDate] = useState("");

	useEffect(() => {
		if (todoData !== undefined) {
			if (todoData.dueDate) {
				if (checked !== todoData.isComplete) {
					setChecked(todoData.isComplete);
				}
				if (dueDate !== todoData.dueDate) {
					setDueDate(todoData.dueDate);
				}
				dDiff = null;
			}
		}
	}, [todoData]);

	useEffect(() => {
		setDateVal(dateToFromNowDaily(dueDate));
	}, [dueDate]);

	const onChange = e => {
		// setChecked(e.target.checked);
		// dispatch(
		// 	addListCardDueDate({
		// 		cardId,
		// 		dueDate,
		// 		isComplete: e.target.checked,
		// 	})
		// );
	};

	// call this function, passing-in your date
	function dateToFromNowDaily(myDate) {
		const newMyDate = moment(new Date(myDate));
		const today = moment();
		const tomorrow = moment().add(1, "days");

		const yesterday = moment().add(-1, "days");
		dDiff = moment(newMyDate).isBefore(today); // true

		if (moment(newMyDate, "DD/MM/YYYY").isSame(today, "day")) {
			return "today";
		}
		if (moment(newMyDate, "DD/MM/YYYY").isSame(tomorrow, "day")) {
			return "tomorrow";
		}
		if (moment(newMyDate, "DD/MM/YYYY").isSame(yesterday, "day")) {
			return "yesterday";
		}
		return moment(newMyDate, "DD/MM/YYYY").format("D MMM");
	}

	const showDateModal = () => {
		dispatch(
			openDateModal({
				isDateModalOpen: true,
				todoId: todoData.id,
				sectionId: todoData.sectionId,
			})
		);
	};

	return (
		<>
			{isOutsideRender ? (
				<div
					className={`group w-fit hover:bg-neutral-200 rounded-sm ${
						checked
							? "bg-green-500 hover:bg-green-600 !text-white"
							: dateVal === "yesterday" ||
							  (dDiff && dateVal !== "today")
							? "bg-[#EC9488] hover:bg-[#eb5a46] !text-white"
							: dateVal === "today" &&
							  "bg-[#f2d600] hover:bg-[#d9b51c] !text-white"
					} p-1`}
				>
					<div className="group-hover:hidden flex items-center gap-2 leading-[1.4rem]">
						<ClockCircleOutlined className="hover:hidden text-base" />
						<span className="pr-[8px]">
							{moment(new Date(dueDate), "DD/MM/YYYY").format(
								"D MMM"
							)}
						</span>
					</div>

					<div
						className={`hidden group-hover:block leading-[1.4rem] `}
					>
						<Checkbox
							onChange={onChange}
							checked={checked}
							className={`text-base !pr-0 ${
								checked && `!text-white`
							}`}
						>
							<span
								className={`text-sm ${
									(dateVal === "today" ||
										dateVal === "yesterday") &&
									"!text-white"
								}`}
							>
								{moment(new Date(dueDate), "DD/MM/YYYY").format(
									"D MMM"
								)}
							</span>
						</Checkbox>
					</div>
				</div>
			) : (
				<div className="flex gap-2 items-center">
					<Checkbox
						onChange={onChange}
						checked={checked}
						className={`text-base !pr-0 ${
							checked && `!text-white`
						}`}
					/>

					<div
						className="p-2 bg-neutral-100 rounded-sm flex items-center gap-2 cursor-pointer hover:bg-neutral-200"
						onClick={showDateModal}
					>
						<span className="text-sm">{dateVal}</span>
						{checked ? (
							<Tag color="#87d068">complete</Tag>
						) : dateVal === "yesterday" ? (
							<Tag color="#EC9488">overdue</Tag>
						) : dDiff && dateVal !== "today" ? (
							<Tag color="#EC9488">overdue</Tag>
						) : (
							dateVal === "today" && (
								<Tag color="#F2D600">due soon</Tag>
							)
						)}
						<DownOutlined />
					</div>
				</div>
			)}
		</>
	);
}

export default CheckDate;
