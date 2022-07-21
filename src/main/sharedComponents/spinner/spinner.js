import React from "react";
import "./style.css";
// import Konnect from "./konnect.png";

const Spinner = ({ isHeight }) => {
	return (
		<div className="main fadeOut" style={{ height: isHeight && "unset" }}>
			<div className="loader mySpinner">
				<div className="child">
					{/* <img alt="" src={Konnect} className="loader" /> */}
				</div>
			</div>
		</div>
	);
};
export default Spinner;
