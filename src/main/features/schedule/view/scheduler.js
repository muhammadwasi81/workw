import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "../styles/style.css";
import "../styles/calender.css";
// import Event from "./event";
import { Calendar } from "antd";
import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleEventDetailComposer } from "../store/slice";
import EventDetail from "./eventDetail";
import moment from "moment";
import { getAllSchedule } from "../store/action";
import { defaultUiid } from "../../../../utils/Shared/enums/enums";

function Scheduler({ feed = false }) {
	const [sched, setSchedule] = useState(null);
	const [calendatView, setCalendatView] = useState("");
	const [todayDate, setTodayDate] = useState(new Date());
	const [isCalendarOpen, setIsCalendarOpen] = useState(false);
	const schedules = useSelector(state => state.scheduleSlice.schedules);
	const calendarRef = useRef();
	let isPanelChange = false;
	const dispatch = useDispatch();
	// const renderEventContent = eventInfo => {
	// 	return <Event eventInfo={eventInfo} />;
	// };
	useEffect(() => {
		fetchAllSchedule(todayDate, todayDate);
	}, []);

	const fetchAllSchedule = (startVal, endVal) => {
		const startDate = moment(startVal)
			.startOf("month")
			.format();
		const endDate = moment(endVal)
			.endOf("month")
			.format();

		dispatch(
			getAllSchedule({
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

	const handleDateChange = date => {
		if (!moment(date).isSame(moment(todayDate), "month")) {
			setTodayDate(new Date(calendarRef.current.getApi().getDate()));
			fetchAllSchedule(
				calendarRef.current.getApi().getDate(),
				calendarRef.current.getApi().getDate()
			);
		}
	};

	const onChange = value => {
		const date = value.format("YYYY-MM-DD");
		handleDateChange(date);
		calendarRef.current
			.getApi()
			.gotoDate(new Date(value.format("YYYY-MM-DD")));
		if (isPanelChange) {
			setIsCalendarOpen(true);
			isPanelChange = false;
		} else {
			setIsCalendarOpen(false);
		}
	};
	let data = schedules?.map(sch => {
		return {
			...sch,
			start: new Date(sch.startDate),
			end: new Date(sch.endDate),
			title: sch.subject,
		};
	});

	// console.log("calendarRef.current.getApi().getDate()", calendarRef.current);
	return (
		<>
			<EventDetail />
			<div className={`schedulerCalender ${calendatView}`}>
				<FullCalendar
					ref={calendarRef}
					customButtons={{
						myCustomButton: {
							text: "",
							click: () => {
								setIsCalendarOpen(!isCalendarOpen);
							},
						},
						next: {
							text: "Next",
							click: function (value) {
								calendarRef.current.getApi().next();
								const date = moment(
									calendarRef.current.getApi().getDate()
								).format("YYYY-MM-DD");
								handleDateChange(date);
							},
						},
						prev: {
							text: "Prev",
							click: function (value) {
								calendarRef.current.getApi().prev();
								const date = moment(
									calendarRef.current.getApi().getDate()
								).format("YYYY-MM-DD");
								handleDateChange(date);
							},
						},
					}}
					headerToolbar={
						feed
							? { start: "title myCustomButton" }
							: {
								left: "timeGridDay prev next today",
								center: "title,myCustomButton",
								right: "timeGridWeek dayGridMonth",
							}
					}
					eventClick={info => {
						// console.log("info", info.event._def);
						// setSchedule({
						// 	id: info.event._def.publicId,
						// 	scheduleType:
						// 		info.event._def.extendedProps.scheduleType,
						// });
						// setId(parseInt(info.event._def.publicId));
						dispatch(
							toggleEventDetailComposer({
								id: info.event._def.publicId,
								scheduleType:
									info.event._def.extendedProps.scheduleType,
							})
						);
					}}
					datesSet={val => {
						if (val.view.type !== "timeGridDay") {
							setCalendatView(val.view.type);
						} else {
							setCalendatView("");
						}
					}}
					// nowIndicator={true}
					// eventMaxStack={3}
					selectable={true}
					dayHeaders={true}
					allDaySlot={true}
					allDayText={"All Day"}
					// allDaySlot={true}
					// allDay={true}
					dayMaxEventRows={true}
					editable={true}
					plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
					initialView={!feed ? "dayGridWeek" : "timeGridDay"}
					events={
						data
						// "https://fullcalendar.io/api/demo-feeds/events.json"
					}
					eventResize={() => { }}
					slotDuration={"00:15:00"}
					slotLabelFormat={{ hour: "numeric", minute: "numeric" }}
					views={{
						// allDaySlot: true,
						month: {
							// allDaySlot: true,
							type: "dayGridMonth",
							buttonText: "Month",
							dayMaxEventRows: 2,
						},
						week: {
							// allDaySlot: true,
							type: "dayGridWeek",
							duration: { days: 7 },
							buttonText: "Week",
							eventMaxStack: 2,
						},
						day: {
							// allDaySlot: true,
							type: "timeGrid",
							duration: { days: 1 },
							buttonText: "Day",
							eventMaxStack: 3,
						},
						// schedules: {
						// 	allDaySlot: true,
						// 	allDay: true,
						// },

						// listMonth: {
						// 	buttonText: "List",
						// },
					}}
				// locale="en-GB"
				// eventContent={renderEventContent}
				//   locales={allLocales}
				//   locale="ja"
				// datesSet={(args) => console.log("###datesSet:", args)}
				//   dateClick={handleDateClick}
				/>
				<div className="flex justify-center">
					<div
						className={
							isCalendarOpen
								? "site-calendar open"
								: "site-calendar "
						}
					>
						<Calendar
							fullscreen={false}
							onChange={onChange}
							onPanelChange={() => {
								isPanelChange = true;
							}}
						/>
					</div>
				</div>
			</div>
		</>
	);
}

export default Scheduler;
