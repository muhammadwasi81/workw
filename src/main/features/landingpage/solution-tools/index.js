import { Col, Row } from "antd";
import CompIcon from "../icons/comp.png";
import userCompAvatar from "../icons/usercomp.png";
import {
  Services,
  cardsData,
  companyFeel,
  marketPlace,
  moduleImages,
  registerText,
  solutionAvailability,
  solutionTools,
  subjectMotive,
  userFeedback,
  whatMakesDifferent,
} from "./constants";
import "../coprorate-solution/styles.css";
import RectangleImg from "../icons/rec.png";
import handImg from "../icons/hand.png";
import commaImg from "../icons/comma.png";
import bottomCommaImg from "../icons/bottomComma.png";
import keyImg from "../icons/key.png";
import waveImg from "../icons/wave.png";
import { AiOutlineInstagram } from "react-icons/ai";
import { FaFacebookF } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import workWiseLogo from "../../../../content/blackLogo.svg";
import { Link } from "react-router-dom";

const SolutionTools = () => {
  return (
    <section>
      <Row gutter={{ xs: 0, sm: 0, lg: 24 }} className="main-landing-row">
        <Col
          xs={24}
          sm={24}
          md={16}
          lg={16}
          xl={16}
          data-aos="fade-right"
          data-aos-offset="300"
          data-aos-easing="ease-in-sine"
        >
          <h1 className="text-primary-color main__head">The Solution</h1>
          <p className="font-semibold solution__text">{Services.description}</p>
        </Col>
        <Col
          xs={24}
          sm={24}
          md={8}
          lg={8}
          xl={8}
          className="mt-10"
          data-aos="fade-left"
          data-aos-offset="300"
          data-aos-easing="ease-in-sine"
        >
          <img src={CompIcon} alt="group icon" className="w-52 h-52" />
        </Col>
        {/* TODO: 2ND GRID */}
        <Col
          xs={24}
          sm={24}
          md={12}
          lg={12}
          xl={12}
          className="mt-10 pb-8"
          data-aos="fade-up"
          data-aos-offset="300"
          data-aos-easing="ease-in-sine"
        >
          <img
            src={userCompAvatar}
            alt="group icon"
            className="userComp__img"
          />
        </Col>
        <Col
          xs={24}
          sm={24}
          md={12}
          lg={12}
          xl={12}
          data-aos="fade-right"
          data-aos-offset="300"
          data-aos-easing="ease-in-sine"
        >
          <h1 className="text-primary-color main__head">Solution Tools</h1>
          <ul className="list-disc">
            {solutionTools.map((tool) => (
              <li key={tool.id}>{tool.description}</li>
            ))}
          </ul>
        </Col>
        {/* TODO: 3RD SECTION */}
        <Col
          xs={24}
          sm={24}
          md={16}
          lg={16}
          xl={16}
          className="pb-8"
          data-aos="fade-right"
          data-aos-offset="300"
          data-aos-easing="ease-in-sine"
        >
          <h1 className="text-primary-color main__head">
            Solution Availability
          </h1>
          <p className="font-semibold solution__text">
            {solutionAvailability.description}
          </p>
        </Col>
        <Col
          xs={24}
          sm={24}
          md={8}
          lg={8}
          xl={8}
          className="mt-10 relative"
          data-aos="fade-left"
          data-aos-offset="300"
          data-aos-easing="ease-in-sine"
        >
          <div className="absolute hand__container">
            <img src={handImg} alt="group icon" className="w-52 h-52" />
          </div>
          <img src={RectangleImg} alt="group icon" className="w-52 h-52" />
        </Col>
        {/* TODO: 4TH SECTION */}
        <Col
          xs={24}
          sm={24}
          md={12}
          lg={12}
          xl={12}
          data-aos="fade-right"
          data-aos-offset="300"
          data-aos-easing="ease-in-sine"
        >
          <img
            src={userCompAvatar}
            alt="group icon"
            className="userComp__img"
          />
        </Col>
        <Col
          xs={24}
          sm={24}
          md={12}
          lg={12}
          xl={12}
          data-aos="fade-left"
          data-aos-offset="300"
          data-aos-easing="ease-in-sine"
        >
          <h1 className="text-primary-color main__head">Market Place</h1>
          <p className="font-semibold">{marketPlace.description}</p>
        </Col>
        <div
          className="flex flex-wrap justify-center m-auto"
          data-aos="fade-right"
          data-aos-offset="300"
          data-aos-easing="ease-in-sine"
        >
          <h1 className="text-primary-color companyDesc__head">
            {companyFeel.description}
          </h1>
        </div>
      </Row>
      {/* <div className="flex flex-wrap md:flex-nowrap justify-center p-4 module__card">
        {moduleImages.map((image) => (
          <img
            key={image.id}
            src={image.url}
            alt={image.title}
            className="h-6 mx-2"
          />
        ))}
      </div> */}
      <h1 className="text-primary-color text-center font-semibold text-2xl mt-10">
        Main Subject Motive
      </h1>
      <div className="subject__wrapper">
        <p
          className="text-base font-bold"
          data-aos="fade-right"
          data-aos-offset="300"
          data-aos-easing="ease-in-sine"
        >
          {subjectMotive.description}
        </p>
      </div>
      <Row
        gutter={{ xs: 0, sm: 0, lg: 24 }}
        className="main-landing-row"
        data-aos="fade-up"
        data-aos-offset="300"
        data-aos-easing="ease-in-sine"
      >
        {cardsData.map((card) => (
          <Col key={card.id} sm={24} lg={8} md={6} xl={8} xs={24}>
            <img src={card.image} alt={card.title} className="h-8 mx-2" />
            <h1 className="text-primary-color text-start font-semibold text-2xl mt-4">
              {card.title}
            </h1>
            <p className="text-base font-bold mt-2">{card.description}</p>
          </Col>
        ))}
      </Row>
      <div className="whatMakes__section">
        <div
          className="diff__textWrapper"
          data-aos="fade-right"
          data-aos-offset="300"
          data-aos-easing="ease-in-sine"
        >
          <h1 className="text-primary-color text-center font-semibold text-2xl mt-10">
            What makes us different?
          </h1>
          <p className="font-semibold text-center text-[#757D86] diff__wrapper">
            {whatMakesDifferent.description}
          </p>
        </div>
        <div
          className="user__feedback"
          data-aos="fade-up"
          data-aos-offset="300"
          data-aos-easing="ease-in-sine"
        >
          <div className="comma__wrapper">
            <img src={commaImg} alt="comma-icon" className="comma__img" />
          </div>
          <div className="relative top-5">
            <span className="font-semibold text-black">
              {userFeedback.description}
            </span>
            <div className="user__name">{userFeedback.name}</div>
          </div>
          <div className="comma__bottom__wrapper">
            <img src={bottomCommaImg} alt="comma-icon" className="comma__img" />
          </div>
        </div>
        {/* unlock the power */}
        <Row
          gutter={{ xs: 0, sm: 0, lg: 24 }}
          className="main-landing-row"
          data-aos="fade-right"
          data-aos-offset="300"
          data-aos-easing="ease-in-sine"
        >
          <Col md={24} lg={24} xl={24}>
            <div className="unlock__wrapper pt-10">
              <h1 className="unlock__head text-[#495FA3]">
                Unlock The Power of <br /> Your Organization Now!
              </h1>
              <h6 className="font-bold text-black text-lg">
                Start your free trial now!
              </h6>
              <p className="font-bold text-gray-500 free__trail">
                {registerText.description}
              </p>
              <Link to="/register" onClick={() => window.scrollTo(0, 0)}>
                <button className="getStarted__btn">Free Trial</button>
              </Link>
            </div>
          </Col>
        </Row>
      </div>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} lg={12} xl={12} md={12}>
          <img src={waveImg} alt="keyImg" className="wave__img" />
        </Col>
        <Col xs={24} sm={24} lg={12} xl={12} md={12}>
          <img src={keyImg} alt="keyImg" />
        </Col>
      </Row>
      {/* footer */}
      <footer className="footer__wrapper py-5">
        <Row gutter={{ xs: 0, sm: 0, lg: 24 }} className="main-landing-row">
          <Col xs={24} sm={24} lg={12} xl={16} md={24}>
            <div className="flex flex-wrap gap-5 footer__logo">
              <img src={workWiseLogo} alt="group icon" className="w-28" />
              <p className="font-semibold text-primary-color mt-10">
                Work from anywhere the way it should be <br /> Easy – Effective
                - Efficient
              </p>
            </div>
            <div className="flex justify-start flex-wrap gap-5 my-3">
              <a href="" target="_blank">
                <img
                  src="https://uploads-ssl.webflow.com/5eb0899d8fc87851be175c44/611a5d2e71739c07c6a30399_g-play.svg"
                  loading="lazy"
                  width="120"
                  alt="google play store"
                />
              </a>
              <a href="" target="_blank">
                <img
                  src="https://linkmaker.itunes.apple.com/assets/shared/badges/en-us/appstore-lrg.svg"
                  alt="Download on the App Store"
                  loading="lazy"
                  width="120"
                />
              </a>
            </div>
          </Col>
          <Col
            xs={24}
            lg={8}
            md={24}
            className="text-primary-color font-semibold"
          >
            <a
              href="https://workw.com/"
              target="_blank"
              rel="noreferrer"
              className="text-primary-color font-semibold"
            >
              Workw
            </a>
            <br /> Terms & Conditions <br /> Privacy statement
            <div className="flex flex-wrap gap-3 text-xl pt-5 cursor-pointer icons__wrapper">
              <AiOutlineInstagram />
              <FaFacebookF />
              <FaLinkedinIn />
            </div>
          </Col>
        </Row>
      </footer>
      <p className="text-center font-semibold">
        Copyright © {new Date().getFullYear()} All rights reserved | Workwise
      </p>
    </section>
  );
};

export default SolutionTools;
