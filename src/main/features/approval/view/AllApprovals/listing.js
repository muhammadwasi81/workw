import React from "react";
import { useSelector } from "react-redux";
import { ApprovalStatus } from "../../../../sharedComponents/AppComponents/Approvals/enums";
import Tab from "../../../../sharedComponents/Tab";
import ApprovalItem from "../SideBarApproval/approvalItem";
import RefreshIcon from '../../../../../content/NewContent/leadManager/svg/refresh.svg';
import { useDispatch } from "react-redux";
import { getAllApproval } from '../../store/action';





export default function Listing({ handleApprovalDetail, handleTabChange }) {
	const dispatch=useDispatch();
	const handleRefresh = (e) => {
		console.log('refresh');
		e.preventDefault();
		e.stopPropagation();
		let isMyApproval = true;
		dispatch(getAllApproval({ isMyApproval,  pageNo: 0,
			search: '',
			status: [1], }));
	  };
	
	const panes = [
		{
			featureName: `In Progress`,
			content: <div></div>,
			featureId: 1
		},
		{
			featureName: `Accepted`,
			content: <div></div>,
			featureId: 2
		},
		{
			featureName: `Declined`,
			content: <div></div>,
			featureId: 3
		},
		{
			featureName: `Hold`,
			content: <div></div>,
			featureId: 4
		},
		{
			featureName:"Refresh",
			content:<div onClick={(e) => {handleRefresh(e)
			  }}></div>,
		  featureId:5,
	
	
			  
		}
	];
	const approvalList = useSelector(state => state.approvalSlice.approvalList);

	return (
		<>
			<Tab
				canChangeRoute={true}
				panes={panes}
				onChange={handleTabChange} 
				/>
			<div className="overflow-scroll h-[85vh]">
				{approvalList.map(item => (
					<ApprovalItem
						item={item}
						handleApprovalDetail={handleApprovalDetail}
					/>
				))}
			</div>
		</>
	);
}
