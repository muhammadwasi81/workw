import { AntDesignOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Tag, Tooltip } from "antd";
import React from "react";
import AvatarGroup from "../Avatar/AvatarGroup";
import TagAvatar from "../Avatar/TagAvatar";
import CardDetailView from "./CardDetailView";
import CardProfileTopView from "./CardProfileTopView";

function ListView(props) {
	return (
		<>
			{props.data &&
				props.data.map(data => (
					<div className="flex bg-white shadow-inner p-5 flex-col gap-2">
						<CardProfileTopView
							profileImgSrc={
								data.creator && data.creator.image.length > 0
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
						<div className="">
							<div className="flex flex-col gap-1">
								<span className="text-black text-base text-semi-bold">
									{data.subject}
								</span>
								<span>Description: {data.description}</span>
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
										text={"Danish"}
										image={
											"https://joeschmoe.io/api/v1/random"
										}
									/>
									<CardDetailView
										isAvatarGroup={true}
										isTag={false}
										heading={"Approvers"}
										membersData={data.approvers}
										text={"Danish"}
										image={
											"https://joeschmoe.io/api/v1/random"
										}
									/>
									<CardDetailView
										isAvatarGroup={true}
										isTag={false}
										heading={"Agents"}
										membersData={data.agents}
										text={"Danish"}
										image={
											"https://joeschmoe.io/api/v1/random"
										}
									/>
								</div>
							</div>
							<div>
								{/* <TagAvatar />
					<AvatarGroup /> */}
							</div>
						</div>
					</div>
				))}
		</>
	);
}

export default ListView;
