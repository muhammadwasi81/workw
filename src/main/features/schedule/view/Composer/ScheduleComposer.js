import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Drawer } from "antd";

import TravelDetail from "../../../travel/view/TravelDetail/TravelDetail";
import { getScheduleById } from "../../store/action";
import ScheduleCompoerDetail from "./ScheduleCompoerDetail";
import { resetTravelDetail } from "../../../travel/store/slice";
// import { toggleEventDetailComposer } from "../../store/slice";

function ScheduleComposer({ onClose, id, visible, type, Direction }) {
	const dispatch = useDispatch();
	useEffect(() => {
		if (type != 6 && id) {
			dispatch(getScheduleById(id));
		}
		return () => {
			if (type === 6) {
				dispatch(resetTravelDetail());
			}
		};
	}, [id]);
	return (
		<Drawer
			title={type === 6 ? "Travel Detail" : "Schedule Detail"}
			placement={Direction === "ltr" ? "right" : "left"}
			width="768"
			onClose={() => {
				onClose();
			}}
			visible={visible}
			destroyOnClose={true}
			className=" drawerSecondary"
		>
			{type === 6 ? (
				<TravelDetail travelId={id} />
			) : (
				<ScheduleCompoerDetail />
			)}
		</Drawer>
	);
}

export default ScheduleComposer;
