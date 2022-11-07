import React from "react";
import Tab from "../../../../sharedComponents/Tab";
import ScheduleCard from "../../UI/ScheduleCard";
import Approval from "../../../../sharedComponents/AppComponents/Approvals/view";
import EventDetail from "../../UI/EventDetail";

function MySchedules() {
	const panes = [
		{
			featureName: "Past",
			featureId: 0,
			content: <ScheduleCard />,
		},
		{
			featureName: "Today",
			featureId: 1,
			content: <ScheduleCard />,
		},
		{
			featureName: "Upcoming",
			featureId: 2,
			content: <ScheduleCard />,
		},
	];
	return (
		<div className="flex flex-col gap-3 overflow-hidden h-full">
			<div className="flex flex-1 gap-5 h-full">
				<div className="basis-[30%] min-w-[330px] overflow-y-auto">
					<Tab panes={panes} />
				</div>
				<div className="basis-[70%] flex flex-col gap-[18px] min-h-0">
					<div className="rounded-lg p-2 px-5 bg-[white] font-bold text-black">
						Details
					</div>
					<div className="eventDetail p-5 bg-white rounded-lg min-h-0 overflow-y-auto">
						{/* <div className="eventDetail__header">
							<p className="eventDetail-title">Details</p>
							<span className="eventNum">SCH-000085</span>
						</div> */}

						<div className="eventDetail__body">
							<div className="eventDetail__body-event">
								{/* <Event shortDesc={true} /> */}
								<EventDetail />
							</div>
							<div className="eventDetail__body-description">
								<p className="eventDetail-title">Description</p>
								<span>
									Lorem ipsum dolor sit amet consectetur
									adipisicing elit. Sequi eos quaerat iusto,
									expedita ut veritatis alias illum quis
									dignissimos, saepe omnis. Autem,
									exercitationem quibusdam! Facere in non
									nulla quis enim?
								</span>
							</div>
							<div className="eventDetail__body-memberUserWrapper">
								<p className="eventDetail-title">Hosts</p>
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
											<span>Andriod Developer</span>
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
											<span>Andriod Developer</span>
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
											<span>Andriod Developer</span>
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
											<span>Andriod Developer</span>
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
											<span>Andriod Developer</span>
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
									id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
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
												designation: "string",
											},
											remarkBy:
												"3fa85f64-5717-4562-b3fc-2c963f66afa6",
											createDate:
												"2022-08-17T09:26:55.462Z",
										},
									],
								},
								{
									id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
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
												designation: "string",
											},
											remarkBy:
												"3fa85f64-5717-4562-b3fc-2c963f66afa6",
											createDate:
												"2022-08-17T09:26:55.462Z",
										},
									],
								},
								{
									id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
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
												designation: "string",
											},
											remarkBy:
												"3fa85f64-5717-4562-b3fc-2c963f66afa6",
											createDate:
												"2022-08-17T09:26:55.462Z",
										},
									],
								},
								{
									id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
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
												designation: "string",
											},
											remarkBy:
												"3fa85f64-5717-4562-b3fc-2c963f66afa6",
											createDate:
												"2022-08-17T09:26:55.462Z",
										},
									],
								},
								{
									id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
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
												designation: "string",
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
					</div>
					{/* <div className="rounded-lg p-2 px-3 bg-[white] font-bold text-black">
						Details
					</div>
					<div className="p-2 px-3 bg-[white] rounded-lg flex flex-col gap-3">
						<div className="rounded-md p-3 bg-primary-color">
							<div className="p-3 flex flex-1 items-center gap-3 bg-[#F4F4F4] rounded-lg border border-[#757d86] cursor-pointer hover:border-[#6d757e] hover:shadow-lg transition">
								<div className="flex flex-col w-[100px] border-r-2 border-[#d9d9d9] px-1">
									<h3 className="text-lg font-semibold">
										DEC 25
									</h3>
									<p className="!m-0 text-xs text-[#757d86]">
										SAT 6:55 PM
									</p>
								</div>

								<div className="flex justify-between flex-1 items-center">
									<div className="flex flex-col">
										<h3 className="text-base font-semibold">
											Crismistmas, Quid Day
										</h3>
										<div className="flex gap-2 items-center text-[#757d86]">
											<p className="!m-0 text-xs">
												Thu, Jul 14, 2022 6:55 PM
											</p>
											<BsArrowRight />
											<p className="!m-0 text-xs ">
												Thu, Jul 14, 2022 7:00 PM
											</p>
										</div>
									</div>
									<div className="p-2 border rounded-lg border-[#757d86]">
										Minutes of Meetings
									</div>
								</div>
							</div>
						</div>
						<div>
							<p>Description</p>
							<p>
								Lorem ipsum dolor sit amet consectetur
								adipisicing elit. Et autem adipisci mollitia
								nemo velit voluptates qui distinctio voluptatum
								dolore fugit. Exercitationem, explicabo dolores
								consectetur sequi unde libero natus quo
								provident? Illum saepe repellendus facilis dicta
								minus praesentium quidem quis ad? Recusandae
								reiciendis itaque aliquid saepe error! Eveniet a
								quam, reprehenderit similique magni voluptates
								excepturi, incidunt molestias, commodi est
								impedit quas! Ratione odit similique quisquam
								facere delectus minus ad quos voluptatem beatae
								omnis, ipsa, quis vero consequuntur aut quam vel
								cupiditate sapiente. Sed nulla tempora
								explicabo, adipisci dolore saepe nam iure!
							</p>
						</div>
					</div> */}
				</div>
			</div>
		</div>
	);
}

export default MySchedules;
