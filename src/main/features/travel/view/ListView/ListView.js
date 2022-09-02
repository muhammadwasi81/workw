import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Drawer, Skeleton } from "antd";
import TravelDetailCard from "../UI/TravelDetailCard";
import CardDetailView from "./CardDetailView";
import CardProfileTopView from "./CardProfileTopView";
import Calender from "../../../../../content/svg/Calender.svg";
import location from "../../../../../content/svg/location.svg";
import { ROUTES } from "../../../../../utils/routes";

import moment from "moment";
import Avatar from "../../../../sharedComponents/Avatar/avatar";
import TravelDetail from "../TravelDetail/TravelDetail";
import { useDispatch } from "react-redux";
import { resetTravelDetail } from "../../store/slice";

function ListView(props) {
	const { labels } = props;
	const [visible, setVisible] = useState(false);
	const [travelId, setTravelId] = useState("");

	const dispatch = useDispatch();
	const showDrawer = id => {
		setTravelId(id);
		setVisible(true);
	};

	const onClose = () => {
		setVisible(false);
		dispatch(resetTravelDetail());
	};
	// console.log("travel", travelId);
	return (
		<div className="gap-5 flex flex-col z-10 ">
			{props.data
				? props.data.map(data => (
						<div
							className="flex bg-white flex-col gap-2 rounded-xl cursor-pointer overflow-hidden hover:shadow-lg duration-300"
							onClick={() => {
								showDrawer(data.id);
								// navigate(
								// 	`${ROUTES.TRAVEL.TREAVELDETAIL}${data.id}`
								// );
							}}
						>
							<div className="p-3 sm:p-5">
								<CardProfileTopView
									profileImgSrc={
										data.creator &&
										data.creator.image.length > 0
											? data.creator.image
											: "https://joeschmoe.io/api/v1/random"
									}
									createDate={data.createDate}
									isPublic={true}
									name={data.creator && data.creator.name}
									destination={
										data.creator && data.creator.designation
											? data.creator.designation
											: "Not Designated"
									}
									refNo={data.referenceNo}
									status={data.status}
									profileImgSize={40}
								/>
								<div className="flex justify-between flex-wrap">
									<div className="flex flex-col gap-1">
										<span className="text-black text-semi-bold">
											{data.subject}
										</span>
										<div>
											<span className="text-black text-semi-bold">
												{labels.description}:{" "}
											</span>
											{data.description}
										</div>
									</div>
								</div>
								<div className="bg-[#F6F7F9] mt-3 p-3 px-9 rounded flex items-center justify-between relative overflow-auto ">
									<div className="flex gap-3 items-center min-w-[200px]">
										<img
											src={Calender}
											alt=""
											className="h-[30px]"
										/>
										<div className="flex flex-col gap font-semibold">
											<span className="">Date</span>
											<span className="text-primary-color">
												{moment(
													data.departureDate
												).format("D MMM YYYY")}
											</span>
										</div>
									</div>

									<div className="flex gap-3 items-center before:h-[40px] before:-left-[50px] before:w-[1px] before:bg-[#D9D9D9] before:absolute relative min-w-[300px]">
										<img
											src={location}
											alt=""
											className="h-[30px]"
										/>
										<div className="flex flex-col gap font-semibold">
											<span className="break-words">
												Departure City
											</span>
											<span className="text-primary-color">
												{data.departure +
													" - " +
													data.departureCountry}
											</span>
										</div>
									</div>

									<div className="flex gap-3 items-center before:h-[40px] before:-left-[50px] before:w-[1px] before:bg-[#D9D9D9] before:absolute relative min-w-[300px]">
										<img
											src={location}
											alt=""
											className="h-[30px]"
										/>
										<div className="flex flex-col gap font-semibold">
											<span className="break-words">
												Arrival City
											</span>
											<span className="text-primary-color">
												{data.arrival +
													" - " +
													data.arrivalCountry}
											</span>
										</div>
									</div>
									<div className="flex gap-3 items-center before:h-[40px] before:-left-[50px] before:w-[1px] before:bg-[#D9D9D9] before:absolute relative min-w-[150px]">
										<div className="flex flex-col gap font-semibold">
											<span className="">Approvers</span>
											<Avatar
												heading={"Approvers"}
												membersData={data.approvers}
												size={"small"}
											/>
										</div>
									</div>
									<div className="flex gap-3 items-center before:h-[40px] before:-left-[50px] before:w-[1px] before:bg-[#D9D9D9] before:absolute relative min-w-[150px]">
										<div className="flex flex-col gap font-semibold">
											<span className="">Agents</span>
											<Avatar
												heading={"Agents"}
												membersData={data.agents}
												size={"small"}
											/>
										</div>
									</div>
								</div>
							</div>
						</div>
				  ))
				: null}
			{props.loader &&
				[0, 0, 0].map(() => (
					<Skeleton
						active
						avatar
						paragraph={{
							rows: 4,
						}}
					/>
				))}
			<Drawer
				title="Travel Detail"
				placement="right"
				onClose={onClose}
				visible={visible}
				width={"768px"}
				destroyOnClose={true}
			>
				<TravelDetail travelId={travelId} />
			</Drawer>
		</div>
	);
}

export default ListView;
