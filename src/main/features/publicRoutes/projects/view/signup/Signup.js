import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Checkbox, Space } from "antd";
import { STRINGS, SvgSpinner } from "../../../../../../utils/base";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import TextInput from "../../../../../sharedComponents/Input/TextInput";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "antd";
import {
  getVerifyProjectExternalMember,
  setNewPassword,
} from "../../store/action";
import PasswordInput from "../../../../../sharedComponents/Input/PasswordInput";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../../../auth/store/actions";
import { getFirebaseToken } from "../../../../../../firebase/initFirebase";

function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const id = useLocation();
  const usertoken = id.search.split("=");
  const stoken = usertoken[1];
  const [reset, setReset] = useState(false);

  let rules = [
    {
      required: true,
      message: "This field is required",
    },
  ];
  const { successPassword } = useSelector(
    (state) => state.projectExternalSlice
  );
  console.log(successPassword, "succcc");

  const handleSignUpSubmit = async (values) => {
    let payload = {
      token: stoken,
      password: values.password,
    };
    dispatch(setNewPassword(payload));

    // navigate("/");
  };
  // useEffect(() => {
  //   if (token) {
  //   }
  // }, [token]);
  return (
    <>
      <Form
        onFinish={handleSignUpSubmit}
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
                <Form.Item name="email">
                  <TextInput
                    type="email"
                    placeholder="Enter Email"
                    size="large"
                    disabled={false}
                    prefix={MailOutlined}
                  />
                </Form.Item>
                <Form.Item name="firstName" rules={rules}>
                  <TextInput
                    type="text"
                    placeholder="First Name"
                    size="large"
                    // reset={reset}
                  />
                </Form.Item>
                <Form.Item name="lastName" rules={rules}>
                  <TextInput
                    type="text"
                    placeholder="Last Name"
                    // prefix={ShopOutlined}
                    size="large"
                    // reset={reset}
                  />
                </Form.Item>
                <Form.Item name="password">
                  <PasswordInput
                    placeholder="Password"
                    prefix={LockOutlined}
                    size="large"
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
    </>
  );
}

export default Signup;
