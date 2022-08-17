import React from "react";
import "../styles/event.css";
function Event({ shortDesc = false }) {
  return (
    <div className="event">
      <div className="left">
        <p>25 Dec</p>
        <span>Sun</span>
      </div>
      <div className="right">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat,
          ipsa.
        </p>
        {shortDesc && <span>Thu, Jul 14, 2022 6:55 PM thu, Jul 14, 2022</span>}
      </div>
    </div>
  );
}

export default Event;
