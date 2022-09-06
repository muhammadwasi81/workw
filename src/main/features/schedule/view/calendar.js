import React from "react";
import EventWrapper from "./eventWrapper";
import Scheduler from "./scheduler";
import { Calendar as AntCalendar, Badge } from "antd";
import "../styles/calender.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllEventSchedule } from "../store/action";
import { defaultUiid } from "../../../../utils/Shared/enums/enums";
import { useEffect } from "react";
import moment from "moment";

function Calendar() {
	const dispatch = useDispatch();
	const eventSchedules = useSelector(
		state => state.scheduleSlice.eventSchedules
	);

	useEffect(() => {
		fetchAllEventSchedule(new Date(), new Date());
	}, []);

	const fetchAllEventSchedule = (startVal, endVal) => {
		const startDate = moment(startVal)
			.startOf("month")
			.format();
		const endDate = moment(endVal)
			.endOf("month")
			.format();

		dispatch(
			getAllEventSchedule({
				pageNo: 1,
				pageSize: 20,
				search: "",
				sortBy: 1,
				referenceId: defaultUiid,
				referenceType: 0,
				startDate,
				endDate,
			})
		);
	};

	const dateCellRender = value => {
		return (
			<ul className="schedule_badge">
				{eventSchedules.map(item => {
					const startDate = moment(item.startDate).format(
						"YYYY-MM-DD"
					);
					const endDate = moment(item.endDate).format("YYYY-MM-DD");
					const compareDate = moment(value).format("YYYY-MM-DD");

					if (moment(compareDate).isBetween(startDate, endDate)) {
						return (
							<li key={item.id}>
								<Badge status={"error"} />
							</li>
						);
					}
				})}
			</ul>
		);
	};
	return (
		<div className="calender">
			<div className="left">
				<Scheduler />
			</div>
			<div className="right">
				<AntCalendar
					fullscreen={false}
					dateCellRender={dateCellRender}
					className="schedule_calendar"
				/>
				<div className="events">
					<EventWrapper />
					<EventWrapper />
				</div>
			</div>
		</div>
	);
}

export default Calendar;
