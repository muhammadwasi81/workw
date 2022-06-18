import React, { useContext, useEffect, useState } from "react";
import { dictionaryList } from "../../../../../utils/localization/languages";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";
import { ROUTES } from "../../../../../utils/routes";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
	ContBody,
	TabContainer,
} from "../../../../sharedComponents/AppComponents/MainFlexContainer";
import LayoutHeader from "../../../../layout/header";
import CardProfileTopView from "../ListView/CardProfileTopView";
import { getTravelById } from "../../store/actions";
import TravelDetailCard from "../UI/TravelDetailCard";

function TravelDetail() {
	const { travelId } = useParams();
	const [travelDetails, setTravelDetails] = useState([]);
	const { travelDetail, success, loader } = useSelector(
		state => state.travelSlice
	);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getTravelById(travelId));
	}, []);

	const { userLanguage } = useContext(LanguageChangeContext);
	const { appHeader } = dictionaryList[userLanguage];
	const items = [
		{
			name: travelDetail && travelDetail.subject,
			to: `${ROUTES.TRAVEL.DEFAULT}`,
		},
	];
	return (
		<TabContainer>
			<LayoutHeader items={items} />
			<ContBody className="flex justify-center w-full">
				<div className="bg-white p-5 rounded-xl w-[900px] flex flex-col gap-4">
					<CardProfileTopView
						profileImgSrc={"https://joeschmoe.io/api/v1/random"}
						createDate={travelDetail && travelDetail.createDate}
						isPublic={true}
						name={travelDetail && travelDetail.creator.name}
						destination={
							travelDetail && travelDetail.creator.designation
								? travelDetail.creator.designation
								: "No Designation"
						}
						refNo={travelDetail && travelDetail.referenceNo}
						status={travelDetail && travelDetail.status}
						profileImgSize={40}
					/>
					<div className="flex justify-between flex-col gap-3">
						<div className="flex flex-col gap-1">
							<span className="text-black font-bold text-base">
								{travelDetail && travelDetail.subject}
							</span>
							<span className="text-gray-500 font-bold text-base">
								Description:{" "}
								{travelDetail && travelDetail.description}
							</span>
						</div>
						<div>
							<h3 className="text-xl text-primary-color font-semibold">
								Destinations
							</h3>
							<div className="flex overflow-x-auto gap-5 overflow-hidden justify-center">
								{travelDetail &&
									travelDetail.cities.map(detail => (
										<div className="">
											<TravelDetailCard
												travel={detail}
												isCloseable={false}
											/>
										</div>
									))}
							</div>
						</div>
						<div>
							<hr className="border-t-[2px]" />
						</div>
					</div>
				</div>
			</ContBody>
		</TabContainer>
	);
}

export default TravelDetail;
