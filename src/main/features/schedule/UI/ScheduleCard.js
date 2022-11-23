import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { getAllSchedule } from "../store/action";
import ScheduleCardDetail from "./ScheduleCardDetail";
import { defaultUiid } from "../../../../utils/Shared/enums/enums";
import Scroll from "../../../sharedComponents/ScrollSelect/infinteScoll";

function ScheduleCard({ sheduleType = "" }) {
	const schedules = useSelector(state => state.scheduleSlice.schedules);
	const loading = useSelector(state => state.scheduleSlice.loading);
	const [pageNo, setPageNo] = useState(1);
	const dispatch = useDispatch();

	const fetchAllSchedule = (startDate, endDate) => {
		// const startDate = moment(startVal).format();
		// const endDate = moment(endVal).format();

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
	// console.log("sheduleType", sheduleType);
	useEffect(() => {
		if (sheduleType === "Today") {
			fetchAllSchedule(moment().format(), moment().format());
		}
		if (sheduleType === "Past") {
			fetchAllSchedule(
				"",
				moment()
					.subtract(1, "days")
					.format()
			);
		}
		if (sheduleType === "Upcoming") {
			fetchAllSchedule(
				moment()
					.add(1, "days")
					.format(),
				""
			);
		}
	}, [pageNo, sheduleType]);

	return (
		<Scroll
			isLoading={loading}
			data={schedules}
			fetchMoreData={pageNo => {
				setPageNo(pageNo);
			}}
			loader={<>Loading schedules...</>}
			endMessage={"No data..."}
		>
			{schedules?.map(schedule => (
				<div className="rounded-lg p-3 bg-white  flex flex-col gap-3 mb-2 hover:border-primary-color hover:border transition-all">
					<div className="flex flex-col">
						{/* <p className="text-[#757d86]">SAT,Jul 14,2022</p> */}
						<ScheduleCardDetail schedule={schedule} />
					</div>
				</div>
			))}
		</Scroll>
	);
}

export default ScheduleCard;
