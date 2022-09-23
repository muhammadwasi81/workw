import React from "react";
import { defaultUiid } from "../../../../../utils/Shared/enums/enums";
import Tab from "../../../../sharedComponents/Tab";
import Reward from "../../../reward/view/DetailCard";
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

	return (
		<div className="approvalDetail">
			<Tab panes={panes()} />
			<SalaryDetailCard id={defaultUiid} />
			<TravelDetail travelId={defaultUiid} />
		</div>
	);
}
