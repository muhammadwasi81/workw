import moment from "moment";
import React from "react";
// import "../styles/event.css";
function Event({ data, handleScheduleDetailComposer }) {
	// const data = eventInfo?.event._def.extendedProps;
	// shortDesc = false, eventInfo

	return (
		<div
			className="event hover:!border-primary-color cursor-pointer transition-all"
			onClick={()=>handleScheduleDetailComposer(data)}
		>
			<div className="left">
				<p>{moment(data?.startDate).format("DD MMM")}</p>
				<span>{moment(data?.startDate).format("dddd")}</span>
			</div>
			<div className="right">
				<p className="!text-primary-color">{data?.subject}</p>
				{/* <div dangerouslySetInnerHTML={{ __html: data?.description }} /> */}
				<span dangerouslySetInnerHTML={{ __html: data?.description }} />
				{/* {shortDesc && (
					// <span>Thu, Jul 14, 2022 6:55 PM thu, Jul 14, 2022</span>
				)} */}
			</div>
		</div>
	);
}

export default Event;
