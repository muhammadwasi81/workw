import React, { useEffect, useState } from "react";
import systemLogo from "../../../../../content/systemLogo.png";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Form, Space } from "antd";
import TextInput from "../../../../sharedComponents/Input/TextInput";

import "../styles/style.css";
import { NavLink } from "react-router-dom";
import { ROUTES } from "../../../../../utils/routes";

function ForgotComponent() {
  return (
    <React.Fragment>
      <div className="">
        <img src={systemLogo} alt="#" className="mobileLogo" />
      </div>
      <Form className="lg-form">
        <div className="note note-heading">
          Enter email address to receive email to reset password
        </div>
        <div className="">
          <Space direction="vertical" size={16} style={{ width: "100%" }}>
            <Form.Item name="email">
              <TextInput
                type="email"
                placeholder="Email"
                prefix={UserOutlined}
                size="large"
              />
            </Form.Item>
          </Space>
        </div>
        <div className="btn">
          <button className="button">Send Email</button>
        </div>
        <NavLink className="btn mt-2" to={ROUTES.AUTH.SIGN_IN}>
          <b style={{ color: "#526bb1" }}> Login?</b>
        </NavLink>
      </Form>
    </React.Fragment>
  );
}

export default ForgotComponent;
