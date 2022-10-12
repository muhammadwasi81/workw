import React from "react";
import { defaultUiid } from "../../../../../utils/Shared/enums/enums";
import Tab from "../../../../sharedComponents/Tab";
import BonusDetailCard from "../../../bonus/view/DetailCard";
import ComplainDetail from "../../../complain/view/ComplainDetail";
import DocumentDetail from "../../../documents/view/components/detailCard";
import ExpenseDetail from "../../../expense/view/ExpenseDetail";
import LoanDetail from "../../../loan/LoanDetail";
import PayrolDetailCard from "../../../payroll/view/PayrollList/payrollDetailCard";
import PromotionDetail from "../../../promotion/view/PromotionDetail";
import RewardDetailCard from "../../../reward/view/DetailCard";
import SalaryDetailCard from "../../../salary/view/SalaryList/salaryDetailCard";
import TravelDetail from "../../../travel/view/TravelDetail/TravelDetail";

export default function ApprovalDetail({ approvalDetailData }) {
	const panes = () => {
		return [
			{
				featureName: `Details`,
				content: <div></div>,
				featureId: 0,
			},
		];
	};

	function Detail({ type, id }) {
		switch (type) {
			case 1:
				return <SalaryDetailCard id={id} />;

			case 2:
				return <TravelDetail travelId={id} />;

			case 3:
				return <DocumentDetail id={id} />;

			case 4:
				return <RewardDetailCard id={id} />;

			case 5:
				return <BonusDetailCard id={id} />;

			case 6:
				return <ComplainDetail id={id} />;

			case 7:
				return <PromotionDetail id={id} />;

			case 8:
				return <LoanDetail id={id} />;

			case 9:
				return <PayrolDetailCard id={id} />;
			case 10:
				return <ExpenseDetail id={id} />;
			default:
				return <></>;
		}
	}

	return (
		<div className="approvalDetail">
			<Tab panes={panes()} />
			{Detail(approvalDetailData)}
			{/* schedules pending */}
			{/* expense =>*/}
			{/* <Expense/> */}
		</div>
	);
}
