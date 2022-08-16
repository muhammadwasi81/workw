import React from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "../styles/style.css";
import Event from "./event";
function Scheduler() {
  const renderEventContent = (eventInfo) => {
    return (
      <Event />
      // <>
      //   <b>{eventInfo.timeText}</b>
      //   <i>{eventInfo.event.title}</i>
      // </>
    );
  };
  return (
    <FullCalendar
      dayHeaders={false}
      allDaySlot={false}
      plugins={[timeGridPlugin, interactionPlugin]}
      initialView="timeGrid"
      weekends={false}
      events={[{ title: "event 1", date: Date.now() }]}
      //   locales={allLocales}
      //   locale="ja"
      editable={true}
      eventContent={renderEventContent}
      eventResize={() => {}}
      //   dateClick={handleDateClick}
    />
  );
}

export default Scheduler;
