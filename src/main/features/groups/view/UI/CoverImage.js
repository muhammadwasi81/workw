import React from "react";

function CoverImage(props) {
	return (
		<div className="h-[400px]">
			<img
				className="h-full object-cover w-full rounded-xl z-0"
				src={props.image}
				alt="cover photo"
			/>
		</div>
	);
}

export default CoverImage;
