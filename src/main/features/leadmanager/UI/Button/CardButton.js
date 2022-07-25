import { Button } from "antd";
import React from "react";

function CardButton({ className, icon, onClick }) {
	return (
		<Button
			className={`bg-white !rounded-sm !border-none !outline-none !min-w-[50px] !w-full ${className}`}
			onClick={onClick}
			icon={icon}
		/>
	);
}

export default CardButton;
