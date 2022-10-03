import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ROUTES } from "../../../../../utils/routes";
import Header from "../../../../layout/header";
import { getLeadManagerById } from "../../store/actions";
import Board from "./Board";
import BoardTopBar from "./BoardTopBar/BoardTopBar";
import LeadsOverview from "./LeadsOverview";

function BoardViews() {
	const [view, setView] = useState("List");
	const dispatch = useDispatch();
	const { id } = useParams();
	useEffect(() => {
		dispatch(getLeadManagerById(id));
	}, []);
	const leadManagerDetail = useSelector(
		state => state.leadMangerSlice.leadManagerDetail
	);
	const items = [
		{
			name: leadManagerDetail && leadManagerDetail.name,
			to: `${ROUTES.LEAD_MANAGER.LEAD_GROUP_DETAIL}${id}`,
			onClick: () => {
				dispatch(getLeadManagerById(id));
			},
		},
	];
	return (
		<div>
			<Header items={items} />
			<BoardTopBar
				handleView={view => {
					setView(view);
				}}
			/>
			{view === "List" ? (
				<LeadsOverview />
			) : view === "Board" ? (
				<Board />
			) : (
				<LeadsOverview />
			)}
		</div>
	);
}

export default BoardViews;
