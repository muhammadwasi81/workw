import {
  ContBody,
  TabbableContainer,
} from "../../sharedComponents/AppComponents/MainFlexContainer";
import "./styles/style.css";
import Header from "./components/header";
import Calendar from "./view/calendar";
import { useSearchParams } from "react-router-dom";
<<<<<<< HEAD
import MySchedules from "./view/schedules/Schedules";
import { ScheduleTopBar } from "./view/schedules/topbar/ScheduleTopBar";
import { useSelector, useDispatch } from "react-redux";
import { Button, Drawer } from "antd";

import MySchedules from "./view/ScheduleDetail/SchedulesDetail";
import { ScheduleTopBar } from "./view/ScheduleDetail/topbar/ScheduleTopBar";


function Schedules() {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  let param = searchParams.get("f");
  const { drawerOpen } = useSelector((state) => state.scheduleSlice);

  return (
    <TabbableContainer>
      <Header />
      <ScheduleTopBar />
      <ContBody style={{ display: "block" }}>
        {param === "cal" ? (
          <Calendar />
        ) : param === "sc" ? (
          <MySchedules />
        ) : (
          <>div</>
        )}
      </ContBody>
    </TabbableContainer>
  );
}

export default Schedules;
