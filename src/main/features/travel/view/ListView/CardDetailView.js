import React from "react";
import PropTypes from "prop-types";
import ReferenceTag from "../../../../sharedComponents/Tag/ReferenceTag";
import Avatar from "../../../../sharedComponents/Avatar/avatar";

function CardDetailView(props) {
	return (
		<div className="flex flex-col">
			<h2 className="text-black sm:text-base text-semi-bold">
				{props.heading}
			</h2>
			{props.isAvatarGroup ? (
				<Avatar
					membersData={props.membersData}
					text={props.text}
					image={props.image}
					heading={props.heading}
				/>
			) : props.isTag ? (
				<ReferenceTag refNo={props.text} />
			) : (
				<h2 className="text-gray-500 sm:text-base text-semi-bold">
					{props.text}
				</h2>
			)}
		</div>
	);
}

export default CardDetailView;

CardDetailView.prototypes = {
	heading: PropTypes.string.isRequired,
	text: PropTypes.string,
	isAvatarGroup: PropTypes.bool,
	isTagAvatar: PropTypes.bool,
	isTag: PropTypes.bool,
};

CardDetailView.defaultProps = {};
