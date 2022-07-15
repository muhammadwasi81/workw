import React from "react";
import { Card } from "antd";
import Avatar from "../../../sharedComponents/Avatar/avatar";
import GroupImg from "../../../../content/png/groups_cover_image.jpg";
import PublicPrivateIcon from "../../../sharedComponents/PublicPrivateIcon/PublicPrivateIcon";
function WorkBoardCard({ data, onWorkBoardClick }) {
	const { Meta } = Card;
	return (
		<Card
			cover={
				<img
					alt="example"
					className="object-cover"
					src={data.image ? data.image : GroupImg}
				/>
			}
			className="Card2"
			hoverable
			onClick={() => {
				onWorkBoardClick(data.id);
			}}
		>
			<Meta
				title={data.name}
				description={
					<div className="flex items-center gap-1 ">
						<PublicPrivateIcon id={data.privacyId} />{" "}
						<span className="text-ellipsis whitespace-nowrap overflow-hidden w-[150px]">
							{data.description}
						</span>
					</div>
				}
			/>
			<Avatar
				isAvatarGroup={true}
				isTag={false}
				heading={"Members"}
				membersData={data.members}
				image={"https://joeschmoe.io/api/v1/random"}
			/>
		</Card>
	);
}

export default WorkBoardCard;
