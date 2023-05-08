import React, { useState } from "react";
import EventWrapper from "./eventWrapper";
import Scheduler from "./scheduler";
import { Calendar as AntCalendar, Badge, Avatar } from "antd";
import "../styles/calender.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCurrentSchedule,
  getAllEventSchedule,
  getAllUpcomingSchedule,
  getCalendar,
} from "../store/action";
import { defaultUiid } from "../../../../utils/Shared/enums/enums";
import { useEffect } from "react";
import moment from "moment";
import MemberSelect from "../../../sharedComponents/AntdCustomSelects/SharedSelects/MemberSelect";
import { getNameForImage } from "../../../../utils/base";
import { getAllEmployees } from "../../../../utils/Shared/store/actions";

function Calendar({ referenceId }) {
  const dispatch = useDispatch();
  const [isFirstTimeDataLoaded, setIsFirstTimeDataLoaded] = useState(false);
  const [employeesData, setEmployeesData] = useState([]);
  const [firstTimeEmpData, setFirstTimeEmpData] = useState([]);
  const [defaultData, setDefaultData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [stateValWithColor, setStateValWithColor] = useState([]);
  const eventSchedules = useSelector(
    (state) => state.scheduleSlice.eventSchedules
  );
  console.log("eventSchedules", eventSchedules);
  const currentSchedules = useSelector(
    (state) => state.scheduleSlice.currentSchedules
  );
  const upcomingSchedules = useSelector(
    (state) => state.scheduleSlice.upcomingSchedules
  );

  const { scheduleSearch } = useSelector((state) => state.scheduleSlice);

  const {
    sharedSlice: { employees },
  } = useSelector((state) => state);

  const loading = useSelector((state) => state.scheduleSlice.loading);
  const userId = useSelector((state) => state.userSlice.user.id);

  useEffect(() => {
    fetchAllEventSchedule(new Date(), new Date());
  }, []);

  useEffect(() => {
    if (employees.length > 0 && !isFirstTimeDataLoaded) {
      setIsFirstTimeDataLoaded(true);
      setFirstTimeEmpData(employees);
    }
  }, [employees]);

  const fetchEmployees = (text, pgNo) => {
    dispatch(getAllEmployees({ text, pgNo, pgSize: 20 }));
  };

  const fetchAllEventSchedule = (startVal, endVal) => {
    const startDate = moment(startVal)
      .startOf("month")
      .format();
    const endDate = moment(endVal)
      .endOf("month")
      .format();

    dispatch(
      getAllEventSchedule({
        pageNo: 1,
        pageSize: 20,
        search: "",
        sortBy: 1,
        referenceId: referenceId,
        referenceType: 0,
        startDate,
        endDate,
        search: scheduleSearch,
        users: userData,
      })
    );
  };

  useEffect(() => {
    fetchCurrentDateScedules(new Date());
    fetchUpcomingScedules(new Date());
    fetchEmployees("", 0);
  }, []);

  useEffect(() => {
    fetchCurrentDateScedules(new Date());
    fetchUpcomingScedules(new Date());
  }, [scheduleSearch, userData]);

  const fetchCurrentDateScedules = (value) => {
    const startDate = moment(value)
      .startOf("day")
      .utc()
      .format();
    const endDate = moment(value)
      .endOf("day")
      .utc()
      .format();

    dispatch(
      getAllCurrentSchedule({
        pageNo: 1,
        pageSize: 20,
        search: "",
        sortBy: 1,
        referenceId: referenceId,
        referenceType: 0,
        startDate,
        endDate,
        search: scheduleSearch,
        users: userData,
      })
    );
  };

  const fetchUpcomingScedules = (value) => {
    const startDate = moment(value)
      .add(1, "days")
      .format();
    const endDate = moment(value)
      .add(8, "days")
      .format();

    dispatch(
      getAllUpcomingSchedule({
        pageNo: 1,
        pageSize: 20,
        search: scheduleSearch,
        sortBy: 1,
        referenceId: referenceId,
        referenceType: 0,
        startDate,
        endDate,
        users: userData,
      })
    );
  };

  const dateCellRender = (value) => {
    return (
      <ul className="schedule_badge">
        {eventSchedules.map((item) => {
          const startDate = moment(item.startDate).format("YYYY-MM-DD");
          const endDate = moment(item.endDate).format("YYYY-MM-DD");
          const compareDate = moment(value).format("YYYY-MM-DD");

          if (
            moment(compareDate).isBetween(startDate, endDate) ||
            moment(compareDate).isSame(startDate) ||
            moment(compareDate).isSame(endDate)
          ) {
            return (
              <li key={item.id}>
                <Badge status={"error"} />
              </li>
            );
          }
        })}
      </ul>
    );
  };
  const selectedMemebrHandler = (id, obj) => {
    console.log(obj, "obj in handlerrr");
    const startDate = moment()
      .startOf("month")
      .format();
    const endDate = moment()
      .endOf("month")
      .format();

    dispatch(
      getCalendar({
        pageNo: 1,
        pageSize: 20,
        search: scheduleSearch,
        sortBy: 1,
        referenceId: referenceId,
        referenceType: 0,
        startDate,
        endDate,
        users: [userId, ...id],
      })
    );
  };
  const memberColor = (data) => {
    setStateValWithColor(data);
  };
  return (
    <div className="calender">
      <div className="left">
        <Scheduler referenceId={referenceId} ColorArray={stateValWithColor} />
      </div>
      <div className="right">
        <AntCalendar
          fullscreen={false}
          dateCellRender={dateCellRender}
          className="schedule_calendar"
          onChange={(val) => {
            fetchCurrentDateScedules(val);
          }}
        />
        <div className="events eventWrapper">
          <MemberSelect
            name="managerId"
            mode="multiple"
            formItem={false}
            isObject={true}
            data={firstTimeEmpData}
            onChange={(emp) => {
              console.log(emp, "empp");
              // if (Array.isArray(emp)) {
              //   setUserData(emp);
              // } else {
              //   setUserData([emp]);
              // }
            }}
            defaultData={employeesData}
            onData={memberColor}
            // valueWithColors
            canFetchNow={isFirstTimeDataLoaded}
            fetchData={fetchEmployees}
            placeholder={"Select"}
            selectedData={(_, obj) => {
              // setEmployeesData([...obj]);
              selectedMemebrHandler(_, obj);
            }}
            optionComponent={(opt) => {
              return (
                <>
                  <Avatar src={opt.image} className="!bg-black">
                    {getNameForImage(opt.name)}
                  </Avatar>
                  {opt.name}
                </>
              );
            }}
            returnEmpty={true}
          />
        </div>

        <div className="events">
          <EventWrapper
            data={currentSchedules}
            loading={loading}
            heading={"Today Events"}
          />
        </div>
        <div className="events">
          <EventWrapper
            loading={loading}
            data={upcomingSchedules}
            heading={"Upcoming Events"}
          />
        </div>
      </div>
    </div>
  );
}

export default Calendar;
