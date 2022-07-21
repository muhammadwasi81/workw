import React from "react";
import "./style.css";
import WorkWise from "./workwise_loader.gif";

const Spinner = ({ isHeight }) => {
	return (
		// <div className="main fadeOut" style={{ height: isHeight && "unset" }}>
		// 	<div className="loader mySpinner">
		// 		<div className="child">
		// 		</div>
		// 	</div>
		// </div>
		<img alt="" src={WorkWise} className="loader" />
	);
};
export default Spinner;
