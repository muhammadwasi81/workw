import { Col, Row } from "antd";
import ClockIcon from "../icons/clock.jpg";
import groupIcon from "../icons/group.png";
import { FaLongArrowAltRight } from "react-icons/fa";
import { FaLongArrowAltLeft } from "react-icons/fa";
import "./styles.css";

const CorporateSolution = () => {
  return (
    <section>
      <Row gutter={{ xs: 0, sm: 0, lg: 24 }} className="main-landing-row">
        <Col xs={24} sm={24} md={24} lg={24} xl={24} className="pt-10">
          <img src={ClockIcon} alt="clock icon" className="w-10 h-10" />
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <h1 className="text-primary-color main__head">
            A corporate
            <br />
            Social Solution
          </h1>
          <p className="font-semibold">
            Having every thing in the same place yet enhancing the operational
            efficiency, managing time more effectively and bring the employees
            at one table for bringing the right information at right time
          </p>
          <button className="getStarted__btn">Get Started</button>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12} className="mt-20">
          <img src={groupIcon} alt="group icon" />
        </Col>
      </Row>
      <div className="workers__section">
        <Row gutter={{ xs: 0, sm: 0, lg: 24 }} className="main-landing-row">
          <Col sm={24} md={24} lg={24} xl={24}>
            <p className="pt-10 bottom__text">
              “Most workers toggle between apps 10 times an hour which <br />
              equates to 32 days lost in work place productivity.”
            </p>
            <span className="published__text">
              <a
                href="https://www.forbes.com/sites/forbestechcouncil/2020/02/03/why-2020-is-the-year-of-the-integrated-workplace-app/?sh=3b5b1b7b6b6a"
                target="_blank"
                className="cursor-pointer hover:underline"
                rel="noreferrer"
              >
                published by Forbes.com
              </a>
            </span>
            <div className="flex gap-5">
              <FaLongArrowAltRight className="left__icon" />
              <FaLongArrowAltLeft className="right__icon" />
            </div>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default CorporateSolution;
