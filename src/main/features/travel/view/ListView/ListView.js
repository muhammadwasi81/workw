import React from "react";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "antd";
import TravelDetailCard from "../UI/TravelDetailCard";
import CardDetailView from "./CardDetailView";
import CardProfileTopView from "./CardProfileTopView";
import { ROUTES } from "../../../../../utils/routes";

function ListView(props) {
	const navigate = useNavigate();

	return (
		<div className="gap-5 flex flex-col z-10 hover:shadow-black duration-300">
			{props.data
				? props.data.map(data => (
						<div
							className="flex bg-white flex-col gap-2 rounded-xl cursor-pointer overflow-hidden"
							onClick={() => {
								navigate(
									`${ROUTES.TRAVEL.TREAVELDETAIL}${data.id}`
								);
							}}
						>
							{/* <div
								className="absolute w-full h-full cursor-pointer duration-300 rounded-xl"
								onClick={() => {
									navigate(
										`${ROUTES.TRAVEL.TREAVELDETAIL}${data.id}`
									);
								}}
							/> */}
							<div className="p-5">
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
								<div className="flex justify-between">
									<div className="flex flex-col gap-1">
										<span className="text-black text-base text-semi-bold">
											{data.subject}
										</span>
										<span>
											Description: {data.description}
										</span>
										<div className="flex gap-5 flex-wrap ">
											<CardDetailView
												isAvatarGroup={false}
												isTag={false}
												heading={"Type"}
												text={"Project"}
												image={
													"https://joeschmoe.io/api/v1/random"
												}
											/>
											<CardDetailView
												isAvatarGroup={false}
												isTag={true}
												heading={"Project"}
												text={"Marketing"}
												image={
													"https://joeschmoe.io/api/v1/random"
												}
											/>
											<CardDetailView
												isAvatarGroup={true}
												isTag={false}
												heading={"Members"}
												membersData={data.members}
												image={
													"https://joeschmoe.io/api/v1/random"
												}
											/>
											<CardDetailView
												isAvatarGroup={true}
												isTag={false}
												heading={"Approvers"}
												membersData={data.approvers}
												image={
													"https://joeschmoe.io/api/v1/random"
												}
											/>
											<CardDetailView
												isAvatarGroup={true}
												isTag={false}
												heading={"Agents"}
												membersData={data.agents}
												image={
													"https://joeschmoe.io/api/v1/random"
												}
											/>
										</div>
									</div>
									<div className="">
										<TravelDetailCard
											travel={data}
											isCloseable={false}
										/>
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
		</div>
	);
}

export default ListView;
