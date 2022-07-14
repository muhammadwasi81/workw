import React, { useEffect, useState } from "react";
import { ClockCircleOutlined, DownOutlined } from "@ant-design/icons";
import { Checkbox, Tag } from "antd";
import { useSelector } from "react-redux";
import moment from "moment";
import { useDispatch } from "react-redux";
import { addListCardDueDate } from "../store/slice";

function CheckDate({ isOutsideRender }) {
	const [checked, setChecked] = useState(false);
	const dispatch = useDispatch();
	const cardId = useSelector(state => state.trelloSlice.addMemberCardId);
	const cardDetail = useSelector(state => state.trelloSlice[cardId]);
	const [dateVal, setDateVal] = useState("");

	const [dueDate, setDueDate] = useState("");

	useEffect(() => {
		if (cardDetail !== undefined) {
			if (checked !== cardDetail.cardDueDate.isCardCompleted) {
				setChecked(cardDetail.cardDueDate.isCardCompleted);
			}
			if (dueDate !== cardDetail.cardDueDate.dueDate) {
				setDueDate(cardDetail.cardDueDate.dueDate);
			}
		}
	}, [cardDetail]);

	useEffect(() => {
		setDateVal(dateToFromNowDaily(dueDate));
	}, [dueDate]);

	const onChange = e => {
		dispatch(
			addListCardDueDate({
				cardId,
				dueDate,
				isCardCompleted: e.target.checked,
			})
		);
	};

	// call this function, passing-in your date
	function dateToFromNowDaily(myDate) {
		const today = moment();
		const tomorrow = moment().add(1, "days");
		const yesterday = moment().add(-1, "days");

		if (moment(myDate, "DD/MM/YYYY").isSame(today, "day")) {
			return "today";
		}
		if (moment(myDate, "DD/MM/YYYY").isSame(tomorrow, "day")) {
			return "tomorrow";
		}
		if (moment(myDate, "DD/MM/YYYY").isSame(yesterday, "day")) {
			return "yesterday";
		}
		return moment(myDate, "DD/MM/YYYY").format("D MMM");
	}

	return (
		<>
			{isOutsideRender ? (
				<div
					className={`group w-fit hover:bg-neutral-200 rounded-sm ${
						checked
							? "bg-green-500 hover:bg-green-600 !text-white"
							: dateVal === "yesterday"
							? "bg-[#eb5a46] hover:bg-[#b04632] !text-white"
							: dateVal === "today" &&
							  "bg-[#f2d600] hover:bg-[#d9b51c] !text-white"
					} p-1`}
				>
					<div className="group-hover:hidden flex items-center gap-2 leading-[1.4rem]">
						<ClockCircleOutlined className="hover:hidden text-base" />
						<span className="pr-[8px]">
							{moment(dueDate, "DD/MM/YYYY").format("D MMM")}
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
								{moment(dueDate, "DD/MM/YYYY").format("D MMM")}
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

					<div className="p-2 bg-neutral-100 rounded-sm flex items-center gap-2 cursor-pointer hover:bg-neutral-200">
						<span className="text-sm">{dateVal}</span>
						{checked ? (
							<Tag color="#87d068">complete</Tag>
						) : dateVal === "yesterday" ? (
							<Tag color="#f50">overdue</Tag>
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
