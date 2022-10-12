import React from "react";
import "./style.css";
import Workwise from "./workwise-logo-2.gif";

const Splash = () => {
	return (
		<div className="flex w-[500px] h-full justify-center items-center">
			<img
				alt=""
				src={Workwise}
				className=" w-full !object-contain"
			/>
		</div>
	);
};
export default Splash;
