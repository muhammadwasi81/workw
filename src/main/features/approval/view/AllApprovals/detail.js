import React from "react";
import { defaultUiid } from "../../../../../utils/Shared/enums/enums";
import Tab from "../../../../sharedComponents/Tab";
import BonusDetailCard from "../../../bonus/view/DetailCard";
import ComplainDetail from "../../../complain/view/ComplainDetail";
import DocumentDetail from "../../../documents/view/components/detailCard";
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

	// switch (key) {
	// 	case value:
	// 		break;

	// 	default:
	// 		break;
	// }

	return (
		<div className="approvalDetail">
			<Tab panes={panes()} />
			{/* salary => done*/}
			<SalaryDetailCard id={defaultUiid} />
			{/* travel detail */}
			{/* <TravelDetail travelId={defaultUiid} /> */}
			{/* docs and archive => */}
			{/* <DocumentDetail id={defaultUiid} /> */}
			{/* schedules pending */}
			{/* expense =>*/}
			{/* <Expense/> */}
			{/* reward => done*/}
			{/* <RewardDetailCard id={defaultUiid} /> */}
			{/* bonus */}
			{/* <BonusDetailCard id={defaultUiid} /> */}
			{/* complaint */}
			{/* <ComplainDetail id={defaultUiid} /> */}
			{/* promotion */}
			{/* <PromotionDetail id={defaultUiid} /> */}
			{/* loan */}
			{/* <LoanDetail id={defaultUiid} /> */}
			{/* payrol => i think*/}
			{/* <PayrolDetailCard id={defaultUiid} /> */}
		</div>
	);
}
