import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CardWrapper2 } from "../../../sharedComponents/Card/CardStyle";
import { getAllWorkBoard } from "../store/action";
import WorkBoardCard from "./WorkBoardCard";

function WorkBoardDashboard() {
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
					<WorkBoardCard data={data} />
				))}
			</CardWrapper2>
		</>
	);
}

export default WorkBoardDashboard;
