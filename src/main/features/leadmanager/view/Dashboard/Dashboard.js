import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CardWrapper2 } from "../../../../sharedComponents/Card/CardStyle";
import { getAllLeadManager } from "../../store/actions";
import GridView from "./GridView/GridView";

function LeadDashboard({ isTableView }) {
	const dispatch = useDispatch();
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

	return (
		<>
			{!isTableView && (
				<CardWrapper2>
					<GridView
						data={leadManagerData}
						loading={loading}
						dispatch={dispatch}
					/>
				</CardWrapper2>
			)}
		</>
	);
}

export default LeadDashboard;
