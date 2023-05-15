import React, { useRef } from "react";
import { Navigate } from "react-router-dom";
import "./styles/style.css";
import SignIn from "./signIn/signin";
import MainBannerContent from "./AuthPageContent/MainBannerContent";
import { Col, Row } from "antd";
import { ROUTES } from "../../../../utils/routes";
import { useSelector } from "react-redux";
import "./styles/style.css";
import LandingMainPage from "../../landingpage";
// import appleImg from "../../landingpage/icons/apple.png";
// import googleImg from "../../landingpage/icons/googleplay.png";
import { FaGooglePlay, FaAppStoreIos } from "react-icons/fa";
import { moduleImages } from "../../landingpage/solution-tools/constants";

const Auth = () => {
  const landingRef = useRef(null);

  const handleAnimateClick = () => {
    landingRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const { token } = useSelector((state) => state.userSlice);
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
            <SignIn />
          </div>
          <div className="flex flex-wrap md:flex-nowrap justify-center p-4 module__card">
            {moduleImages.map((image) => (
              <img
                key={image.id}
                src={image.url}
                alt={image.title}
                className="h-6 mx-2"
              />
            ))}
          </div>
        </Col>
      </Row>
      <div class="scroll-down" onClick={handleAnimateClick}>
        <div class="mouse">
          <div class="wheel"></div>
        </div>
      </div>

      <div ref={landingRef}>
        <LandingMainPage />
      </div>
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
