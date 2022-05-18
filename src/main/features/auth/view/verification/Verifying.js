import React, { useEffect } from "react";
import { Result } from "antd";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { verification } from "../../store/actions";
import "../styles/style.css";
// import { STRINGS } from "../../../../../utils/base";
import { ROUTES } from "../../../../../utils/routes";

const Verifying = () => {
	const id = useLocation();
	console.log(id, "location adsda");
	const dispatch = useDispatch();
	const stoken = id.search.split("=");

	console.log(stoken[1], "Token");

	useEffect(() => {
		if (stoken[1]) {
			dispatch(verification(stoken[1]));
		} else {
			alert("token not found");
		}
	}, [stoken[1]]);

	return (
		<div style={{ width: "100%" }} className="verificationScreen">
			{stoken[1] ? (
				<>
					<Result
						status="success"
						title="Thank You!"
						extra={[
							<p>
								We verified your email, you can now{" "}
								<a href={`${ROUTES.ROOT}`}> login </a>
							</p>,
						]}
					/>
				</>
			) : (
				<>
					<Result
						title="Please Verify Your Email"
						subTitle="We sent a confirmation link on your email address"
					/>
				</>
			)}
		</div>
	);
};

export default Verifying;
