import React from "react";
import ProjectDefaultImage from "../../../../content/png/project_cover_img.png";
import Avatar from "../../../sharedComponents/Avatar/avatar";
import { Card } from "antd";
const { Meta } = Card;

function ListItem(props) {
	const {
		name,
		description,
		image = ProjectDefaultImage,
		members = [],
	} = props.item;

	return (
		<>
			<Card
				className={"Card2"}
				cover={
					<img
						alt="example"
						className="object-cover"
						src={ProjectDefaultImage}
					/>
				}
				hoverable
				actions={[]}
			>
				<Meta title={name} description={description} />
				<Avatar
					isAvatarGroup={true}
					isTag={false}
					heading={"Members"}
					membersData={members}
					text={"Danish"}
					image={"https://joeschmoe.io/api/v1/random"}
				/>
			</Card>
		</>
	);
}

export default ListItem;
