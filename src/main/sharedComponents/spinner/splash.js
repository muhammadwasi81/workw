import React from "react";
import "./style.css";
import WorkWise from "./workwise_loader.gif";

const Splash = () => {
	return (
		<div className="main fadeOut">
			<div className="loader splash">
				<div className="child">
					<img
						alt=""
						src={WorkWise}
						className="myImg"
						style={{ width: "80px" }}
					/>
				</div>
			</div>
		</div>
	);
};
export default Splash;
