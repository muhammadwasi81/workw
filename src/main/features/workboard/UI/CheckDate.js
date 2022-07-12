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
	// console.log("card id", CardId, cardId);
	const cardDetail = useSelector(state => state.trelloSlice[cardId]);

	const [dueDate, setDueDate] = useState("");

	// useEffect(() => {
	// 	if (cardDetail !== undefined) {
	// 		if (dueDate !== cardDetail.cardDueDate.dueDate) {
	// 			setDueDate(cardDetail.cardDueDate.dueDate);
	// 		}
	// 	}
	// }, [cardDetail]);
	console.log("card detail", cardDetail);
	// const defaultdueDate = useSelector(
	// 	state => state.trelloSlice[addMemberCardId]
	// );
	// const [dueDate, setDueDate] = useState("");
	// console.log("dues", cardDetail);

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

	const onChange = e => {
		dispatch(
			addListCardDueDate({
				cardId,
				dueDate,
				isCardCompleted: e.target.checked,
			})
		);
	};
	return (
		<>
			{isOutsideRender ? (
				<div
					className={`group w-fit hover:bg-neutral-200 rounded-sm ${
						checked &&
						"bg-green-500 hover:bg-green-600 !text-white "
					} p-1`}
				>
					<div className="group-hover:hidden flex items-center gap-2 leading-[1.4rem]">
						<ClockCircleOutlined className="hover:hidden text-base" />
						<span className="pr-[8px]">
							{moment(dueDate, "DD/MM/YYYY").format("D MMM")}
						</span>
					</div>

					<div className="hidden group-hover:block leading-[1.4rem]">
						<Checkbox
							onChange={onChange}
							checked={checked}
							className={`text-base !pr-0 ${
								checked && `!text-white`
							}`}
						>
							<span className="text-sm">
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
						<span className="text-sm">
							{moment(dueDate, "DD/MM/YYYY").format("D MMM")}
						</span>
						{checked ? (
							<Tag color="#87d068">complete</Tag>
						) : (
							<Tag color="#f50">overdue</Tag>
						)}
						<DownOutlined />
					</div>
				</div>
			)}
		</>
	);
}

export default CheckDate;
