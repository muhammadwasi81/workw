import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Drawer } from "antd";
import ScheduleComposerDetail from "./ScheduleComposerDetail";
import { resetTravelDetail } from "../../../travel/store/slice";
import TaskDetail from "../../../task/view/TaskDetail/TaskDetail";
import TravelDetail from "../../../travel/view/TravelDetail/TravelDetail";
// import { toggleEventDetailComposer } from "../../store/slice";

function ScheduleComposer({ onClose, id, visible, type, Direction }) {
	const dispatch = useDispatch();
	useEffect(() => {
		return () => {
			if (type === 6) {
				dispatch(resetTravelDetail());
			}
		};
	}, [id]);
	return (
		<Drawer
			title={
				type === 6
					? "Travel Detail"
					: type === 5
					? "Task Detail"
					: "Schedule Detail"
			}
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
			) : type === 5 ? (
				<TaskDetail id={id} />
			) : (
				<ScheduleComposerDetail id={id} />
			)}
		</Drawer>
	);
}

export default ScheduleComposer;
