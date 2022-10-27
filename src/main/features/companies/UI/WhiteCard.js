import React from "react";

function WhiteCard(props) {
	return (
		<div
			className={"bg-white p-5 rounded-lg shadow-md " + props.className}
			onClick={props.onClick}
		>
			{props.children}
		</div>
	);
}

export default WhiteCard;
