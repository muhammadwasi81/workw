import React from "react";
// import { Tag } from "antd";
import moment from "moment";
import { ScheduleTypeEnum } from "../enum/enum";
import plane from "../../../../content/NewContent/Schedule/plane.svg";
import calendar from "../../../../content/NewContent/Schedule/calendar.svg";
import task from "../../../../content/NewContent/Schedule/task.svg";
// import "../styles/event.css";
function Event({ data, handleScheduleDetailComposer, showTag = false }) {
	// const data = eventInfo?.event._def.extendedProps;

	return (
		<div
			className="event hover:!border-primary-color cursor-pointer transition-all"
			onClick={() => handleScheduleDetailComposer(data)}
		>
			<div className="left">
				<p>{moment(data?.startDate).format("DD MMM")}</p>
				<span>{moment(data?.startDate).format("dddd")}</span>
			</div>
			<div className="right w-full">
				<div className="flex justify-between items-center w-full h-0">
					<div>
						<p className="!text-primary-color">{data?.subject}</p>
						<span
							dangerouslySetInnerHTML={{
								__html: data?.description,
							}}
						/>
					</div>
					<img
						src={
							data?.scheduleType === ScheduleTypeEnum.Task
								? task
								: data?.scheduleType ===
								  ScheduleTypeEnum.Travel
								? plane
								: calendar
						}
						alt="icon"
						className="h-[30px]"
					/>
					{/* {showTag && (data?.scheduleType === ScheduleTypeEnum.Task || data?.scheduleType === ScheduleTypeEnum.Travel) && (
						<Tag
							color={
								data?.scheduleType === ScheduleTypeEnum.Task
									? "#800080"
									: data?.scheduleType === ScheduleTypeEnum.Travel
									? "#ff0000"
									: ""
							}
							className={`!p-1 !text-[12px] !text-white`}
						>
							{data?.scheduleType === ScheduleTypeEnum.Task ? "Task" : "Travel"}
						</Tag>
					)} */}
				</div>
			</div>
		</div>
	);
}

export default Event;
