import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Checkbox, Space } from "antd";
import { STRINGS, SvgSpinner } from "../../../../../utils/base";
import { ShopOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";
import TextInput from "../../../../sharedComponents/Input/TextInput";
import CountryPhoneInput from "../../../../sharedComponents/Input/CountryPhoneInput";
import Select from "../../../../sharedComponents/Select/Select";
import { useDispatch, useSelector } from "react-redux";
import { clearState } from "../../store/slice";
import { signup, getDesignation } from "../../store/actions";
import { Form } from "antd";
import PasswordInput from "../../../../sharedComponents/Input/PasswordInput";
import SingleUpload from "../../../../sharedComponents/Upload/singleUpload";

let formData = {};

function Signup() {
  const [localState, setlocalState] = useState({
    disableFormSubmit: false,
    dialogMessage: "",
    openView: false,
    path: "",
    error: [],
  });

  let rules = [
    {
      required: true,
      message: "This field is required",
    },
  ];

  const [file, setFile] = useState(null);

  const dispatch = useDispatch();

  const { designations, isError, isSuccess, loader } = useSelector(
    (state) => state.authSlice
  );
  const { loader: imageLoader } = useSelector((state) => state.sharedSlice);
  const [profileImage, setProfileImage] = useState(null);

  const [reset, setReset] = useState(false);

  useEffect(() => {
    dispatch(getDesignation());
  }, []);

  useEffect(() => {
    if (isError) {
      dispatch(clearState());
      setReset(true);
    }
    if (isSuccess) {
      dispatch(clearState());
    }
  }, [isError, isSuccess]);

  const handleSignUpSubmit = (values) => {

    let image = {
      id: STRINGS.DEFAULTS.guid,
      file: profileImage && profileImage[0]?.originFileObj,
    };

    if (Object.keys(image).length > 0) {
      let payload = { ...values, image };
      dispatch(signup(payload));
    } else {
      dispatch(signup(values));
    }
    
  };


  const onChange = (value, name) => {
    formData = { ...formData, [name]: value };
  };

  const handleImageUpload = (data) => {
    setProfileImage(data);
  };

  return (
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
              <div className="row-cl-1" style={{ width: "60%" }}>
                <Form.Item area="true">
                  <SingleUpload
                    handleImageUpload={handleImageUpload}
                    img="Add Image"
                    position="flex-start"
                    uploadText={"Upload"}
                  />
                </Form.Item>
              </div>

              <div className="row-cl-2">
                <div className="row-cl-2-heading1">Sign Up</div>
                <div className="row-cl-2-heading2">
                  You’re signing up as an organization.
                </div>
              </div>
            </div>
            <Space direction="vertical" size={8} style={{ width: "100%" }}>
              <Form.Item name="title" rules={rules}>
                <TextInput
                  type="text"
                  placeholder="Business Title"
                  prefix={ShopOutlined}
                  size="large"
                  reset={reset}
                />
              </Form.Item>
              <div className="inp-flex-row small-sign-up-form">
                <Space
                  direction="horizontal"
                  size={8}
                  style={{ width: "100%" }}
                >
                  <Form.Item name="firstName" rules={rules}>
                    <TextInput
                      type="text"
                      placeholder="First Name"
                      size="large"
                      reset={reset}
                    />
                  </Form.Item>
                  <Form.Item name="lastName" rules={rules}>
                    <TextInput
                      type="text"
                      placeholder="Last Name"
                      // prefix={ShopOutlined}
                      size="large"
                      reset={reset}
                    />
                  </Form.Item>
                </Space>
              </div>
              <Form.Item name="phoneNo">
                <div className="row country-phone-number">
                  <CountryPhoneInput
                    country="pk"
                    placeholder="Enter your Phone Number"
                    onChange={onChange}
                    reset={reset}
                  />
                </div>
              </Form.Item>
              <Form.Item name="email" rules={rules}>
                <TextInput
                  type="email"
                  placeholder="Email"
                  prefix={MailOutlined}
                  size="large"
                  reset={reset}
                />
              </Form.Item>
              <Form.Item name="businessEmail" rules={rules}>
                <TextInput
                  type="email"
                  placeholder="Business Email"
                  prefix={MailOutlined}
                  size="large"
                  reset={reset}
                />
              </Form.Item>
              {/* <Form.Item name="planTypeId" rules={rules}>
                <Select
                  data={[
                    { id: 1, name: "basic" },
                    { id: 2, name: "standard" },
                    { id: 3, name: "premium" },
                  ]}
                  placeholder="Plans"
                  style={{
                    width: "100%",
                    borderRadius: "5px",
                  }}
                  size="large"
                  reset={reset}
                />
              </Form.Item> */}
              {/* <Form.Item name="designationId" rules={rules}>
                <Select
                  data={designations}
                  value={"3fa85f64-5717-4562-b3fc-2c963f66afa6"}
                  placeholder="Designtaion"
                  style={{
                    width: "100%",
                    borderRadius: "5px",
                  }}
                  size="large"
                  reset={reset}
                />
              </Form.Item> */}
              {/* <Form.Item name="password" rules={rules}>
                <PasswordInput
                  placeholder="Password"
                  prefix={LockOutlined}
                  size="large"
                  reset={reset}
                />
              </Form.Item> */}
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

      {localState.error &&
        localState.error.map((error) => {
          return <p>{error.message}</p>;
        })}
      <div className="form-footer">
        <div className="sub-btn">
          <button
            className={`button ${imageLoader || loader ? "disable" : ""}`}
          >
            Sign Up
            {!imageLoader && !loader ? (
              <span className="icon-login">
                <i className="ic-login_icon" />
              </span>
            ) : (
              <SvgSpinner />
            )}
          </button>
        </div>
        <div className="already-acc">
          <p className="p">Already have an acount?&nbsp;</p>
          <NavLink
            id="login_btn"
            className="a"
            to={STRINGS.ROUTES.AUTH.SIGN_IN}
          >
            Login
          </NavLink>
        </div>
      </div>
    </Form>
  );
}

export default Signup;
