import React from "react";

function Card({ children, className, style }) {
	return (
		<div
			className={`p-3 flex flex-col gap-2 ${className} overflow-auto`}
			style={style}
		>
			{children}
		</div>
	);
}

export default Card;
