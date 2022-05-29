import React from "react";
import CardStatusTagView from "./CardStatusTagView";
import PropTypes from "prop-types";
import ProfileDetailView from "./ProfileDetailView";

function CardProfileTopView(props) {
	return (
		<div className="flex items-center justify-between w-full">
			<ProfileDetailView
				profileImgSrc={props.profileImgSrc}
				profileImgSize={props.profileImgSize}
				createDate={props.createDate}
				isPublic={props.isPublic}
				name={props.name}
				destination={props.destination}
			/>
			<CardStatusTagView refNo={props.refNo} status={props.status} />
		</div>
	);
}

export default CardProfileTopView;
CardProfileTopView.propTypes = {
	refNo: PropTypes.string.isRequired,
	status: PropTypes.number.isRequired,
	isPublic: PropTypes.bool.isRequired,
	createDate: PropTypes.string.isRequired,
	profileImgSrc: PropTypes.string.isRequired,
	profileImgSize: PropTypes.number.isRequired,
	destination: PropTypes.string.isRequired,
};
CardProfileTopView.defaultProps = {
	refNo: "",
	status: 0,
	isPublic: true,
	createDate: "",
	profileImgSrc: "https://joeschmoe.io/api/v1/random",
	profileImgSize: 40,
};
