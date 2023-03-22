import React, { useEffect } from "react";
import { Result } from "antd";
import { useDispatch } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { verification } from "../../store/actions";
import "../styles/style.css";
// import { STRINGS } from "../../../../../utils/base";
import { ROUTES } from "../../../../../utils/routes";
import { useSelector } from "react-redux";
import {
	LoadingOutlined
  } from '@ant-design/icons';

const Verified = () => {
	const { verificationSuccess, verificationLoader } = useSelector((state) => state.authSlice);
	const id = useLocation();
	const dispatch = useDispatch();
	const stoken = id.search.split("=");
	console.log(stoken[1], "Token");

	useEffect(() => {
		if (stoken[1]) {
			dispatch(verification(stoken[1]));
		}
	}, [stoken[1]]);

	return (
		<>
			{ verificationLoader ? 
			<div className="loaderBody">
				<LoadingOutlined className="verificationLoader"/>
			</div> : verificationSuccess ? (
				<div style={{ width: "100%" }} className="verificationScreen">
					<Result
						status="success"
						title="Thank You!"
						extra={[
							<p>
								Your email has been verified wait for the approval process{" "}
								{/* <a href={`${ROUTES.ROOT}`}> login </a> */}
							</p>,
						]}
					/>
				</div>
			) : (
				<div style={{ width: "100%" }} className="verificationScreen">
					{/* <Result
						title="You don't have valid token"
						subTitle="May be token already exist"
					/> */}
				</div>
			)}
		</>
	);
};

export default Verified;