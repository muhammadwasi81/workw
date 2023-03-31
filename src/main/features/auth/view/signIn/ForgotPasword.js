// import React from "react";
// import MainBannerContent from "../AuthPageContent/MainBannerContent";
// import ForgotComponent from "./ForgotComponent";

// const ForgotPasword = () => {
//   return (
//     <div>
//       <MainBannerContent />
//       <ForgotComponent />
//     </div>
//   );
// };

// export default ForgotPasword;
import React from "react";
import ForgotComponent from "./ForgotComponent";
import MainBannerContent from "../AuthPageContent/MainBannerContent";
import { Col, Row } from "antd";

import "../styles/style.css";

const ForgotPasword = () => {
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
            <ForgotComponent />
          </div>
        </Col>
      </Row>
    </div>
  );
};
export default ForgotPasword;
