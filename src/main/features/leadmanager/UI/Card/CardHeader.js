import React from "react";

function CardHeader({ icon, text, className, count }) {
	return (
		<div className="flex items-center w-full bg-white bg-opacity-20 rounded-lg text-white">
			<div className="bg-white rounded-lg h-full p-1">
				<img src={icon} alt="icons" />
			</div>
			<div className="flex items-center gap-2 w-full  p-2 ">
				<span className={`${className}`}>{text}</span>
				{/* <span className="ml-auto">{"( " + count + " )"}</span> */}
			</div>
		</div>
	);
}

export default CardHeader;
