import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import "../styles/style.css";
import SignUp from "./signup";
import PricePlans from "../AuthPageContent/PricePlans";
import { Col, Row } from "antd";
import { STRINGS } from "../../../../../utils/base";

export default class OrganizationalSignup extends Component {
	componentDidMount() {
		console.log(window.location.href, "location", this.props.location);
	}

	render() {
		const isLoggedIn = !!localStorage.getItem(STRINGS.STORAGE.token);

		if (isLoggedIn) {
			return <Navigate to={STRINGS.ROUTES.ROOT} />;
		}
		return (
			<div className="lg-area">
				{/* <div className="lg-area-color-layer" /> */}
				<Row
					gutter={{ xs: 0, sm: 0, lg: 24 }}
					className="main-landing-row"
				>
					<Col
						xs={{ order: 2, span: 24 }}
						sm={{ order: 2, span: 24 }}
						lg={{ order: 1, span: 15 }}
					>
						<PricePlans />
					</Col>
					<Col
						xs={{ order: 1, span: 24 }}
						sm={{ order: 1, span: 24 }}
						lg={{ order: 2, span: 9 }}
					>
						<div className="center-area">
							<SignUp />
						</div>
					</Col>
				</Row>
			</div>
		);
	}
}
