import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Col, Row, Skeleton } from "antd";
import { ROUTES } from "../../../../../utils/routes";
import { useSelector, useDispatch } from "react-redux";
import MainBannerContent from "./ExternalPageContent/MainBannerContent";
import Signup from "./signup/Signup";
import { LoadingOutlined } from "@ant-design/icons";
import { getVerifyProjectExternalMember } from "../store/action";

export const ExternalProject = () => {
  const dispatch = useDispatch();
  const { verificationSuccess, verificationLoader } = useSelector(
    (state) => state.projectExternalSlice
  );
  console.log(verificationLoader);
  const id = useLocation();
  const usertoken = id.search.split("=");
  const stoken = usertoken[1];
  const [reset, setReset] = useState(false);

  useEffect(() => {
    if (stoken) dispatch(getVerifyProjectExternalMember(stoken));
  }, [stoken]);
  return (
    <>
      {verificationLoader ? (
        <div className="loaderBody">
          <LoadingOutlined className="verificationLoader" />
        </div>
      ) : (
        <dv className="lg-area">
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
        </dv>
      )}
    </>
  );
};
