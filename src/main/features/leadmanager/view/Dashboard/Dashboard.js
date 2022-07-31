import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../../../utils/routes";
import { Table } from "../../../../sharedComponents/customTable";
import Spinner from "../../../../sharedComponents/spinner/spinner";
import { getAllLeadManager } from "../../store/actions";
import GridView from "./GridView/GridView";
import { tableColumn } from "./TableView/tableColumn";

function LeadDashboard({ isTableView, dictionary }) {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const leadManagerData = useSelector(
		state => state.leadMangerSlice.leadManagersData
	);
	const loading = useSelector(state => state.leadMangerSlice.loading);
	useEffect(() => {
		dispatch(
			getAllLeadManager({
				pageNo: 0,
				pageSize: 0,
				search: "",
				sortBy: 1,
			})
		);
	}, []);

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
				loading ? (
					<Spinner />
				) : (
					<GridView
						data={leadManagerData}
						loading={loading}
						dispatch={dispatch}
						handleClickNavigation={handleClickNavigation}
						dictionary={dictionary}
					/>
				)
			) : (
				<Table
					columns={tableColumn(dictionary)}
					dragable={true}
					// handleChange={handleChange}
					// onPageChange={onPageChange}
					onRow={onRow}
					data={leadManagerData ? leadManagerData : []}
					// status={travelStatus}
					loading={loading}
					// success={success}
					// onActionClick={onActionClick}
				/>
			)}
		</>
	);
}

export default LeadDashboard;
