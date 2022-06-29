import { Button } from "antd";
import React from "react";

function TrelloThemeButton({ icon, text, onClick }) {
	return (
		<div>
			<Button
				icon={icon}
				className="!flex items-center !text-primary-color !font-semibold !border-none !text-base !bg-neutral-100 hover:!bg-neutral-200 !text-center"
				size="large"
				block
				onClick={onClick}
			>
				{text}
			</Button>
		</div>
	);
}

export default TrelloThemeButton;
