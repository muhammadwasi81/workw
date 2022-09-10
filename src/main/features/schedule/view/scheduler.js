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
import moment from "moment";
import { getAllSchedule } from "../store/action";
import { defaultUiid } from "../../../../utils/Shared/enums/enums";
import { useSelector } from "react-redux";

function Scheduler() {
  const [id, setId] = useState("");
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const schedules = useSelector((state) => state.scheduleSlice.schedules);
  const calendarRef = useRef();
  let isPanelChange = false;
  const dispatch = useDispatch();
  const renderEventContent = (eventInfo) => {
    return (
      <Event eventInfo={eventInfo} />
      // <>
      //   <b>{eventInfo.timeText}</b>
      //   <i>{eventInfo.event.title}</i>
      // </>
    );
  };
  useEffect(() => {
    fetchAllSchedule(new Date(), new Date());
  }, []);

  const fetchAllSchedule = (startVal, endVal) => {
    const startDate = moment(startVal)
      .startOf("day")
      .format();
    const endDate = moment(endVal)
      .endOf("day")
      .format();

    dispatch(
      getAllSchedule({
        pageNo: 1,
        pageSize: 20,
        search: "",
        sortBy: 1,
        referenceId: defaultUiid,
        referenceType: 0,
        startDate,
        endDate,
      })
    );
  };

  const onChange = (value) => {
    fetchAllSchedule(value, value);
    calendarRef.current.getApi().gotoDate(new Date(value.format("YYYY-MM-DD")));
    if (isPanelChange) {
      setIsCalendarOpen(true);
      isPanelChange = false;
    } else {
      setIsCalendarOpen(false);
    }
  };
  let data = schedules?.map((sch) => {
    return {
      ...sch,
      start: new Date(sch.startDate),
      end: new Date(sch.endDate),
      title: sch.subject,
    };
  });
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
            next: {
              text: "Next",
              click: function(value) {
                calendarRef.current.getApi().next();
                fetchAllSchedule(
                  calendarRef.current.getApi().getDate(),
                  calendarRef.current.getApi().getDate()
                );
              },
            },
            prev: {
              text: "Prev",
              click: function(value) {
                calendarRef.current.getApi().prev();
                fetchAllSchedule(
                  calendarRef.current.getApi().getDate(),
                  calendarRef.current.getApi().getDate()
                );
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
          // locale="en-GB"
          dayHeaders={false}
          allDaySlot={false}
          plugins={[timeGridPlugin, interactionPlugin]}
          initialView="dayGridWeek"
          events={data}
          //   locales={allLocales}
          //   locale="ja"
          // datesSet={(args) => console.log("###datesSet:", args)}
          editable={true}
          eventContent={renderEventContent}
          eventResize={() => {}}
          slotDuration={"00:15:00"}
          slotLabelFormat={{ hour: "numeric", minute: "numeric" }}

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
