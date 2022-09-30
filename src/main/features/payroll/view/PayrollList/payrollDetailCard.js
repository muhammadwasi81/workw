import { Tag } from "antd";
import React, { useContext, useEffect } from "react";
import UserInfo from "../../../../sharedComponents/UserShortInfo/UserInfo";
import SublineDesigWithTime from "../../../../sharedComponents/UserShortInfo/SubLine/DesigWithTime";
import StatusTag from "../../../../sharedComponents/Tag/StatusTag";
import moment from "moment";
import {
	ItemHeader,
	SingleItem,
} from "../../../../sharedComponents/Card/CardStyle";
import { useDispatch } from "react-redux";
import Avatar from "../../../../sharedComponents/Avatar/avatar";
import { useSelector } from "react-redux";
// import AllowanceDetail from "./allowanceDetail";
import RemarksApproval from "../../../../sharedComponents/AppComponents/Approvals/view";
import { ApprovalsModule } from "../../../../sharedComponents/AppComponents/Approvals/enums";
import EmployeesDetail from "./EmployeesDetail";
// import { getEmployeeSalaryDetail } from "../../../salary/store/actions";

function PayrolDetailCard(props) {
	const dispatch = useDispatch();
	const { id } = props;
	useEffect(() => {
		// dispatch(getEmployeeSalaryDetail(id));
	}, [id]);

	const payrollDetail = useSelector(
		state => state.payrollSlice.payrollDetail
	);

	return (
		<>
			<SingleItem>
				<ItemHeader>
					<div className="left">
						<UserInfo
							avatarSrc={payrollDetail?.creator.image}
							name={payrollDetail?.creator.name}
							Subline={
								<SublineDesigWithTime
									designation={
										payrollDetail?.creator.designation
											? payrollDetail?.creator.designation
											: ""
									}
									time={moment(
										payrollDetail?.createDate
									).fromNow()}
								/>
							}
						/>
					</div>
					<div className="right">
						<Tag className="IdTag">
							{payrollDetail?.referenceNo}
						</Tag>
						<StatusTag status={payrollDetail?.status}></StatusTag>
					</div>
				</ItemHeader>
				<div className="description w-full pt-3 pb-5">
					<p>{payrollDetail?.description}</p>
				</div>

				<div className="cardSections">
					<div className="cardSectionItem">
						<div className="cardSection__title">Employees</div>
						<div className="cardSection__body">
							<Avatar
								isAvatarGroup={true}
								heading={"approvers"}
								membersData={payrollDetail?.details.map(
									item => ({
										approver: item.user,
									})
								)}
							/>
						</div>
					</div>
					<div className="cardSectionItem">
						<div className="cardSection__title">Disperse Date</div>
						<div className="cardSection__body">
							{moment().format("MMM Do YYYY")}
						</div>
					</div>
					<div className="cardSectionItem">
						<div className="cardSection__title">Month</div>
						<div className="cardSection__body">
							{moment(payrollDetail?.month, "M").format("MMMM")}
						</div>
					</div>
					<div className="cardSectionItem">
						<div className="cardSection__title">Year</div>
						<div className="cardSection__body">
							{moment(payrollDetail?.year, "Y").format("YYYY")}
						</div>
					</div>
					<div className="cardSectionItem">
						<div className="cardSection__title">Total Amount</div>
						<div className="cardSection__body">
							{payrollDetail?.total}
						</div>
					</div>
				</div>
				<EmployeesDetail details={payrollDetail?.details} />
				<RemarksApproval
					data={payrollDetail?.approvers}
					title="Approvals"
					module={ApprovalsModule.PayrollApproval}
					onStatusChanged={() => {}}
				/>
			</SingleItem>
		</>
	);
}

export default PayrolDetailCard;
