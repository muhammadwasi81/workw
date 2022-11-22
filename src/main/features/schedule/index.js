import {
	ContBody,
	TabbableContainer,
} from "../../sharedComponents/AppComponents/MainFlexContainer";
import "./styles/style.css";
import Header from "./components/header";
import Calendar from "./view/calendar";
import { useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// import { Button, Drawer } from "antd";
// import { ScheduleTopBar } from "./view/ScheduleDetail/topbar/ScheduleTopBar";

import MySchedules from "./view/ScheduleDetail/SchedulesDetail";

function Schedules() {
	const [searchParams] = useSearchParams();
	const dispatch = useDispatch();
	let param = searchParams.get("f");
	const { drawerOpen } = useSelector(state => state.scheduleSlice);

	return (
		<TabbableContainer>
			<Header />
			{/* <ScheduleTopBar /> */}
			<ContBody style={{ display: "block" }}>
				{param === "cal" ? (
					<Calendar />
				) : param === "sc" ? (
					<MySchedules />
				) : (
					<></>
				)}
			</ContBody>
		</TabbableContainer>
	);
}

export default Schedules;
