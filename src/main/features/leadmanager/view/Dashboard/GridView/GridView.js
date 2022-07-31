import React from "react";
import { CardWrapper2 } from "../../../../../sharedComponents/Card/CardStyle";
import { getLeadManagerById } from "../../../store/actions";
import { handleComposer } from "../../../store/slice";
import DashboardCardLayout from "../../../UI/DashboardCard/DashboardCardLayout";

function GridView({
	data,
	loading,
	dispatch,
	handleClickNavigation,
	dictionary,
}) {
	return (
		<CardWrapper2>
			{data &&
				data.map(manager => (
					<DashboardCardLayout
						data={manager}
						defaultImg={
							"https://st.depositphotos.com/1062085/4008/v/600/depositphotos_40089703-stock-illustration-businessman-in-the-office-flat.jpg"
						}
						loading={loading}
						handleUpdate={() => {
							dispatch(getLeadManagerById(manager.id));
							dispatch(
								handleComposer({ isOpen: true, isEdit: true })
							);
						}}
						onClick={() => {
							handleClickNavigation(manager.id);
						}}
						dictionary={dictionary}
					/>
				))}
		</CardWrapper2>
	);
}

export default GridView;
