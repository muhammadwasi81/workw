import { useRef, useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "../styles/style.css";
import "../styles/calender.css";
// import Event from "./event";
import { Calendar, Drawer } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { toggleEventDetailComposer } from "../store/slice";
import EventDetail from "./eventDetail";
import moment from "moment";
import { getAllSchedule, getCalendar } from "../store/action";
import CreateSchedule from "./createSchedule";
import { getRandomColor } from "../UI/randomColors";

function Scheduler({ feed = false, referenceId, ColorArray }) {
  console.log(ColorArray, "colorArray");
  const [calenderView, setCalendarView] = useState("");
  const [todayDate, setTodayDate] = useState(new Date());
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const schedules = useSelector((state) => state.scheduleSlice.schedules);
  const success = useSelector((state) => state.scheduleSlice.success);
  const [composerDate, setComposerDate] = useState("");

  const calendarRef = useRef();
  const { scheduleSearch } = useSelector((state) => state.scheduleSlice);
  const { calendar } = useSelector((state) => state.scheduleSlice);
  const [events, setEvents] = useState([]);
  let isPanelChange = false;
  const dispatch = useDispatch();
  // const renderEventContent = eventInfo => {
  // 	return <Event eventInfo={eventInfo} />;
  // };
  useEffect(() => {
    fetchAllSchedule(todayDate, todayDate);
  }, [scheduleSearch]);

  useEffect(() => {
    if (success) {
      //Drawer close on success
      setShowDrawer(false);
    }
  }, [success]);

  const fetchAllSchedule = (startVal, endVal) => {
    const startDate = moment(startVal)
      .startOf("month")
      .format();
    const endDate = moment(endVal)
      .endOf("month")
      .format();

    dispatch(
      getCalendar({
        // pageNo: 1,
        // pageSize: 20,
        search: scheduleSearch,
        sortBy: 1,
        referenceId: referenceId,
        // filterType: 1,
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
  let keys = Object.keys(calendar);
  let eventsData = [];
  for (const key of keys) {
    eventsData.push(...calendar[key]);
  }

  let data = [...eventsData]?.map((sch) => {
    return {
      ...sch,
      date: new Date(sch.startDate), //this will only show the start date and upon clicking the schedule it will open detail of that event
      end: new Date(sch.endDate),
      title: sch.subject,

      backgroundColor: sch.members.map((member) => {
        const color = ColorArray?.find((c) => c.id === member.memberId)?.color;
        return color ? color : "var(--currentThemeColor)";
      }),
    };
  });
  console.log(data, "dataaaa");
  const onSelectFunc = (d) => {
    //TODO: Here we will open composer according to the date
    setShowDrawer(true);

    if (
      moment(d.startStr).format("YYYY-MM-DD hh:mm:ss") >=
      moment().format("YYYY-MM-DD hh:mm:ss")
    ) {
      setComposerDate(d.startStr);
    }
  };

  const onClickDateFunc = (d) => {
    setShowDrawer(true);

    setComposerDate(d.date);
  };
  const eventDropHandler = (info) => {
    console.log(info.event, "infoo eventt");
    // const { id } = info.event._def.publicId;
    // console.log(id, "iddd");
    const { start, end, title, id, description } = info.event;
    console.log(start, end, title, id, "info eventtt");
    // Here you can make an API call to update the event's information on the server
    // by sending the updated `start`, `end`, and `title` fields along with the `id`.
    // dispatch(
    //   updateSchedule({
    //     subject: title,
    //     description: description,
    //     startDate: start,
    //     endDate: end,
    //     id: id,
    //   })
    // );
    console.log(
      `Event ${id} was dropped at ${start} with new end time ${end} and new title ${title}`
    );
  };
  return (
    <>
      <Drawer
        title={
          <h1
            style={{
              fontSize: "20px",
              margin: 0,
              // textAlign: Direction === "ltr" ? "" : "end",
            }}
          >
            {"Create Schedule"}
          </h1>
        }
        // placement={Direction === "rtl" ? "left" : "right"}
        width="768"
        onClose={() => {
          setShowDrawer(false);
          setComposerDate("");
        }}
        visible={showDrawer}
        destroyOnClose={true}
        className="detailedViewComposer drawerSecondary"
      >
        <CreateSchedule date={composerDate} />
      </Drawer>

      <EventDetail />
      <div className={`schedulerCalender ${calenderView}`}>
        <FullCalendar
          // timeZone="local"
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
                  left: "prev next today",
                  center: "title,myCustomButton",
                  right: "timeGridDay timeGridWeek dayGridMonth",
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
          nowIndicator={true}
          nowIndicatorPlacement="top"
          nowIndicatorDisplay="block"
          // now={() => new Date()}
          scrollTime={moment()
            .subtract(50, "minutes")
            .format("HH:mm:ss")}
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
          eventDrop={(info) => eventDropHandler(info)}
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
          dateClick={(e) => onClickDateFunc(e)}
          slotEventOverlap={true}
          eventOverlap={true}
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
