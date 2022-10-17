import React from "react";
import { BsArrowRight } from "react-icons/bs";

function EventDetail() {
	return (
		<div className="rounded-md p-3 bg-primary-color">
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
						<div className="flex gap-2 items-center text-[#757d86]">
							<p className="!m-0 text-xs">
								Thu, Jul 14, 2022 6:55 PM
							</p>
							<BsArrowRight />
							<p className="!m-0 text-xs ">
								Thu, Jul 14, 2022 7:00 PM
							</p>
						</div>
					</div>
					<div className="p-2 border rounded-lg border-[#757d86]">
						Minutes of Meetings
					</div>
				</div>
			</div>
		</div>
	);
}

export default EventDetail;
