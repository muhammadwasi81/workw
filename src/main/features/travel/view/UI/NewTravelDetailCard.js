import moment from "moment";
import React from "react";
import FlyLocation from "../../../../../content/svg/travel-location.svg";
// import FlyLocation from "../../../../../content/svg/fly_location.svg";
// import "./card.css";
function NewTravelDetailCard(props) {
	const { travel } = props;
	const travelObj = {
		1: "By Plane",
		2: "By Ship",
		3: "By Road",
		4: "By Train",
	};
	return (
		<div className="bg-[#F4F4F4] rounded-lg w-[380px] text-primary-color">
			<div className="flex flex-col justify-center p-4">
				<div className="flex justify-between items-center px-2">
					<div className="flex flex-col items-center ">
						<span className="text-lg font-semibold">
							{travel?.departure.name}
						</span>
						<span>{travel?.departure.country}</span>
					</div>
					<div className="flex flex-col items-center ">
						<span className="text-lg font-semibold">
							{travel?.arrival.name}
						</span>
						<span>{travel?.arrival.country}</span>
					</div>
				</div>
				{/* <div className="flex justify-center">
				</div> */}
				<img src={FlyLocation} alt="" />
				{/* <div className="logo"></div> */}

				<div className="flex items-center justify-between font-semibold">
					<span>
						{moment(travel?.departureDate).format("DD MMM, YYYY")}
					</span>
					<span className="">{travelObj[travel?.travelById]}</span>
				</div>
			</div>
			<hr />
			<div className="flex justify-between p-2">
				<span>
					Hotel Required{" "}
					<span className="p-1 bg-primary-color text-white text-xs rounded text-semi-bold">
						{travel?.isHotelRequired ? "Yes" : "No"}
					</span>
				</span>
				<span>
					TADA Applicable{" "}
					<span className="p-1 bg-primary-color text-white text-xs rounded text-semi-bold">
						{travel?.isTADARequired ? "Yes" : "No"}
					</span>
				</span>
			</div>
		</div>
	);
}

export default NewTravelDetailCard;
