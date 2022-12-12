import React from "react";
import { Drawer } from "antd";
import CreateSchedule from "../createSchedule";

function UpdateSchedule({ eventDetail, handleEditSchedule, isOpen }) {
	return (
		<>
			<Drawer
				title="Update Schedule"
				placement="right"
				onClose={handleEditSchedule}
				open={isOpen}
				width="768px"
			>
				<CreateSchedule scheduleDetail={eventDetail} />
			</Drawer>
		</>
	);
}

export default UpdateSchedule;
