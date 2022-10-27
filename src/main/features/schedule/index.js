import {
<<<<<<< HEAD
  ContBody,
  TabbableContainer,
} from '../../sharedComponents/AppComponents/MainFlexContainer';
import './styles/style.css';
import Header from './components/header';
import Calendar from './view/calendar';
import { useSearchParams } from 'react-router-dom';
import MySchedules from './view/schedules/Schedules';
// import ScheduleTopBar from './view/Schedules/topbar/ScheduleTopBar';

function Schedules() {
  // const [param, setParam] = useState("");
  const [searchParams] = useSearchParams();
  // useEffect(() => {
  // 	setParam(searchParams.get("f"));
  // }, [searchParams]);
  let param = searchParams.get('f');
  // console.log("param", param);
  return (
    <TabbableContainer>
      <Header />
      {/* <ScheduleTopBar /> */}
      <ContBody style={{ display: 'block' }}>
        {param === 'cal' ? (
          <Calendar />
        ) : param === 'sc' ? (
          <MySchedules />
        ) : (
          <>div</>
        )}
      </ContBody>
    </TabbableContainer>
  );
=======
	ContBody,
	TabbableContainer,
} from "../../sharedComponents/AppComponents/MainFlexContainer";
import "./styles/style.css";
import Header from "./components/header";
import Calendar from "./view/calendar";
import { useSearchParams } from "react-router-dom";
import MySchedules from "./view/schedules/Schedules";
import { ScheduleTopBar } from "./view/schedules/topbar/ScheduleTopBar";

function Schedules() {
	const [searchParams] = useSearchParams();
	let param = searchParams.get("f");
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
>>>>>>> 5025d3abfff23bd2dc4573158e05e33d856aaf3e
}

export default Schedules;
