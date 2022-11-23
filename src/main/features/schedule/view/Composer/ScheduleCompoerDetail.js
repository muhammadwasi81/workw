import React from "react";
import { useSelector } from "react-redux";
import Approval from "../../../../sharedComponents/AppComponents/Approvals/view";
import Event from "../event";
function ScheduleCompoerDetail() {
	const eventDetail = useSelector(state => state.scheduleSlice.eventDetail);
	// console.log("eventDetail", eventDetail);
	return (
		<div className="eventDetail">
			<div className="eventDetail__header">
				<p className="eventDetail-title">Details</p>
				<span className="eventNum">SCH-000085</span>
			</div>
			<div className="eventDetail__body">
				<div className="eventDetail__body-event">
					<Event shortDesc={true} data={eventDetail} />
				</div>
				{/* <div className="eventDetail__body-description">
					<p className="eventDetail-title">Description</p>
					<span>
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Sequi eos quaerat iusto, expedita ut veritatis alias
						illum quis dignissimos, saepe omnis. Autem,
						exercitationem quibusdam! Facere in non nulla quis enim?
					</span>
				</div> */}
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
					<p className="eventDetail-title">Actual Attendess</p>
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
						referenceId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
						approverId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
						approver: {
							id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
							businessId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
							name: "string",
							email: "string",
							image: "https://joeschmoe.io/api/v1/random",
							type: 1,
							userTypeId: 1,
							designation: "string",
						},
						createBy: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
						approvalType: 0,
						isDefault: true,
						status: 1,
						remarks: [
							{
								id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
								approvalId:
									"3fa85f64-5717-4562-b3fc-2c963f66afa6",
								remark: "string",
								status: 1,
								type: 1,
								createBy:
									"3fa85f64-5717-4562-b3fc-2c963f66afa6",
								remarker: {
									id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
									businessId:
										"3fa85f64-5717-4562-b3fc-2c963f66afa6",
									name: "string",
									email: "string",
									image: "https://joeschmoe.io/api/v1/random",
									type: 1,
									userTypeId: 1,
									designation: "string",
								},
								remarkBy:
									"3fa85f64-5717-4562-b3fc-2c963f66afa6",
								createDate: "2022-08-17T09:26:55.462Z",
							},
						],
					},
					{
						id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
						referenceId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
						approverId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
						approver: {
							id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
							businessId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
							name: "string",
							email: "string",
							image: "https://joeschmoe.io/api/v1/random",
							type: 1,
							userTypeId: 1,
							designation: "string",
						},
						createBy: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
						approvalType: 0,
						isDefault: true,
						status: 1,
						remarks: [
							{
								id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
								approvalId:
									"3fa85f64-5717-4562-b3fc-2c963f66afa6",
								remark: "string",
								status: 1,
								type: 1,
								createBy:
									"3fa85f64-5717-4562-b3fc-2c963f66afa6",
								remarker: {
									id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
									businessId:
										"3fa85f64-5717-4562-b3fc-2c963f66afa6",
									name: "string",
									email: "string",
									image: "https://joeschmoe.io/api/v1/random",
									type: 1,
									userTypeId: 1,
									designation: "string",
								},
								remarkBy:
									"3fa85f64-5717-4562-b3fc-2c963f66afa6",
								createDate: "2022-08-17T09:26:55.462Z",
							},
						],
					},
					{
						id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
						referenceId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
						approverId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
						approver: {
							id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
							businessId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
							name: "string",
							email: "string",
							image: "https://joeschmoe.io/api/v1/random",
							type: 1,
							userTypeId: 1,
							designation: "string",
						},
						createBy: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
						approvalType: 0,
						isDefault: true,
						status: 1,
						remarks: [
							{
								id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
								approvalId:
									"3fa85f64-5717-4562-b3fc-2c963f66afa6",
								remark: "string",
								status: 1,
								type: 1,
								createBy:
									"3fa85f64-5717-4562-b3fc-2c963f66afa6",
								remarker: {
									id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
									businessId:
										"3fa85f64-5717-4562-b3fc-2c963f66afa6",
									name: "string",
									email: "string",
									image: "https://joeschmoe.io/api/v1/random",
									type: 1,
									userTypeId: 1,
									designation: "string",
								},
								remarkBy:
									"3fa85f64-5717-4562-b3fc-2c963f66afa6",
								createDate: "2022-08-17T09:26:55.462Z",
							},
						],
					},
					{
						id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
						referenceId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
						approverId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
						approver: {
							id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
							businessId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
							name: "string",
							email: "string",
							image: "https://joeschmoe.io/api/v1/random",
							type: 1,
							userTypeId: 1,
							designation: "string",
						},
						createBy: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
						approvalType: 0,
						isDefault: true,
						status: 1,
						remarks: [
							{
								id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
								approvalId:
									"3fa85f64-5717-4562-b3fc-2c963f66afa6",
								remark: "string",
								status: 1,
								type: 1,
								createBy:
									"3fa85f64-5717-4562-b3fc-2c963f66afa6",
								remarker: {
									id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
									businessId:
										"3fa85f64-5717-4562-b3fc-2c963f66afa6",
									name: "string",
									email: "string",
									image: "https://joeschmoe.io/api/v1/random",
									type: 1,
									userTypeId: 1,
									designation: "string",
								},
								remarkBy:
									"3fa85f64-5717-4562-b3fc-2c963f66afa6",
								createDate: "2022-08-17T09:26:55.462Z",
							},
						],
					},
					{
						id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
						referenceId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
						approverId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
						approver: {
							id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
							businessId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
							name: "string",
							email: "string",
							image: "https://joeschmoe.io/api/v1/random",
							type: 1,
							userTypeId: 1,
							designation: "string",
						},
						createBy: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
						approvalType: 0,
						isDefault: true,
						status: 1,
						remarks: [
							{
								id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
								approvalId:
									"3fa85f64-5717-4562-b3fc-2c963f66afa6",
								remark: "string",
								status: 1,
								type: 1,
								createBy:
									"3fa85f64-5717-4562-b3fc-2c963f66afa6",
								remarker: {
									id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
									businessId:
										"3fa85f64-5717-4562-b3fc-2c963f66afa6",
									name: "string",
									email: "string",
									image: "https://joeschmoe.io/api/v1/random",
									type: 1,
									userTypeId: 1,
									designation: "string",
								},
								remarkBy:
									"3fa85f64-5717-4562-b3fc-2c963f66afa6",
								createDate: "2022-08-17T09:26:55.462Z",
							},
						],
					},
				]}
				onStatusChanged={status => {}}
				status={""}
			/>
		</div>
	);
}

export default ScheduleCompoerDetail;
