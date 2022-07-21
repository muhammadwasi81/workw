import React from "react";
import "./style.css";
import Workwise from "./workwise-logo-2.gif";

const Spinner = ({ isHeight }) => {
	return (
		<div className="flex w-full h-full justify-center items-center">
			<img
				alt=""
				src={Workwise}
				className="h-full w-[500px] object-contain"
			/>
		</div>
	);
};
export default Spinner;
