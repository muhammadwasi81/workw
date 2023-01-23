import React from "react";
import { Result } from "antd";
import "../styles/style.css";

const Verifying = () => {

	return (
		<div style={{ width: "100%" }} className="verificationScreen">
			<Result
				title="Please Verify Your Email"
				subTitle="We sent a confirmation link on your email address"
			/>
		</div>
	);
};

export default Verifying;
