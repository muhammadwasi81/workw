import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import "../styles/style.css";
import IndividualSignIn from "./OrganizationalSignup";
import ArrowImg from "../../../../../content/png/arrow.png";
// import AuthFoooterContent from './AuthPageContent/AuthFoooterContent';
// import MainBannerContent from './AuthPageContent/MainBannerContent';
import { STRINGS } from "../../../../../utils/base";

export default class IndivisualSignup extends Component {
	componentDidMount() {
		console.log(window.location.href, "location", this.props.location);
	}

	render() {
		const isLoggedIn = !!localStorage.getItem(STRINGS.STORAGE.token);

		if (isLoggedIn) {
			return <Navigate to={STRINGS.ROUTES.ROOT} />;
		}
		return (
			<div className="lgBox">
				<div className="lg-area">
					<div className="lg-area-color-layer" />
					{/* <MainBannerContent/> */}
					<div
						style={{
							// flex: 1,
							height: "100%",
							display: "flex",
							alignItems: "flex-end",
							justifyContent: "center",
						}}
						className="middleDiv"
					>
						<a
							href="#down"
							style={{
								zIndex: "5",
							}}
						>
							<div
								style={{
									background:
										"linear-gradient(143deg, rgba(44,86,104,1) 7%, rgba(142,167,175,1) 100%)",
									width: "50px",
									height: "50px",
									borderRadius: "50%",
									marginBottom: "15px",
									alignItems: "center",
									justifyContent: "center",
									textAlign: "center",
									zIndex: "1",
								}}
							>
								<img
									style={{
										width: "30px",
										marginTop: "18px",
									}}
									src={ArrowImg}
									alt="arrowImg"
								/>
							</div>
						</a>
					</div>

					<div className="center-area">
						<IndividualSignIn />
					</div>
				</div>

				{/* <AuthFoooterContent/> */}
			</div>
		);
	}
}
