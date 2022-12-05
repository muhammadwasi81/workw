import React, { useState } from "react";
import Tab from "../../../../sharedComponents/Tab";
import ScheduleCard from "../../UI/ScheduleCard";
// import Approval from "../../../../sharedComponents/AppComponents/Approvals/view";
// import EventDetail from "../../UI/EventDetail";
import TaskDetail from "../../../task/view/TaskDetail/TaskDetail";
import TravelDetail from "../../../travel/view/TravelDetail/TravelDetail";
import ScheduleComposerDetail from "../Composer/ScheduleComposerDetail";
import { ScheduleTypeEnum } from "../../enum/enum";
function MySchedules() {
	const [scheduleData, setScheduleData] = useState(null);
	const panes = [
		{
			featureName: "Past",
			featureId: 0,
			content: (
				<ScheduleCard
					sheduleType="Past"
					setScheduleData={setScheduleData}
					key="past"
				/>
			),
		},
		{
			featureName: "Today",
			featureId: 1,
			content: (
				<ScheduleCard
					sheduleType="Today"
					setScheduleData={setScheduleData}
					key="today"
				/>
			),
		},
		{
			featureName: "Upcoming",
			featureId: 2,
			content: (
				<ScheduleCard
					sheduleType="Upcoming"
					setScheduleData={setScheduleData}
					key={"upcoming"}
				/>
			),
		},
	];

	return (
		<div className="flex flex-col gap-3 overflow-hidden h-full">
			<div className="flex flex-1 gap-5 h-full">
				<div className="basis-[30%] min-w-[330px] overflow-y-auto">
					<Tab panes={panes} activeKey="1" />
				</div>
				<div className="basis-[70%] flex flex-col gap-[18px] min-h-0">
					<div className="rounded-lg p-2 px-5 bg-[white] font-bold text-black">
						Details
					</div>
					<div className="p-5 bg-white rounded-lg min-h-0 overflow-y-auto">
						{scheduleData !== null ? (
							scheduleData?.type === ScheduleTypeEnum.Travel ? (
								<TravelDetail travelId={scheduleData?.id} />
							) : scheduleData?.type === ScheduleTypeEnum.Task ? (
								<TaskDetail id={scheduleData?.id} />
							) : (
								<>
									<ScheduleComposerDetail
										id={scheduleData?.id}
										shortEvent={false}
									/>
									{/* <div className="eventDetail p-5 bg-white rounded-lg min-h-0 overflow-y-auto">
									<div className="eventDetail__header">
							<p className="eventDetail-title">Details</p>
							<span className="eventNum">SCH-000085</span>
						</div>

									<div className="eventDetail__body">
										<div className="eventDetail__body-event">
											<Event shortDesc={true} />
											<EventDetail />
										</div>
										<div className="eventDetail__body-description">
											<p className="eventDetail-title">
												Description
											</p>
											<span>
												Lorem ipsum dolor sit amet
												consectetur adipisicing elit.
												Sequi eos quaerat iusto,
												expedita ut veritatis alias
												illum quis dignissimos, saepe
												omnis. Autem, exercitationem
												quibusdam! Facere in non nulla
												quis enim?
											</span>
										</div>
										<div className="eventDetail__body-memberUserWrapper">
											<p className="eventDetail-title">
												Hosts
											</p>
											<div className="memberUserCards">
												<div className="memberUserCard">
													<div className="memberUserCard__header">
														<img
															alt=""
															src="//joeschmoe.io/api/v1/random"
														/>
														<div className="memberUserCardStatus"></div>
													</div>
													<div className="memberUserCard__body">
														<p>Syed Bilal</p>
														<span>
															Andriod Developer
														</span>
													</div>
												</div>
											</div>
										</div>
										<div className="eventDetail__body-memberUserWrapper">
											<p className="eventDetail-title">
												Actual Attendess
											</p>
											<div className="memberUserCards">
												<div className="memberUserCard">
													<div className="memberUserCard__header">
														<img
															alt=""
															src="//joeschmoe.io/api/v1/random"
														/>
														<div className="memberUserCardStatus"></div>
													</div>
													<div className="memberUserCard__body">
														<p>Syed Bilal</p>
														<span>
															Andriod Developer
														</span>
													</div>
												</div>
												<div className="memberUserCard">
													<div className="memberUserCard__header">
														<img
															alt=""
															src="//joeschmoe.io/api/v1/random"
														/>
														<div className="memberUserCardStatus"></div>
													</div>
													<div className="memberUserCard__body">
														<p>Syed Bilal</p>
														<span>
															Andriod Developer
														</span>
													</div>
												</div>
												<div className="memberUserCard">
													<div className="memberUserCard__header">
														<img
															alt=""
															src="//joeschmoe.io/api/v1/random"
														/>
														<div className="memberUserCardStatus"></div>
													</div>
													<div className="memberUserCard__body">
														<p>Syed Bilal</p>
														<span>
															Andriod Developer
														</span>
													</div>
												</div>
												<div className="memberUserCard">
													<div className="memberUserCard__header">
														<img
															alt=""
															src="//joeschmoe.io/api/v1/random"
														/>
														<div className="memberUserCardStatus"></div>
													</div>
													<div className="memberUserCard__body">
														<p>Syed Bilal</p>
														<span>
															Andriod Developer
														</span>
													</div>
												</div>
											</div>
										</div>
									</div>

									<Approval
										title={"Confirmed Attendees"}
										// module={ApprovalsModule.ExpenseApproval}
										data={[
											{
												id:
													"3fa85f64-5717-4562-b3fc-2c963f66afa6",
												referenceId:
													"3fa85f64-5717-4562-b3fc-2c963f66afa6",
												approverId:
													"3fa85f64-5717-4562-b3fc-2c963f66afa6",
												approver: {
													id:
														"3fa85f64-5717-4562-b3fc-2c963f66afa6",
													businessId:
														"3fa85f64-5717-4562-b3fc-2c963f66afa6",
													name: "string",
													email: "string",
													image:
														"https://joeschmoe.io/api/v1/random",
													type: 1,
													userTypeId: 1,
													designation: "string",
												},
												createBy:
													"3fa85f64-5717-4562-b3fc-2c963f66afa6",
												approvalType: 0,
												isDefault: true,
												status: 1,
												remarks: [
													{
														id:
															"3fa85f64-5717-4562-b3fc-2c963f66afa6",
														approvalId:
															"3fa85f64-5717-4562-b3fc-2c963f66afa6",
														remark: "string",
														status: 1,
														type: 1,
														createBy:
															"3fa85f64-5717-4562-b3fc-2c963f66afa6",
														remarker: {
															id:
																"3fa85f64-5717-4562-b3fc-2c963f66afa6",
															businessId:
																"3fa85f64-5717-4562-b3fc-2c963f66afa6",
															name: "string",
															email: "string",
															image:
																"https://joeschmoe.io/api/v1/random",
															type: 1,
															userTypeId: 1,
															designation:
																"string",
														},
														remarkBy:
															"3fa85f64-5717-4562-b3fc-2c963f66afa6",
														createDate:
															"2022-08-17T09:26:55.462Z",
													},
												],
											},
											{
												id:
													"3fa85f64-5717-4562-b3fc-2c963f66afa6",
												referenceId:
													"3fa85f64-5717-4562-b3fc-2c963f66afa6",
												approverId:
													"3fa85f64-5717-4562-b3fc-2c963f66afa6",
												approver: {
													id:
														"3fa85f64-5717-4562-b3fc-2c963f66afa6",
													businessId:
														"3fa85f64-5717-4562-b3fc-2c963f66afa6",
													name: "string",
													email: "string",
													image:
														"https://joeschmoe.io/api/v1/random",
													type: 1,
													userTypeId: 1,
													designation: "string",
												},
												createBy:
													"3fa85f64-5717-4562-b3fc-2c963f66afa6",
												approvalType: 0,
												isDefault: true,
												status: 1,
												remarks: [
													{
														id:
															"3fa85f64-5717-4562-b3fc-2c963f66afa6",
														approvalId:
															"3fa85f64-5717-4562-b3fc-2c963f66afa6",
														remark: "string",
														status: 1,
														type: 1,
														createBy:
															"3fa85f64-5717-4562-b3fc-2c963f66afa6",
														remarker: {
															id:
																"3fa85f64-5717-4562-b3fc-2c963f66afa6",
															businessId:
																"3fa85f64-5717-4562-b3fc-2c963f66afa6",
															name: "string",
															email: "string",
															image:
																"https://joeschmoe.io/api/v1/random",
															type: 1,
															userTypeId: 1,
															designation:
																"string",
														},
														remarkBy:
															"3fa85f64-5717-4562-b3fc-2c963f66afa6",
														createDate:
															"2022-08-17T09:26:55.462Z",
													},
												],
											},
											{
												id:
													"3fa85f64-5717-4562-b3fc-2c963f66afa6",
												referenceId:
													"3fa85f64-5717-4562-b3fc-2c963f66afa6",
												approverId:
													"3fa85f64-5717-4562-b3fc-2c963f66afa6",
												approver: {
													id:
														"3fa85f64-5717-4562-b3fc-2c963f66afa6",
													businessId:
														"3fa85f64-5717-4562-b3fc-2c963f66afa6",
													name: "string",
													email: "string",
													image:
														"https://joeschmoe.io/api/v1/random",
													type: 1,
													userTypeId: 1,
													designation: "string",
												},
												createBy:
													"3fa85f64-5717-4562-b3fc-2c963f66afa6",
												approvalType: 0,
												isDefault: true,
												status: 1,
												remarks: [
													{
														id:
															"3fa85f64-5717-4562-b3fc-2c963f66afa6",
														approvalId:
															"3fa85f64-5717-4562-b3fc-2c963f66afa6",
														remark: "string",
														status: 1,
														type: 1,
														createBy:
															"3fa85f64-5717-4562-b3fc-2c963f66afa6",
														remarker: {
															id:
																"3fa85f64-5717-4562-b3fc-2c963f66afa6",
															businessId:
																"3fa85f64-5717-4562-b3fc-2c963f66afa6",
															name: "string",
															email: "string",
															image:
																"https://joeschmoe.io/api/v1/random",
															type: 1,
															userTypeId: 1,
															designation:
																"string",
														},
														remarkBy:
															"3fa85f64-5717-4562-b3fc-2c963f66afa6",
														createDate:
															"2022-08-17T09:26:55.462Z",
													},
												],
											},
											{
												id:
													"3fa85f64-5717-4562-b3fc-2c963f66afa6",
												referenceId:
													"3fa85f64-5717-4562-b3fc-2c963f66afa6",
												approverId:
													"3fa85f64-5717-4562-b3fc-2c963f66afa6",
												approver: {
													id:
														"3fa85f64-5717-4562-b3fc-2c963f66afa6",
													businessId:
														"3fa85f64-5717-4562-b3fc-2c963f66afa6",
													name: "string",
													email: "string",
													image:
														"https://joeschmoe.io/api/v1/random",
													type: 1,
													userTypeId: 1,
													designation: "string",
												},
												createBy:
													"3fa85f64-5717-4562-b3fc-2c963f66afa6",
												approvalType: 0,
												isDefault: true,
												status: 1,
												remarks: [
													{
														id:
															"3fa85f64-5717-4562-b3fc-2c963f66afa6",
														approvalId:
															"3fa85f64-5717-4562-b3fc-2c963f66afa6",
														remark: "string",
														status: 1,
														type: 1,
														createBy:
															"3fa85f64-5717-4562-b3fc-2c963f66afa6",
														remarker: {
															id:
																"3fa85f64-5717-4562-b3fc-2c963f66afa6",
															businessId:
																"3fa85f64-5717-4562-b3fc-2c963f66afa6",
															name: "string",
															email: "string",
															image:
																"https://joeschmoe.io/api/v1/random",
															type: 1,
															userTypeId: 1,
															designation:
																"string",
														},
														remarkBy:
															"3fa85f64-5717-4562-b3fc-2c963f66afa6",
														createDate:
															"2022-08-17T09:26:55.462Z",
													},
												],
											},
											{
												id:
													"3fa85f64-5717-4562-b3fc-2c963f66afa6",
												referenceId:
													"3fa85f64-5717-4562-b3fc-2c963f66afa6",
												approverId:
													"3fa85f64-5717-4562-b3fc-2c963f66afa6",
												approver: {
													id:
														"3fa85f64-5717-4562-b3fc-2c963f66afa6",
													businessId:
														"3fa85f64-5717-4562-b3fc-2c963f66afa6",
													name: "string",
													email: "string",
													image:
														"https://joeschmoe.io/api/v1/random",
													type: 1,
													userTypeId: 1,
													designation: "string",
												},
												createBy:
													"3fa85f64-5717-4562-b3fc-2c963f66afa6",
												approvalType: 0,
												isDefault: true,
												status: 1,
												remarks: [
													{
														id:
															"3fa85f64-5717-4562-b3fc-2c963f66afa6",
														approvalId:
															"3fa85f64-5717-4562-b3fc-2c963f66afa6",
														remark: "string",
														status: 1,
														type: 1,
														createBy:
															"3fa85f64-5717-4562-b3fc-2c963f66afa6",
														remarker: {
															id:
																"3fa85f64-5717-4562-b3fc-2c963f66afa6",
															businessId:
																"3fa85f64-5717-4562-b3fc-2c963f66afa6",
															name: "string",
															email: "string",
															image:
																"https://joeschmoe.io/api/v1/random",
															type: 1,
															userTypeId: 1,
															designation:
																"string",
														},
														remarkBy:
															"3fa85f64-5717-4562-b3fc-2c963f66afa6",
														createDate:
															"2022-08-17T09:26:55.462Z",
													},
												],
											},
										]}
										onStatusChanged={status => {}}
										status={""}
									/>
								</div> */}
								</>
							)
						) : null}
					</div>
				</div>
			</div>
		</div>
	);
}

export default MySchedules;
