// import React from "react";
// import { CloseCircleOutlined } from "@ant-design/icons";
// import { Button } from "antd";
import { useEffect, useState } from "react";
// import travelImage from "../../../../../content/svg/travelcard.svg";
// import travelFly from "../../../../../content/svg/travelFly.svg";
import ByShip from "../../../../../content/png/by_ship.png";
import ByPlane from "../../../../../content/png/by_plane.png";
import ByTrain from "../../../../../content/png/by_train.png";
import ByRoad from "../../../../../content/png/by_road.png";
import FlyLocation from "../../../../../content/svg/fly_location.svg";
import moment from "moment";
import { useMediaQuery } from "react-responsive";
import "./card.css";
import { defaultUiid } from "../../../../../utils/Shared/enums/enums";
const initialValue = {
	arrivalId: null,
	departureId: null,
	departureDate: null,
	returnDate: null,
	isHotelRequired: null,
	isTADARequired: null,
};
function TravelDetailCard(props) {
	const [cardDetail, setCardDetail] = useState(initialValue);
	const isTablet = useMediaQuery({ minWidth: 640 });
	const isMobile = useMediaQuery({ minWidth: 500 });
	const largeSc = useMediaQuery({ minWidth: 1024 });
	const { travelById } = props.travel;

	useEffect(() => {
		// console.log("props.travel", props.travel);
		let arrivalId = props.travel.arrivalId;
		let departureId = props.travel.departureId;
		// console.log(JSON.parse(arrivalId));

		if (arrivalId.length > defaultUiid.length) {
			arrivalId = JSON.parse(arrivalId);
		}
		if (departureId.length > defaultUiid.length) {
			departureId = JSON.parse(departureId);
		}
		// console.log("", typeof arrivalId, typeof departureId);
		setCardDetail(prevDetail => ({
			...prevDetail,
			arrivalId: arrivalId,
			departureId: departureId,
			departureDate: moment(props.travel.departureDate).format(
				"DD MMM, YYYY"
			),
			returnDate: moment(props.travel.returnDate).format("DD MMM, YYYY"),
			isHotelRequired: props.travel.isHotelRequired,
			isTADARequired: props.travel.isTADARequired,
		}));
	}, [props.travel]);
	const onDeleteCard = e => {
		props.onClick(e.target.id);
	};
	return (
		<div className="travel_card_img_cont !w-max">
			<img
				src={
					travelById === 1
						? ByPlane
						: travelById === 2
						? ByShip
						: travelById === 3
						? ByRoad
						: travelById === 4
						? ByTrain
						: ""
				}
				alt="travel card image"
			/>
			<div className="travel_card_detail">
				{props.isCloseable && (
					<div
						onClick={onDeleteCard}
						id={props.index}
						className="travel_card_cross_icon cursor-pointer"
					>
						x
					</div>
				)}
				<div className="justify-between_text flex flex-col h-full gap-1">
					<div className="flex justify-between">
						<div className="flex flex-col justify-center">
							<span
								className={`font-bold text_overflow_ellipse 
								${largeSc ? "text-20" : isTablet ? "text-16" : isMobile ? "text-12" : ""} `}
							>
								{cardDetail.arrivalId &&
								cardDetail.arrivalId.name
									? cardDetail.arrivalId.name
									: props.travel.arrival}
							</span>
							<span
								className={`${
									largeSc
										? "text-16"
										: isTablet
										? "text-12"
										: isMobile
										? "text-10"
										: "text-16"
								} `}
							>
								{cardDetail.arrivalId &&
								cardDetail.arrivalId.country
									? cardDetail.arrivalId.country
									: props.travel.arrivalCountry}
							</span>
						</div>
						<div className="flex flex-col justify-center">
							<span
								className={`font-bold text_overflow_ellipse 
								${largeSc ? "text-20" : isTablet ? "text-16" : isMobile ? "text-12" : ""} `}
							>
								{cardDetail.departureId &&
								cardDetail.departureId.name
									? cardDetail.departureId.name
									: props.travel.departure}
							</span>
							<span
								className={`${
									largeSc
										? "text-16"
										: isTablet
										? "text-12"
										: isMobile
										? "text-10"
										: "text-16"
								} `}
							>
								{cardDetail.departureId &&
								cardDetail.departureId.country
									? cardDetail.departureId.country
									: props.travel.departureCountry}
							</span>
						</div>
					</div>
					<img
						src={FlyLocation}
						alt="FlyLocation"
						className="travel_fly_img"
					/>
					<div
						className={
							"flex justify-between text-semi-bold my-1" +
							`${
								largeSc
									? ""
									: isTablet
									? "text-12"
									: isMobile
									? "text-10"
									: ""
							} `
						}
					>
						<span>
							{cardDetail.departureDate &&
								cardDetail.departureDate}
						</span>{" "}
						<span className="bg-white bg-opacity-20 text-white font-semibold rounded-md px-1">
							{/* {cardDetail.departureDate &&
								cardDetail.departureDate} */}

							{travelById === 1
								? "By Plane"
								: travelById === 2
								? "By Ship"
								: travelById === 3
								? "By Road"
								: travelById === 4
								? "By Train"
								: ""}
						</span>
					</div>
					{/* <hr className="w-full" /> */}
					{props.travel.isHotelRequired !== undefined ? (
						<div
							className={
								"flex justify-between " +
								`${
									largeSc
										? ""
										: isTablet
										? "text-12"
										: isMobile
										? "text-10"
										: ""
								}`
							}
						>
							<span className="font-semibold">
								Hotel Required{" "}
								<span className="bg-white bg-opacity-20 p-1 rounded-md">
									{cardDetail.isHotelRequired &&
									cardDetail.isHotelRequired
										? "Yes"
										: "No"}
								</span>
							</span>
							<span className="font-semibold">
								TADA Applicable{" "}
								<span className="bg-white bg-opacity-20 p-1 rounded-md">
									{cardDetail.isTADARequired &&
									cardDetail.isTADARequired
										? "Yes"
										: "No"}
								</span>
							</span>
						</div>
					) : null}
				</div>
			</div>
		</div>
	);
}

export default TravelDetailCard;
