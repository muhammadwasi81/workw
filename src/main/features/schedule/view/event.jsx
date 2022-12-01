import { Tag } from "antd";
import moment from "moment";
import React from "react";
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
					{showTag && (data?.scheduleType === 5 || data?.scheduleType === 6) && (
						<Tag
							color={
								data?.scheduleType === 5
									? "#800080"
									: data?.scheduleType === 6
									? "#ff0000"
									: ""
							}
							className={`!p-1 !text-[12px] !text-white`}
						>
							{data?.scheduleType === 5 ? "Task" : "Travel"}
						</Tag>
					)}
				</div>
			</div>
		</div>
	);
}

export default Event;
