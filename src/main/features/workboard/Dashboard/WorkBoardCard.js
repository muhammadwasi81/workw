import React from "react";
import { Card } from "antd";
import Avatar from "../../../sharedComponents/Avatar/avatar";
import WorkBoardImg from "../../../../content/png/workboard.png";
import PublicPrivateIcon from "../../../sharedComponents/PublicPrivateIcon/PublicPrivateIcon";
import { EditOutlined } from "@ant-design/icons";
import { ROUTES } from "../../../../utils/routes";
import { useNavigate } from "react-router-dom";
function WorkBoardCard({ data }) {
	const { Meta } = Card;
	const navigate = useNavigate();
	return (
		<Card
			cover={
				<img
					alt="example"
					className="object-cover"
					src={data.image ? data.image : WorkBoardImg}
				/>
			}
			className="Card2"
			hoverable
			onClick={() => {
				// onWorkBoardClick(data.id);
				navigate(`${ROUTES.WORKBOARD.BOARD}${data.id}`);
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
