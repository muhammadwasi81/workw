import React, { useContext, useEffect, useState } from "react";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";
import { ROUTES } from "../../../../../utils/routes";
import { useDispatch, useSelector } from "react-redux";
import CardProfileTopView from "../ListView/CardProfileTopView";
import { getTravelById } from "../../store/actions";
import { TravelDictionary } from "../../localization";
import TravelDetailSkeleton from "./TravelDetailSkeleton";
import Approval from "../../../../sharedComponents/AppComponents/Approvals/view";
import {
	ApprovalsModule,
	ApprovalStatus,
} from "../../../../sharedComponents/AppComponents/Approvals/enums";
import NewTravelDetailCard from "../UI/NewTravelDetailCard";

function TravelDetail(props) {
	const { travelId } = props;
	const [status, setStatus] = useState();
	const [travelStatus, setTravelStatus] = useState({});
	const { travelDetail, success, loader } = useSelector(
		state => state.travelSlice
	);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getTravelById(travelId));
	}, []);

	useEffect(() => {
		if (Object.keys(travelStatus).length !== 0) {
			const travelStatusArr = Object.keys(travelStatus).map(k => {
				return { [k]: travelStatus[k] };
			});

			const updateList = [...travelStatusArr].reduce(
				(acc, val, index) => {
					const ac = Object?.values(acc)?.toString();
					const va = Object?.values(val)?.toString();
					if (ac === va) return va;
					else return ApprovalStatus.InProcess;
				}
			);
			setStatus(updateList);
		}
	}, [travelStatus]);

	const { userLanguage } = useContext(LanguageChangeContext);
	const { TravelDictionaryList, Direction } = TravelDictionary[userLanguage];
	const { headings } = TravelDictionaryList;
	const items = [
		{
			name: travelDetail && travelDetail.subject,
			to: `${ROUTES.TRAVEL.TREAVELDETAIL + travelId}`,
		},
	];

	return (
		<div className="p-4 bg-white rounded" direction={Direction}>
			<div className="flex flex-col gap-4">
				{!travelDetail ? (
					<TravelDetailSkeleton />
				) : (
					<>
						<CardProfileTopView
							profileImgSrc={
								travelDetail && travelDetail.creator.image
							}
							createDate={travelDetail && travelDetail.createDate}
							isPublic={true}
							name={travelDetail && travelDetail.creator.name}
							destination={
								travelDetail && travelDetail.creator.designation
									? travelDetail.creator.designation
									: "No Designation"
							}
							refNo={travelDetail && travelDetail.referenceNo}
							status={status || travelDetail?.status}
							profileImgSize={40}
						/>
						<div className="flex justify-between flex-col gap-3">
							<div className="flex flex-col gap-1">
								<span className="text-black font-bold ">
									{travelDetail && travelDetail.subject}
								</span>
								<span className="text-gray-500 font-bold ">
									{headings.description}:{" "}
									<span className="text-sm text-black font-normal">
										{travelDetail &&
											travelDetail.description}
									</span>
								</span>
							</div>
							<div>
								<h3 className=" text-primary-color font-semibold">
									{headings.desctination}
								</h3>
								<div
									className={`flex overflow-x-auto gap-5 ${travelDetail
										?.cities.length === 1 &&
										"justify-center"} `}
								>
									{travelDetail &&
										travelDetail.cities.map(
											(detail, index) => (
												<div className="">
													<NewTravelDetailCard
														travel={detail}
														isCloseable={false}
														index={index}
													/>
												</div>
											)
										)}
								</div>
							</div>
							<div>
								<hr className="border-t-[2px]" />
								<Approval
									title={"Approvers"}
									module={ApprovalsModule.TravelApproval}
									data={
										travelDetail && travelDetail.approvers
									}
									onStatusChanged={status => {
										setTravelStatus(prev => {
											return { ...prev, ...status };
										});
									}}
									status={
										travelDetail &&
										travelDetail.approverStatus
									}
								/>
								<Approval
									title={"Agents"}
									module={ApprovalsModule.TravelAgent}
									data={travelDetail && travelDetail.agents}
									onStatusChanged={status => {
										setTravelStatus(prev => {
											return { ...prev, ...status };
										});
									}}
									status={
										travelDetail && travelDetail.agentStatus
									}
								/>
							</div>
						</div>
					</>
				)}
			</div>
		</div>
	);
}

export default TravelDetail;
