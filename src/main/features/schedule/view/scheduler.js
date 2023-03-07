import { useRef, useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "../styles/style.css";
import "../styles/calender.css";
// import Event from "./event";
import { Calendar } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { toggleEventDetailComposer } from "../store/slice";
import EventDetail from "./eventDetail";
import moment from "moment";
import { getAllSchedule } from "../store/action";

function Scheduler({ feed = false, referenceId }) {
  const [calenderView, setCalendarView] = useState("");
  const [todayDate, setTodayDate] = useState(new Date());
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const schedules = useSelector((state) => state.scheduleSlice.schedules);
  console.log(schedules, "scheduless");
  const calendarRef = useRef();
  let isPanelChange = false;
  const dispatch = useDispatch();
  // const renderEventContent = eventInfo => {
  // 	return <Event eventInfo={eventInfo} />;
  // };
  useEffect(() => {
    fetchAllSchedule(todayDate, todayDate);
  }, []);

  const fetchAllSchedule = (startVal, endVal) => {
    const startDate = moment(startVal)
      .startOf("month")
      .format();
    const endDate = moment(endVal)
      .endOf("month")
      .format();

    dispatch(
      getAllSchedule({
        pageNo: 1,
        pageSize: 20,
        search: "",
        sortBy: 1,
        referenceId: referenceId,
        referenceType: 0,
        startDate,
        endDate,
      })
    );
  };

  const handleDateChange = (date) => {
    if (!moment(date).isSame(moment(todayDate), "month")) {
      setTodayDate(new Date(calendarRef.current.getApi().getDate()));
      fetchAllSchedule(
        calendarRef.current.getApi().getDate(),
        calendarRef.current.getApi().getDate()
      );
    }
  };

  const onChange = (value) => {
    console.log(value, "sss");
    const date = value.format("YYYY-MM-DD");
    handleDateChange(date);
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
      date: new Date(sch.startDate), //this will only show the start date and upon clicking the schedule it will open detail of that event
      // end: new Date(sch.endDate), //commented by humayoun
      title: sch.subject,
    };
  });

  const onSelectFunc = (d) => {
    console.log(d, "ssss");
    //TODO: Here we will open composer according to the date
  };

  return (
    <>
      <EventDetail />
      <div className={`schedulerCalender ${calenderView}`}>
        <FullCalendar
          ref={calendarRef}
          selectable={true}
          select={onSelectFunc}
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
                const date = moment(
                  calendarRef.current.getApi().getDate()
                ).format("YYYY-MM-DD");
                handleDateChange(date);
              },
            },
            prev: {
              text: "Prev",
              click: function(value) {
                calendarRef.current.getApi().prev();
                const date = moment(
                  calendarRef.current.getApi().getDate()
                ).format("YYYY-MM-DD");
                handleDateChange(date);
              },
            },
          }}
          headerToolbar={
            feed
              ? { start: "title myCustomButton" }
              : {
                  left: "timeGridDay prev next today",
                  center: "title,myCustomButton",
                  right: "timeGridWeek dayGridMonth",
                }
          }
          eventClick={(info) => {
            // console.log("info", info.event._def);
            // setSchedule({
            // 	id: info.event._def.publicId,
            // 	scheduleType:
            // 		info.event._def.extendedProps.scheduleType,
            // });
            // setId(parseInt(info.event._def.publicId));
            dispatch(
              toggleEventDetailComposer({
                id: info.event._def.publicId,
                scheduleType: info.event._def.extendedProps.scheduleType,
              })
            );
          }}
          datesSet={(val) => {
            if (val.view.type !== "timeGridDay") {
              setCalendarView(val.view.type);
            } else {
              setCalendarView("");
            }
          }}
          // nowIndicator={true}
          // eventMaxStack={3}
          dayHeaders={true}
          allDaySlot={true}
          allDayText={"All Day"}
          // allDaySlot={true}
          // allDay={true}
          dayMaxEventRows={true}
          editable={true}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView={!feed ? "timeGridWeek" : "timeGridDay"}
          events={
            data
            // "https://fullcalendar.io/api/demo-feeds/events.json"
          }
          eventResize={() => {}}
          onSelect={(e) => onSelectFunc(e)}
          slotDuration={"00:15:00"}
          slotLabelFormat={{ hour: "numeric", minute: "numeric" }}
          views={{
            // allDaySlot: true,
            month: {
              // allDaySlot: true,
              type: "dayGridMonth",
              buttonText: "Month",
              dayMaxEventRows: 2,
            },
            week: {
              // allDaySlot: true,
              type: "dayGridWeek",
              duration: { days: 7 },
              buttonText: "Week",
              eventMaxStack: 2,
            },
            day: {
              // allDaySlot: true,
              type: "timeGrid",
              duration: { days: 1 },
              buttonText: "Day",
              eventMaxStack: 3,
            },
            // schedules: {
            // 	allDaySlot: true,
            // 	allDay: true,
            // },

            // listMonth: {
            // 	buttonText: "List",
            // },
          }}
          // locale="en-GB"
          // eventContent={renderEventContent}
          //   locales={allLocales}
          //   locale="ja"
          // datesSet={(args) => console.log("###datesSet:", args)}
          // dateClick={onSelectFunc}
        />
        <div className="flex justify-center">
          <div
            className={isCalendarOpen ? "site-calendar open" : "site-calendar "}
          >
            <Calendar
              fullscreen={false}
              onChange={onChange}
              onPanelChange={() => {
                isPanelChange = true;
              }}
              onSelect={onSelectFunc}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Scheduler;
