import React, { useContext, useEffect } from "react";
import { dictionaryList } from "../../../../../utils/localization/languages";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";
import { ROUTES } from "../../../../../utils/routes";
import { useParams } from "react-router-dom";

import {
	ContBody,
	TabContainer,
} from "../../../../sharedComponents/AppComponents/MainFlexContainer";
import LayoutHeader from "../../../../layout/header";
import CardProfileTopView from "../ListView/CardProfileTopView";

function TravelDetail() {
	const { travelId } = useParams();
	// console.log("params", travelId);
	useEffect(() => {
		//fetch the data of travel detail
	}, []);

	const { userLanguage } = useContext(LanguageChangeContext);
	const { appHeader } = dictionaryList[userLanguage];
	const items = [
		{
			name: appHeader.travel.travelDetail,
			to: `${ROUTES.TRAVEL.DEFAULT}`,
		},
	];
	return (
		<TabContainer>
			<LayoutHeader items={items} />
			<ContBody className="flex justify-center w-full">
				<div className="bg-white p-5 rounded-xl w-[900px]">
					<CardProfileTopView
						profileImgSrc={"https://joeschmoe.io/api/v1/random"}
						createDate={new Date()}
						isPublic={true}
						name={"Syed Danish Ali"}
						destination={"Not Designated"}
						refNo={"TRA-000085"}
						status={1}
						profileImgSize={40}
					/>
					<div className="flex justify-between flex-col gap-3">
						<div className="flex flex-col gap-1">
							<span className="text-black font-bold text-base">
								Lorem Ipsum is (subject)
							</span>
							<span className="text-gray-500 font-bold text-base">
								Description: Lorem Ipsum is simply dummy text of
								the printing and typesetting industry.
							</span>
						</div>
						<div>
							<h3 className="text-xl text-primary-color font-semibold">
								Destinations
							</h3>
							<div>{/* Travel cards array will come here */}</div>
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
