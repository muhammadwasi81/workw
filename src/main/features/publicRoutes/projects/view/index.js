import React from "react";
import { Navigate } from "react-router-dom";
import { Col, Row } from "antd";
import { ROUTES } from "../../../../../utils/routes";
import { useSelector } from "react-redux";
import MainBannerContent from "./ExternalPageContent/MainBannerContent";
import Signup from "./signup/Signup";
import { LoadingOutlined } from "@ant-design/icons";

export const ExternalProject = () => {
  const { verificationSuccess, verificationLoader } = useSelector(
    (state) => state.projectExternalSlice
  );
  return (
    <>
      {/* {verificationLoader ? (
        <div className="loaderBody">
          <LoadingOutlined className="verificationLoader" />
        </div>
      ) : verificationSuccess ? ( */}
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
              <Signup />
            </div>
          </Col>
        </Row>
      </div>
      {/* ) : (
        <div style={{ width: "100%" }} className="verificationScreen"></div>
      )} */}
    </>
  );
};
