import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../../utils/routes";
import { CardWrapper2 } from "../../../sharedComponents/Card/CardStyle";
import { Table } from "../../../sharedComponents/customTable";
import { getAllWorkBoard } from "../store/action";
import { tableColumn } from "./tableColumns";
import WorkBoardCard from "./WorkBoardCard";

function WorkBoardDashboard({ isTableView }) {
	const navigate = useNavigate();
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

	const onRow = (record, rowIndex) => {
		return {
			onClick: event => {
				const { id } = record;
				navigate(`${ROUTES.WORKBOARD.BOARD}${id}`);
			}, // click row
			onDoubleClick: event => {}, // double click row
			onContextMenu: event => {}, // right button click row
			onMouseEnter: event => {}, // mouse enter row
			onMouseLeave: event => {}, // mouse leave row
		};
	};

	return (
		<>
			{!isTableView ? (
				<CardWrapper2>
					{workboardsListData.map(data => (
						<WorkBoardCard data={data} />
					))}
				</CardWrapper2>
			) : (
				<Table
					columns={tableColumn()}
					dragable={true}
					// handleChange={handleChange}
					// onPageChange={onPageChange}
					onRow={onRow}
					data={workboardsListData ? workboardsListData : []}
					// status={travelStatus}
					// loadding={loader}
					// success={success}
					// onActionClick={onActionClick}
				/>
			)}
		</>
	);
}

export default WorkBoardDashboard;
