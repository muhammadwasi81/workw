import React from "react";
import { Navigate } from "react-router-dom";
import "./styles/style.css";
import SignIn from "./signIn/signin";
import MainBannerContent from "./AuthPageContent/MainBannerContent";
import { Col, Row } from "antd";
// import { STRINGS } from "../../../../utils/base";
import { ROUTES } from "../../../../utils/routes";
import { useSelector } from "react-redux";

const Auth = () => {
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
					xs={{ order: 2, span: 24 }}
					sm={{ order: 1, span: 12 }}
					lg={{ order: 1, span: 12 }}
				>
					<MainBannerContent />
				</Col>
				<Col
					xs={{ order: 1, span: 24 }}
					sm={{ order: 2, span: 12 }}
					lg={{ order: 2, span: 12 }}
				>
					<div className="center-area">
						<SignIn />
					</div>
				</Col>
			</Row>
		</div>
	);
};
{
	/* <AuthFoooterContent/> */
}

{
	/* <a href="#down"
style={{
    zIndex: "5",
}}>
 <div style={{
     background: "linear-gradient(143deg, rgba(44,86,104,1) 7%, rgba(142,167,175,1) 100%)",
     width: "50px",
     height: "50px",
     borderRadius: "50%",
     marginBottom: "15px",
     alignItems: "center",
     justifyContent: "center",
     textAlign: "center",
     zIndex: "1"

 }}
 >


     <img style={{
         width: "30px",
         marginTop: "18px"
     }} src={ArrowImg} alt="arrowImg"/>
 </div>
</a> */
}

export default Auth;
