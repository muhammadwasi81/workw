import { Col, Row } from "antd";
import ClockIcon from "../icons/clock.jpg";
import groupIcon from "../icons/group.png";
import "./styles.css";
import { Link } from "react-router-dom";

const CorporateSolution = () => {
  return (
    <section>
      <Row gutter={{ xs: 0, sm: 0, lg: 24 }} className="main-landing-row">
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
          <img src={ClockIcon} alt="clock icon" className="w-10 h-10" />
          <h1 className="text-primary-color capitalize main__head">
            A corporate
            <br />
            Social Solution
          </h1>
          <p className="font-semibold">
            Having every thing in the same place yet enhancing the operational
            efficiency, managing time more effectively and bring the employees
            at one table for bringing the right information at right time
          </p>
          <Link to="/register" onClick={() => window.scrollTo(0, 0)}>
            <button className="getStarted__btn">Get Started</button>
          </Link>
        </Col>
        <Col
          xs={24}
          sm={24}
          md={12}
          lg={12}
          xl={12}
          className="mt-20"
          data-aos="fade-left"
          data-aos-offset="300"
          data-aos-easing="ease-in-sine"
        >
          <img src={groupIcon} alt="group icon" />
        </Col>
      </Row>
      <div className="workers__section">
        <Row gutter={{ xs: 0, sm: 0, lg: 24 }} className="main-landing-row">
          <Col sm={24} md={24} lg={24} xl={24}>
            <p
              className="pt-10 bottom__text"
              data-aos="fade-right"
              data-aos-offset="300"
              data-aos-easing="ease-in-sine"
            >
              “Most workers toggle between apps 10 times an hour which <br />
              equates to 32 days lost in work place productivity.”
            </p>
            <span className="published__text">published by Forbes.com</span>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default CorporateSolution;
