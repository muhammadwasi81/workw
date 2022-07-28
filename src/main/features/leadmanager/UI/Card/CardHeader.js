import { Avatar } from "antd";
import React from "react";

function CardHeader({ icon, text, className, count }) {
	return (
		<div className="flex justify-between items-center text-white">
			<div className="flex items-center gap-2">
				<Avatar icon={icon} />
				<span className={`${className}`}>{text}</span>
			</div>
			<span>{"( " + count + " )"}</span>
		</div>
	);
}

export default CardHeader;
