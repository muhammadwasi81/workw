import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import "../styles/style.css";
import SignUp from "./signup";
import PricePlans from "../AuthPageContent/PricePlans";
import { Col, Row } from "antd";
// import { STRINGS } from "../../../../../utils/base";
import { ROUTES } from "../../../../../utils/routes";
import MainBannerContent from "../AuthPageContent/MainBannerContent";
import LandingMainPage from "./../../../landingpage/index";
import { moduleImages } from "../../../landingpage/solution-tools/constants";

export default class OrganizationalSignup extends Component {
  constructor(props) {
    super(props);
    this.landingRef = React.createRef();
    this.handleAnimateClick = this.handleAnimateClick.bind(this);
  }
  handleAnimateClick() {
    this.landingRef.current.scrollIntoView({
      behavior: "smooth",
    });
  }
  componentDidMount() {
    console.log(window.location.href, "location", this.props.location);
  }
  render() {
    const { isLoggedIn } = this.props;
    // const isLoggedIn = !!localStorage.getItem(STRINGS.STORAGE.token);

    if (isLoggedIn) {
      return <Navigate to={ROUTES.ROOT} />;
    }
    return (
      <div className="lg-area">
        {/* <div className="lg-area-color-layer" /> */}
        <Row gutter={{ xs: 0, sm: 0, lg: 24 }} className="main-landing-row">
          <Col
            className="signUpFirstColumn"
            xs={{ order: 2, span: 24 }}
            sm={{ order: 2, span: 24 }}
            lg={{ order: 1, span: 15 }}
          >
            {/* <PricePlans /> */}
            <MainBannerContent />
          </Col>
          <Col
            xs={{ order: 1, span: 24 }}
            sm={{ order: 1, span: 24 }}
            lg={{ order: 2, span: 9 }}
          >
            <div className="center-area">
              <SignUp />
            </div>
            <div className="flex justify-center mt-5 gap-3">
              <a href="" target="_blank">
                <img
                  src="https://uploads-ssl.webflow.com/5eb0899d8fc87851be175c44/611a5d2e71739c07c6a30399_g-play.svg"
                  loading="lazy"
                  width="150"
                  alt="google play store"
                />
              </a>
              <a href="" target="_blank">
                <img
                  src="https://linkmaker.itunes.apple.com/assets/shared/badges/en-us/appstore-lrg.svg"
                  alt="Download on the App Store"
                  loading="lazy"
                  width="150"
                />
              </a>
            </div>
          </Col>
        </Row>
        <div
          className="flex justify-center p-4 module__card hide__card"
          style={{ marginTop: "50px" }}
        >
          {moduleImages.map((image) => (
            <img
              key={image.id}
              src={image.url}
              alt={image.title}
              className="h-6 mx-2"
            />
          ))}
        </div>
        <div class="scroll-down" onClick={this.handleAnimateClick}>
          <div class="mouse">
            <div class="wheel"></div>
          </div>
        </div>
        {/* landing page components */}
        <div ref={this.landingRef}>
          <LandingMainPage />
        </div>
      </div>
    );
  }
}
