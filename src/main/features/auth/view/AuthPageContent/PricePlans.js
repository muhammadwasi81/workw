import React from "react";
import { Button, Col, Row } from "antd";

function PricePlans() {
  return (
    <div>
      <h1
        style={{
          textAlign: "center",
          fontWeight: "bold",
          margin: "0px",
          color: "var(--currentThemeColor)",
          marginTop: "20px",
        }}
      >
        Choose the best plan for you
      </h1>
      <h5
        style={{
          textAlign: "center",
          fontWeight: "bold",
          marginBottom: "20px",
        }}
      >
        Flexible options to suit any bussines
      </h5>

      <div className="price-card-container">
        <Row gutter={16} align="bottom">
          <Col xs={24} sm={8} lg={8}>
            <div className="basic-price-card">
              <h3 className="price-card-heading ">Basic</h3>
              <h1 className="price-card-price">10$</h1>

              <ul className="list-ic vertical">
                <li>
                  <span></span>
                  <label style={{ marginLeft: "5px", fontSize: "10px" }}>
                    Create a services site 2015-09-01
                  </label>
                </li>
                <li>
                  <span></span>
                  <label style={{ marginLeft: "5px", fontSize: "10px" }}>
                    Create a services site 2015-09-01
                  </label>
                </li>
                <li>
                  <span></span>
                  <label style={{ marginLeft: "5px", fontSize: "10px" }}>
                    Create a services site 2015-09-01
                  </label>
                </li>
                <li>
                  <span></span>
                  <label style={{ marginLeft: "5px", fontSize: "10px" }}>
                    Create a services site 2015-09-01
                  </label>
                </li>
              </ul>

              <Button
                type="primary"
                style={{
                  borderRadius: "5px",
                  fontWeight: "bold",
                  color: "white",
                  backgroundColor: "var(--currentThemeColor)",
                }}
                block
              >
                Select
              </Button>
            </div>
          </Col>
          <Col xs={24} sm={8} lg={8}>
            <div
              className="basic-price-card"
              style={{
                backgroundColor: "var(--currentThemeColor)",
                color: "white",
              }}
            >
              <h3
                className="price-card-heading "
                style={{ marginBottom: "20px", color: "white" }}
              >
                Standard
              </h3>
              <h1
                className="price-card-price"
                style={{ marginBottom: "20px", color: "white" }}
              >
                50$
              </h1>

              <ul className="list-ic vertical">
                <li>
                  <span></span>
                  <label style={{ marginLeft: "5px", fontSize: "10px" }}>
                    Create a services site 2015-09-01
                  </label>
                </li>
                <li>
                  <span></span>
                  <label style={{ marginLeft: "5px", fontSize: "10px" }}>
                    Create a services site 2015-09-01
                  </label>
                </li>
                <li>
                  <span></span>
                  <label style={{ marginLeft: "5px", fontSize: "10px" }}>
                    Create a services site 2015-09-01
                  </label>
                </li>
                <li>
                  <span></span>
                  <label style={{ marginLeft: "5px", fontSize: "10px" }}>
                    Create a services site 2015-09-01
                  </label>
                </li>
              </ul>

              <Button
                style={{
                  borderRadius: "5px",
                  fontWeight: "bold",
                  color: "var(--currentThemeColor)",
                }}
                block
              >
                Select
              </Button>
            </div>
          </Col>
          <Col xs={24} sm={8} lg={8}>
            <div className="basic-price-card">
              <h3 className="price-card-heading">Premium</h3>
              <h1 className="price-card-price">65$</h1>

              <ul className="list-ic vertical">
                <li>
                  <span></span>
                  <label style={{ marginLeft: "5px", fontSize: "10px" }}>
                    Create a services site 2015-09-01
                  </label>
                </li>
                <li>
                  <span></span>
                  <label style={{ marginLeft: "5px", fontSize: "10px" }}>
                    Create a services site 2015-09-01
                  </label>
                </li>
                <li>
                  <span></span>
                  <label style={{ marginLeft: "5px", fontSize: "10px" }}>
                    Create a services site 2015-09-01
                  </label>
                </li>
                <li>
                  <span></span>
                  <label style={{ marginLeft: "5px", fontSize: "10px" }}>
                    Create a services site 2015-09-01
                  </label>
                </li>
              </ul>

              <Button
                style={{
                  borderRadius: "5px",
                  fontWeight: "bold",
                  color: "white",
                  backgroundColor: "var(--currentThemeColor)",
                }}
                block
              >
                Select
              </Button>
            </div>
          </Col>
        </Row>

        <div className="standard-price-card" />
        <div className="premium-price-card" />
      </div>
    </div>
  );
}

export default PricePlans;
