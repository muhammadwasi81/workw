import React from "react";

function Event({ event }) {
  const getHeight = (from, to, meridiemFrom, meridiemTo) => {
    if (meridiemFrom === meridiemTo) {
      return from === "12"
        ? Math.abs((from - to - 12) * 60)
        : Math.abs((from - to) * 60);
    } else {
      if (from === "12") {
        if (meridiemFrom === "pm" && meridiemTo === "am") {
          return Math.abs((from - to - 12) * 60 * 2) - to * 60;
        } else {
          return Math.abs((from - to - 12) * 60 * 2);
        }
      } else {
        if (meridiemFrom === "pm" && meridiemTo === "am") {
          return Math.abs((from - to) * 60) + 720 - to * 60;
        } else {
          return Math.abs((from - to) * 60) + 720;
        }
      }
    }
  };
  //   const { description, from, to, title } = event;
  let from = event.from.split("");
  const meridiemFrom = from.splice(-2).join("");
  from = from.join("");

  let to = event.to.split("");
  const meridiemTo = to.splice(-2).join("");
  to = to.join("");
  const height = getHeight(from, to, meridiemFrom, meridiemTo);

  const position = meridiemFrom === "pm" ? from * 60 + 720 : from * 60;
  return (
    <div
      className="event"
      style={{ height: `${height}px`, top: `${position}px` }}
    >
      <p>{event.title} </p>
      <p style={{ fontSize: "12px", marginLeft: "10px" }}>
        {event.from}-{event.to}
      </p>
    </div>
  );
}

export default Event;
