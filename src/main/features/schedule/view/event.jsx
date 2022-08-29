import moment from "moment";
import React from "react";
import "../styles/event.css";
function Event({ shortDesc = false, eventInfo }) {
	const data = eventInfo?.event._def.extendedProps;
	console.log("data", data);
	return (
		<div className="event">
			<div className="left">
				<p>{moment(data?.startDate).format("DD MMM")}</p>
				<span>{moment(data?.startDate).format("dddd")}</span>
			</div>
			<div className="right">
				<p className="!text-primary-color">{data?.subject}</p>
				{/* <div dangerouslySetInnerHTML={{ __html: data?.description }} /> */}
				{shortDesc && (
					<span
						dangerouslySetInnerHTML={{ __html: data?.description }}
					/>
					// <span>Thu, Jul 14, 2022 6:55 PM thu, Jul 14, 2022</span>
				)}
			</div>
		</div>
	);
}

export default Event;
