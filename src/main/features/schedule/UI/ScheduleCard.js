import ScheduleCardDetail from "./ScheduleCardDetail";

function ScheduleCard({ schedules = [] }) {
	return (
		<>
			{schedules.map(schedule => (
				<div className="rounded-lg p-3 bg-white hover:shadow-lg flex flex-col gap-3 mb-2">
					<div className="flex flex-col">
						<p className="text-[#757d86]">SAT,Jul 14,2022</p>
						<ScheduleCardDetail />
					</div>
				</div>
			))}
		</>
	);
}

export default ScheduleCard;
