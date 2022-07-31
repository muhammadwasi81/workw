import React from "react";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "antd";
import TravelDetailCard from "../UI/TravelDetailCard";
import CardDetailView from "./CardDetailView";
import CardProfileTopView from "./CardProfileTopView";
import { ROUTES } from "../../../../../utils/routes";

function ListView(props) {
	const navigate = useNavigate();
	const { labels } = props;

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
										<div className="flex gap-2 justify-between sm:justify-start sm:gap-5 flex-wrap ">
											<CardDetailView
												isAvatarGroup={false}
												isTag={false}
												label={labels.type}
												heading={"Type"}
												text={"Project"}
												image={
													"https://joeschmoe.io/api/v1/random"
												}
											/>
											<CardDetailView
												isAvatarGroup={false}
												isTag={true}
												label={labels.project}
												heading={"Project"}
												text={"Marketing"}
												image={
													"https://joeschmoe.io/api/v1/random"
												}
											/>
											<CardDetailView
												isAvatarGroup={true}
												isTag={false}
												label={labels.members}
												heading={"Members"}
												membersData={data.members}
												image={
													"https://joeschmoe.io/api/v1/random"
												}
											/>
											<CardDetailView
												isAvatarGroup={true}
												isTag={false}
												label={labels.approvers}
												heading={"Approvers"}
												membersData={data.approvers}
												image={
													"https://joeschmoe.io/api/v1/random"
												}
											/>
											<CardDetailView
												isAvatarGroup={true}
												isTag={false}
												label={labels.agents}
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
