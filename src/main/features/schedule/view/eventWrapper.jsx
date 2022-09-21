import React from "react";
import "../styles/event.css";
import Event from "./event";
function EventWrapper({data}) {
  console.log('data',data
  );
  return (
    <div className="eventWrapper">
      <div className="eventWrapper__header">
        <p>Events</p>
      </div>
      <div className="eventWrapper__body">
        {
          data?.map(event=>(

            <Event data={event} />
          ))
        }
        {/* <Event />
        <Event />
        <Event />
        <Event />
        <Event /> */}
      </div>
    </div>
  );
}

export default EventWrapper;
