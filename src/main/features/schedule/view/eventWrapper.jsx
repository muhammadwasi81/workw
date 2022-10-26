import React from "react";
import { Skeleton } from "antd";
import "../styles/event.css";
import Event from "./event";
function EventWrapper({ data, heading = "Events", loading = false }) {
	console.log("data", data);

	// if (loading) {
	// 	return <Skeleton.Input active size block />;
	// }
	return (
		<div className="eventWrapper">
			<div className="eventWrapper__header">
				<p>{heading}</p>
			</div>
			<div className="eventWrapper__body">
				{loading ? (
					<Skeleton.Input active size block />
				) : data?.length > 0 ? (
					data?.map(event => <Event data={event} />)
				) : (
					<span className="font-semibold">
						No Events on this day.
					</span>
				)}
			</div>
		</div>
	);
}

export default EventWrapper;
