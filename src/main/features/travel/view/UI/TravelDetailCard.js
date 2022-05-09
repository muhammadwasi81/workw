// import React from "react";
// import { CloseCircleOutlined } from "@ant-design/icons";
// import { Button } from "antd";
import { useEffect, useState } from "react";
import travelImage from "../../../../../content/svg/travelcard.svg";
import travelFly from "../../../../../content/svg/travelFly.svg";
import moment from "moment";
import { useMediaQuery } from "react-responsive";
import "./card.css";
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

	useEffect(() => {
		setCardDetail(prevDetail => ({
			...prevDetail,
			arrivalId: JSON.parse(props.travel.arrivalId),
			departureId: JSON.parse(props.travel.departureId),
			departureDate: moment(props.travel.departureDate).format(
				"DD MMM, YYYY"
			),
			returnDate: moment(props.travel.returnDate).format("DD MMM, YYYY"),
			isHotelRequired: props.travel.isHotelRequired,
			isTADARequired: props.travel.isTADARequired,
		}));
	}, [props.travel]);
	// console.log("state", cardDetail);

	const onDeleteCard = e => {
		// console.log("e", e);
		props.onClick(e.target.id);
	};
	// console.log("props", props.travel);
	return (
		<div className="travel_card_img_cont">
			<img src={travelImage} alt="travel card image" />
			<div className="travel_card_detail">
				<div
					onClick={onDeleteCard}
					id={props.index}
					className="travel_card_cross_icon cursor-pointer"
				>
					x
				</div>
				<div className="justify-between_text flex flex-col h-full">
					<div className="flex justify-between">
						<div className="flex flex-col justify-center">
							<span
								className={`text-bold text_overflow_ellipse 
								${largeSc ? "text-20" : isTablet ? "text-16" : isMobile ? "text-12" : ""} `}
							>
								{cardDetail.arrivalId &&
									cardDetail.arrivalId.name &&
									cardDetail.arrivalId.name}
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
									cardDetail.arrivalId.country &&
									cardDetail.arrivalId.country}
							</span>
						</div>
						<div className="flex flex-col justify-center">
							<span
								className={`text-bold text_overflow_ellipse 
								${largeSc ? "text-20" : isTablet ? "text-16" : isMobile ? "text-12" : ""} `}
							>
								{cardDetail.departureId &&
									cardDetail.departureId.name &&
									cardDetail.departureId.name}
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
									cardDetail.departureId.country &&
									cardDetail.departureId.country}
							</span>
						</div>
					</div>
					<img
						src={travelFly}
						alt="travelFly"
						className="travel_fly_img"
					/>
					<div
						className={
							"flex justify-between text-semi-bold " +
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
						<span>
							{cardDetail.departureDate &&
								cardDetail.departureDate}
						</span>
					</div>
					<hr className="w-full" />
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
						<span>
							Hotel Required{" "}
							<span className="hotel_tada_span">
								{cardDetail.isHotelRequired &&
								cardDetail.isHotelRequired
									? "Yes"
									: "No"}
							</span>
						</span>
						<span className="font-medium">
							TADA Applicable{" "}
							<span className="hotel_tada_span">
								{cardDetail.isTADARequired &&
								cardDetail.isTADARequired
									? "Yes"
									: "No"}
							</span>
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}

export default TravelDetailCard;
