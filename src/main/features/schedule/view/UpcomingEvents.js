import React from "react";
import moment from "moment";
import "../styles/event.css";
import Event from "./event";
function UpcomingEvents({ heading, data }) {
  let tomorrow = moment()
    .add(1, "days")
    .format("DD MMMM YYYY")
    .toString();
  console.log("tomorrow", tomorrow);
  return (
    <div className="eventWrapper">
      <div className="eventWrapper__header">
        <p>{heading}</p>
      </div>
      <div className="eventWrapper__body">
        {data?.length > 0 ? (
          data?.map((event) => <Event data={event} />)
        ) : (
          <span className="font-semibold">No Events on this day.</span>
        )}
      </div>
    </div>
  );
}

export default UpcomingEvents;
