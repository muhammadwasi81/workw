import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../../../utils/routes";
import { Table } from "../../../../sharedComponents/customTable";
// import Spinner from "../../../../sharedComponents/spinner/spinner";
// import { getAllLeadManager } from "../../store/actions";
import ComposeEmail from "../Email/ComposeEmail";
import GridView from "./GridView/GridView";
import { tableColumn } from "./TableView/tableColumn";

function LeadDashboard({ isTableView, dictionary, data, onChange }) {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const loading = useSelector(state => state.leadMangerSlice.loading);
	const onRow = (record, rowIndex) => {
		return {
			onClick: event => {
				const { id } = record;
				handleClickNavigation(id);
			}, // click row
			onDoubleClick: event => {}, // double click row
			onContextMenu: event => {}, // right button click row
			onMouseEnter: event => {}, // mouse enter row
			onMouseLeave: event => {}, // mouse leave row
		};
	};
	const handleClickNavigation = id => {
		navigate(`${ROUTES.LEAD_MANAGER.LEAD_GROUP_DETAIL}${id}`);
	};

	return (
		<>
			{!isTableView ? (
				<GridView
					data={data}
					loading={loading}
					dispatch={dispatch}
					handleClickNavigation={handleClickNavigation}
					dictionary={dictionary}
				/>
			) : (
				<Table
					columns={tableColumn(dictionary)}
					dragable={true}
					handleChange={onChange}
					// onPageChange={onPageChange}
					onRow={onRow}
					data={data ? data : []}
					// status={travelStatus}
					loading={loading}
					// success={success}
					// onActionClick={onActionClick}
				/>
			)}
			<ComposeEmail />
		</>
	);
}

export default LeadDashboard;
