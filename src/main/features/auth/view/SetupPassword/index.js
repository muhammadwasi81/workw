import React from "react";
import { Navigate } from "react-router-dom";
import MainBannerContent from "../AuthPageContent/MainBannerContent";
import { Col, Row } from "antd";
import { ROUTES } from "../../../../../utils/routes";
import { useSelector } from "react-redux";
import "../styles/style.css"
import PasswordForm from "./setupPassword";

const SetupPassword = () => {
	const { token } = useSelector(state => state.userSlice);
	const isLoggedIn = !!token;
	if (isLoggedIn) {
		return <Navigate to={ROUTES.ROOT} />;
	}

	return (
		<div className="lg-area">
			<div className="lg-area-color-layer" />

			<Row gutter={{ xs: 0, sm: 0, lg: 24 }} className="main-landing-row">
				<Col
					className="SinginFirstColumn"
					xs={{ order: 2, span: 24 }}
					sm={{ order: 1, span: 12 }}
					lg={{ order: 1, span: 12 }}
				>
						<MainBannerContent />
				</Col>
				<Col
					className="FormColumn"
					xs={{ order: 1, span: 24 }}
					sm={{ order: 2, span: 12 }}
					lg={{ order: 2, span: 12 }}
				>
					<div className="center-area">
						<PasswordForm />
					</div>
				</Col>
			</Row>
		</div>
	);
};

export default SetupPassword;
