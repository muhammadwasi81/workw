import { Button } from "antd";
import React from "react";
import { BiPlusCircle } from "react-icons/bi";

function AddButton({ onClick, text }) {
	return (
		<Button
			icon={<BiPlusCircle className="text-2xl" />}
			className="!p-0 !text-primary-color !flex gap-2 !items-center !text-lg !font-semibold"
			type="text"
			onClick={onClick}
		>
			{text}
		</Button>
	);
}

export default AddButton;
