import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ScheduleMemberType } from "../../enum/enum";
import {
	getScheduleById,
	updateMemberScheduleStatus,
	updateScheduleMemberType,
} from "../../store/action";
import EventDetail from "../../UI/EventDetail";
import Event from "../event";

import ScheduleMembersList from "../Composer/ScheduleMembersList";
import ScheduleDetailSkeleton from "./ScheduleDetailSkeleton";
import { EditOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import CreateSchedule from "../createSchedule";
import UpdateSchedule from "./UpdateSchedule";

function ScheduleComposerDetail({ id, shortEvent = true }) {
	const eventDetail = useSelector(state => state.scheduleSlice.eventDetail);
	const loading = useSelector(state => state.scheduleSlice.loading);
	const loggedInUserId = useSelector(state => state.userSlice.user.id);
	const [isActionEnabled, setIsActionEnabled] = useState(false);
	const [editSchedule, setEditSchedule] = useState(false);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getScheduleById(id));
	}, [id]);

	useEffect(() => {
		if (eventDetail && Object.keys(eventDetail).length > 0) {
			for (let index = 0; index < eventDetail.members.length; index++) {
				// const element = array[index];
				if (
					eventDetail.members[index].memberType ===
						ScheduleMemberType.Admin &&
					loggedInUserId === eventDetail.members[index].memberId
				) {
					setIsActionEnabled(true);
				}
			}
		}
	}, [eventDetail]);

	// console.log("eventDetail", eventDetail);
	// console.log("isActionEnabled", isActionEnabled);

	const handleMemberStatusChange = (id, status) => {
		dispatch(
			updateMemberScheduleStatus({
				id,
				status,
			})
		);
	};
	const handleMemberTypeStatusChange = (id, type) => {
		dispatch(
			updateScheduleMemberType({
				id,
				type,
			})
		);
	};
	const handleEditSchedule = () => {
		setEditSchedule(!editSchedule);
	};
	return (
		<>
			{loading ? (
				<ScheduleDetailSkeleton />
			) : (
				<div className={`eventDetail ${!shortEvent && ""}`}>
					{shortEvent && (
						<div className="eventDetail__header">
							<p className="eventDetail-title">Details</p>
							{/* <span className="eventNum">SCH-000085</span> */}
							<Button
								className="ThemeBtn"
								onClick={handleEditSchedule}
							>
								Update
							</Button>
							{/* <Tooltip title="Edit Schedule">
										<EditOutlined
											className="!text-primary-color cursor-pointer"
											onClick={() => {
												setEditSchedule(true);
											}}
										/>
									</Tooltip> */}
						</div>
					)}
					<div className="eventDetail__body">
						<div className="eventDetail__body-event">
							{shortEvent ? (
								<Event shortDesc={true} data={eventDetail} />
							) : (
								<EventDetail data={eventDetail} />
							)}
						</div>
						{!shortEvent && (
							<div className="eventDetail__body-description">
								<p className="eventDetail-title">Description</p>
								<span>{eventDetail?.description}</span>
							</div>
						)}
					</div>
					<div>Members</div>
					{eventDetail?.members?.map(member => (
						<ScheduleMembersList
							status={member.statusEnum}
							id={member.id}
							data={member?.member}
							memberType={member.memberType}
							isActionEnabled={isActionEnabled}
							handleMemberStatusChange={handleMemberStatusChange}
							handleMemberTypeStatusChange={
								handleMemberTypeStatusChange
							}
						/>
					))}
				</div>
			)}
			<UpdateSchedule
				eventDetail={eventDetail}
				handleEditSchedule={handleEditSchedule}
				isOpen={editSchedule}
			/>
		</>
	);
}

export default ScheduleComposerDetail;
