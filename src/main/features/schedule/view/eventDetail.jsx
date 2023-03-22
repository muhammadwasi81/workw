import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { ExpenseDictionary } from "../../expense/localization";
import TaskDetailDrawer from "../../task/view/TaskDetail/TaskComposer";
import { toggleEventDetailComposer } from "../store/slice";

import ScheduleComposer from "./Composer/ScheduleComposer";

function EventDetail() {
	const dispatch = useDispatch();
	const { userLanguage } = useContext(LanguageChangeContext);
	const { Direction } = ExpenseDictionary[userLanguage];
	const { eventDetailComposer, scheduleComposerData: sched } = useSelector(
		state => state.scheduleSlice
	);
	return (
		<>
			<ScheduleComposer
				Direction={Direction}
				visible={eventDetailComposer}
				onClose={() => dispatch(toggleEventDetailComposer(sched))}
				id={sched?.id}
				type={sched?.scheduleType}
			/>
			
		</>
	);
}

export default EventDetail;
