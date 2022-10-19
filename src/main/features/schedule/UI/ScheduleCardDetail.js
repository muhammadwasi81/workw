import { Avatar } from "antd";
import React from "react";

function ScheduleCardDetail() {
	return (
		<div className="p-3 flex flex-1 items-center gap-3 bg-[#F4F4F4] rounded-lg border border-[#757d86] cursor-pointer hover:border-[#6d757e] hover:shadow-lg transition">
			<div className="flex flex-col w-[100px] border-r-2 border-[#d9d9d9] px-1">
				<h3 className="text-lg font-semibold">DEC 25</h3>
				<p className="!m-0 text-xs text-[#757d86]">SAT 6:55 PM</p>
			</div>

			<div className="flex justify-between flex-1 items-center">
				<div className="flex flex-col">
					<h3 className="text-base font-semibold">
						Crismistmas, Quid Day
					</h3>
					<Avatar size={"small"} />
				</div>
				<div>Icon</div>
			</div>
		</div>
	);
}

export default ScheduleCardDetail;
