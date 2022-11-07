import React from "react";
import { useLocation, useParams } from "react-router-dom";
import LayoutHeader from "../../../../layout/header";

function DetailHeader({ dictionary, direction }) {
	const items = [
		{
			name: "Course Detail",
			to: ``,
			renderButton: [1],
		},
	];

	return <LayoutHeader items={items} buttons={[]} />;
}

export default DetailHeader;
