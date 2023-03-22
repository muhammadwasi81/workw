import React from "react";
import moment from "moment";
import Avatar from "../../../sharedComponents/Avatar/avatar";
// import { Avatar } from "antd";
// import AvatarGroup from "../../../sharedComponents/Avatar/AvatarGroup";
// import MultipleAvatars from "../../../sharedComponents/Avatar/MultipleAvatars";
import plane from "../../../../content/NewContent/Schedule/plane.svg";
import calendar from "../../../../content/NewContent/Schedule/calendar.svg";
import task from "../../../../content/NewContent/Schedule/task.svg";
import { ScheduleTypeEnum } from "../enum/enum";

function ScheduleCardDetail({ schedule }) {
	return (
		<div className="p-3 flex flex-1 items-center gap-3 bg-[#F4F4F4] rounded-lg border border-[#757d86] cursor-pointer  transition ">
			<div className="flex flex-col w-[100px] border-r-2 border-[#d9d9d9] px-1">
				<h3 className="text-lg font-semibold">
					{moment(schedule?.startDate).format("MMM D")}
				</h3>
				<p className="!m-0 text-xs text-[#757d86]">
					{moment(schedule?.startDate).format("hh:mm A")}
				</p>
			</div>

			<div className="flex justify-between flex-1 items-center">
				<div className="flex flex-col">
					<h3 className="text-base font-semibold">
						{schedule?.subject}
					</h3>
					<Avatar
						heading={"members"}
						membersData={schedule?.members}
					/>
				</div>
				<div>
					<img
						src={
							schedule?.scheduleType === ScheduleTypeEnum.Task
								? task
								: schedule?.scheduleType ===
								  ScheduleTypeEnum.Travel
								? plane
								: calendar
						}
						alt="icon"
						className="h-[40px]"
					/>
				</div>
			</div>
		</div>
	);
}

export default ScheduleCardDetail;
