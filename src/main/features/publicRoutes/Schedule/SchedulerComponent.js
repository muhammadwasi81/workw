import { useRef, useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "./style/calenderComponent.css";
import "./style/style.css";
// import Event from "./event";
import { Calendar } from "antd";
import EventDetail from "../../schedule/view/eventDetail";
import moment from "moment";
import SideDrawer from "../../../sharedComponents/Drawer/SideDrawer";
import "../../../sharedComponents/Drawer/sideDrawer.css";
import CreateAppointment from "./CreateAppointment";
import { message } from "antd";

function SchedulersComponent({ feed = false, referenceId }) {
  const [calenderView, setCalendarView] = useState("");
  const [todayDate, setTodayDate] = useState(new Date());
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedStartTime, setSelectedStartTime] = useState(null);
  const [selectedEndTime, setSelectedEndTime] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const calendarRef = useRef();
  let isPanelChange = false;
  console.log(selectedStartTime, "selectedStartTime");
  console.log(selectedEndTime, "selectedEndTime");
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

    console.log(startDate, "startDate");
    console.log(endDate, "endDate");
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

  function handleSelect(info) {
    setSelectedStartTime(info.startStr.slice(0, 16).replace("T", " "));
    console.log(selectedStartTime, "sestime");
    setSelectedEndTime(info.end);
    setShowModal(true);
  }

  const durationInMinutes =
    selectedStartTime && selectedEndTime
      ? moment
          .duration(moment(selectedEndTime).diff(moment(selectedStartTime)))
          .asMinutes()
      : null;

  return (
    <>
      <EventDetail />
      <div className={`schedulerCalender ${calenderView}`}>
        <FullCalendar
          select={handleSelect}
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
                  left: "today",
                  center: "title,myCustomButton",
                  right: "prev next",
                }
          }
          eventClick={(info) => {}}
          datesSet={(val) => {
            console.log(val, "val");
            if (val.view.type !== "timeGridDay") {
              setCalendarView(val.view.type);
            } else {
              setCalendarView("");
            }
          }}
          selectable={true}
          dayHeaders={true}
          allDaySlot={true}
          allDayText={"All Day"}
          dayMaxEventRows={true}
          editable={true}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView={!feed ? "timeGridDay" : "timeGridDay"}
          eventResize={() => {}}
          slotDuration={"00:15:00"}
          slotLabelFormat={{ hour: "numeric", minute: "numeric" }}
          views={{
            day: {
              type: "timeGrid",
              duration: { days: 1 },
              buttonText: "Day",
              eventMaxStack: 3,
            },
          }}
        />
        {durationInMinutes <= 60 ? (
          <SideDrawer
            title={"Book Appointment"}
            isOpen={showModal}
            handleOpen={true}
            handleClose={() => {
              setShowModal(false);
            }}
          >
            <div className="drawer">
              <div className="drawer-title"></div>
              <div className="drawer-body">
                <CreateAppointment
                  selectedEndTime={selectedEndTime}
                  selectedStartTime={selectedStartTime}
                  durationInMinutes={durationInMinutes}
                />
              </div>
            </div>
          </SideDrawer>
        ) : (
          message.warning("Please Select The 60 Min Or Less")
        )}

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
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default SchedulersComponent;
