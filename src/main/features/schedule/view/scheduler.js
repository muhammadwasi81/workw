import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "../styles/style.css";
import "../styles/calender.css";
import Event from "./event";
import { Calendar } from "antd";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { toggleEventDetailComposer } from "../store/slice";
import EventDetail from "./eventDetail";

function Scheduler() {
  const [id, setId] = useState("");
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const calendarRef = useRef();
  let isPanelChange = false;
  const dispatch = useDispatch();
  const renderEventContent = (eventInfo) => {
    return (
      <Event />
      // <>
      //   <b>{eventInfo.timeText}</b>
      //   <i>{eventInfo.event.title}</i>
      // </>
    );
  };

  const onChange = (value) => {
    calendarRef.current.getApi().gotoDate(new Date(value.format("YYYY-MM-DD")));
    if (isPanelChange) {
      setIsCalendarOpen(true);
      isPanelChange = false;
    } else {
      setIsCalendarOpen(false);
    }
  };
  return (
    <>
      <EventDetail id={id} />
      <div className="schedulerCalender">
        <FullCalendar
          ref={calendarRef}
          customButtons={{
            myCustomButton: {
              text: "",
              click: () => {
                setIsCalendarOpen(!isCalendarOpen);
              },
            },
          }}
          headerToolbar={{
            start: "title myCustomButton",
          }}
          eventClick={(info) => {
            setId(parseInt(info.event._def.publicId));
            dispatch(toggleEventDetailComposer());
          }}
          header
          dayHeaders={false}
          allDaySlot={false}
          plugins={[timeGridPlugin, interactionPlugin]}
          initialView="timeGrid"
          events={[{ id: 3, title: "event 1", date: Date.now() }]}
          //   locales={allLocales}
          //   locale="ja"
          // datesSet={(args) => console.log("###datesSet:", args)}
          editable={true}
          eventContent={renderEventContent}
          eventResize={() => {}}

          //   dateClick={handleDateClick}
        />

        <div
          className={isCalendarOpen ? "site-calendar open" : "site-calendar "}
        >
          <Calendar
            fullscreen={false}
            onChange={onChange}
            onPanelChange={() => {
              isPanelChange = true;
            }}
          />
        </div>
      </div>
    </>
  );
}

export default Scheduler;
