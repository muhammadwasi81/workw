import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CardWrapper2 } from "../../../sharedComponents/Card/CardStyle";
import { getAllWorkBoard } from "../store/action";
import WorkBoardCard from "./WorkBoardCard";

function WorkBoardDashboard({ onWorkBoardClick }) {
	const [first, setfirst] = useState("");
	const dispatch = useDispatch();
	const workboardsListData = useSelector(
		state => state.trelloSlice.workboardsList
	);
	useEffect(() => {
		dispatch(
			getAllWorkBoard({
				pageNo: 0,
				pageSize: 0,
				search: "",
			})
		);
	}, []);

	return (
		<>
			<CardWrapper2>
				{workboardsListData.map(data => (
					<WorkBoardCard
						data={data}
						onWorkBoardClick={onWorkBoardClick}
					/>
				))}
			</CardWrapper2>
		</>
	);
}

export default WorkBoardDashboard;
