import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ROUTES } from "../../../../../utils/routes";
import { TabbableContainer } from "../../../../layout/GridStyle";
import Header from "../../../../layout/header/index";
import { ContBody } from "../../../../sharedComponents/AppComponents/MainFlexContainer";
import { getAllApproval } from "../../store/action";
import ApprovalDetail from "./detail";
import Listing from "./listing";

export default function AllApprovals() {
	const defaultFilter = {
		pageNo: 0,
		search: "",
		modules:[]
	}
    const [filter, setFilter] = useState(defaultFilter);
	const [approvalDetailData, setApprovalDetailData] = useState({});
	const dispatch = useDispatch();

	const handleApprovalDetail = item => {
		setApprovalDetailData(item);
	};
	useEffect(() => {
            dispatch(getAllApproval(filter));
    }, [filter]);

	return (
		<TabbableContainer>
			<Header
				buttons={[]}
				items={[
					{
						name: 'Approvals',
						renderButton: [1],
						to: ROUTES.APPROVALS.DEFAULT,
					},
				]}
				backButton={false}
			/>
			
			<ContBody>
				<div className="flex ApprovalMainView gap-4 w-full">
					<div className="">
						<Listing handleApprovalDetail={handleApprovalDetail} />
					</div>
					<div className="flex-1">
						<ApprovalDetail
							approvalDetailData={approvalDetailData}
						/>
					</div>
				</div>
			</ContBody>
		</TabbableContainer>
	);
}
