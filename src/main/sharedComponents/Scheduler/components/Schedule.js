import moment from "moment";
import React from "react";
import Event from "./Event";
import TimeSlots from "./TimeSlots";

function Schedule({ currentDate }) {
  const timeslots = (() => {
    return [...Array(24)].map((item, index) => {
      if (index <= 11) return `${index + 1}am`;
      return `${index - 11}pm`;
    });
  })();
  const events = [
    {
      date: moment.now(),
      title: "hello ",
      description: "Loremsdsdfsdfsdfsdfds",
      from: "12am",
      to: "1am",
    },
    // {
    //   date: moment.now(),
    //   title: "hello zain2",
    //   description: "Loremsdsdfsdfsdfsdfds",
    //   from: "4am",
    //   to: "5am",
    // },
  ];
  return (
    <div className="schedule">
      {timeslots.map((item) => (
        <TimeSlots time={item} />
      ))}
      {events.map((event, index) => {
        if (
          moment(event.date, "dddd HH:mm:ss").isSame(
            moment(currentDate, "dddd HH:mm:ss"),
            "day"
          )
        ) {
          return <Event key={index} event={event} />;
        }
      })}
    </div>
  );
}

export default Schedule;
