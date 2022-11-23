import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { ExpenseDictionary } from "../../expense/localization";
import TaskDetail from "../../task/view/TaskDetail/TaskDetail";
import { ScheduleTypeEnum } from "../enum/enum";
// import { getScheduleById } from "../store/action";
import { toggleEventDetailComposer } from "../store/slice";

import ScheduleComposer from "./Composer/ScheduleComposer";

function EventDetail() {
	const dispatch = useDispatch();
	const { userLanguage } = useContext(LanguageChangeContext);
	const {  Direction } = ExpenseDictionary[
		userLanguage
	];
	const { eventDetailComposer, scheduleComposerData: sched } = useSelector(
		state => state.scheduleSlice
	);
	// const { labels } = ExpenseDictionaryList;
	// useEffect(() => {
	// 	if (id) {
	// 		dispatch(getScheduleById(id));
	// 	}
	// }, [id]);
	// console.log('scheduleSlice',sched);
	return (
		<>
			{sched?.scheduleType === 5 && sched?.id ? (
				<TaskDetail
					visible={eventDetailComposer}
					onClose={() => dispatch(toggleEventDetailComposer(sched))}
					id={sched?.id}
				/>
			) : (
				<ScheduleComposer
					Direction={Direction}
					visible={eventDetailComposer}
					onClose={() => dispatch(toggleEventDetailComposer(sched))}
					id={sched?.id}
					type={sched?.scheduleType}
				/>
			)}
		</>
	);
}

export default EventDetail;
