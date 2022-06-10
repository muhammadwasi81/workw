import React from "react";
import PropTypes from "prop-types";
import AvatarGroup from "./AvatarGroup";
import TagAvatar from "./TagAvatar";

function Avatar(props) {
	const objProperty =
		props.heading === "Agents"
			? "approver"
			: props.heading.split("s")[0].toLowerCase();
	const name =
		props.membersData[0][objProperty] &&
		props.membersData[0][objProperty].name;
	const image =
		props.membersData[0][objProperty] &&
		props.membersData[0][objProperty].image;
	// console.log("name", name);
	// console.log("membersdata", props.membersData);
	// console.log("image", image);
	// console.log("heading", props.heading);
	// console.log("obje property", objProperty);
	return (
		<div>
			{props.membersData && props.membersData.length > 1 ? (
				<AvatarGroup
					membersData={props.membersData}
					heading={props.heading}
					nestedObjProperty={objProperty}
					dummyImage={props.image}
				/>
			) : (
				<TagAvatar
					text={name ? name : "No name"}
					img={image ? image : props.image}
				/>
			)}
		</div>
	);
}

export default Avatar;
