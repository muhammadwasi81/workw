import React from "react";
import ProjectDefaultImage from "../../../../content/png/project_cover_img.png";
import Avatar from "../../../sharedComponents/Avatar/avatar";
import { Card } from "antd";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../../utils/routes";
const { Meta } = Card;

function ListItem(props) {
	const { name, description, image, members = [] } = props.item;
	const navigate = useNavigate();
	return (
		<>
			<Card
				className={"Card2"}
				cover={
					<img
						alt="example"
						className="object-cover"
						src={image || ProjectDefaultImage}
					/>
				}
				hoverable
				onClick={e => {
					navigate(`${ROUTES.PROJECT.DEFAULT}/${props.id} `);
				}}
			>
				<Meta
					title={name}
					description={
						<p className="overflow-hidden whitespace-nowrap text-ellipsis">
							{description}
						</p>
					}
					className="overflow-hidden whitespace-nowrap text-ellipsis"
				/>
				<Avatar
					isAvatarGroup={true}
					isTag={false}
					heading={"Members"}
					membersData={members}
				/>
			</Card>
		</>
	);
}

export default ListItem;
