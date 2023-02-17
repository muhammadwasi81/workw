import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Checkbox, Space } from "antd";
import { STRINGS, SvgSpinner } from "../../../../../../utils/base";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import TextInput from "../../../../../sharedComponents/Input/TextInput";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "antd";

let formData = {};

function Signup() {
  let rules = [
    {
      required: true,
      message: "This field is required",
    },
  ];

  return (
    <Form
      //   onFinish={handleSignUpSubmit}
      name="nest-messages"
      id="form"
      className="form small-sign-up-form"
    >
      <div className="form-section small-sign-up-form">
        {
          <div className="input-group">
            <div className="row-header">
              <div className="row-cl-2">
                <div className="row-cl-2-heading1">Register</div>
                <div className="row-cl-2-heading2">
                  You’re signing up as a External Project.
                </div>
              </div>
            </div>
            <Space direction="vertical" size={8} style={{ width: "100%" }}>
              <Form.Item name="text">
                <TextInput
                  type="text"
                  placeholder="Enter Email"
                  size="large"
                  disabled={true}
                  prefix={MailOutlined}
                />
              </Form.Item>
              <Form.Item name="text">
                <TextInput
                  type="password"
                  placeholder="Enter Password"
                  size="large"
                  prefix={LockOutlined}
                />
              </Form.Item>

              <div className="agreement small-sign-up-form small-sign-up-form-agreement">
                <Form.Item name="agree" valuePropName="checked">
                  <Checkbox>
                    <span className="terms-and-conditions">
                      I agree the terms and conditions.
                    </span>
                  </Checkbox>
                </Form.Item>
              </div>
            </Space>
          </div>
        }
      </div>

      <div className="form-footer">
        <div className="sub-btn">
          <button
          // className={`button ${imageLoader || loader ? "disable" : ""}`}
          >
            Register
            {/* {!imageLoader && !loader ? ( */}
            <span className="icon-login">
              <i className="ic-login_icon" />
            </span>
            {/* ) : (
              <SvgSpinner />
            )} */}
          </button>
        </div>
      </div>
    </Form>
  );
}

export default Signup;
