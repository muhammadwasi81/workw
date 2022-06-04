import React, { useEffect, useState } from "react";
// import Checkbox from "@material-ui/core/Checkbox";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
import { NavLink } from "react-router-dom";
import { message, Space } from "antd";
import { STRINGS, SvgSpinner } from "../../../../../utils/base";
import { ShopOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";
import TextInput from "../../../../../components/SharedComponent/Input/TextInput";
import CountryPhoneInput from "../../../../../components/SharedComponent/Input/CountryPhoneInput";
import Select from "../../../../../components/SharedComponent/Select/Select";
import ImageUpload from "./ImageUpload";
import { useDispatch, useSelector } from "react-redux";
import { clearState } from "../../store/slice";
import { signup, getDesignation } from "../../store/actions";
import { Form } from "antd";
import PasswordInput from "../../../../../components/SharedComponent/Input/PasswordInput";
import ImageReader from "../../../../sharedComponents/ImageReader/ImageReader";
import { uploadImage } from "../../../../../utils/Shared/store/actions";

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
  console.log("image", imageLoader);

  console.log("loadr", loader);
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

  const handleSignUpSubmit = (v) => {
    if (file === null) {
      let payload = { businessImageId: "", ...v };
      dispatch(signup(payload));
    } else {
      dispatch(uploadImage(formData.avatar)).then((x) => {
        if (x) {
          let signupData = {
            // businessImageId: x.payload[0].id && x.payload[0].id,
            businessImageId: x.payload.data[0].id,
            ...v,
          };
          // console.log(signupData, "signup new");
          dispatch(signup(signupData));
        } else {
          message.error("Image upload Error", 5);
        }
      });
    }
  };

  const onChange = (value, name) => {
    formData = { ...formData, [name]: value };
    console.log(formData, value, name);
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
              <div className="row-cl-1">
                {file == null ? (
                  <ImageUpload
                    onChange={(e) => {
                      formData = {
                        ...formData,
                        avatar: [e.target.files[0]],
                      };
                      setFile(e.target.files[0]);
                      e.target.value = "";
                    }}
                  />
                ) : (
                  <ImageReader
                    file={file}
                    showButton={true}
                    removeFile={() => setFile(null)}
                  />
                )}
              </div>

              <div className="row-cl-2">
                <div className="row-cl-2-heading1">Sign Up</div>
                <div className="row-cl-2-heading2">
                  You’re signing up as an Individual.
                </div>
              </div>
            </div>
            <Space direction="vertical" size={8} style={{ width: "100%" }}>
              <Form.Item name="businessName" rules={rules}>
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
              <Form.Item name="planTypeId" rules={rules}>
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
              </Form.Item>
              <Form.Item name="designationId" rules={rules}>
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
              </Form.Item>
              <Form.Item name="password" rules={rules}>
                <PasswordInput
                  placeholder="Password"
                  prefix={LockOutlined}
                  size="large"
                  reset={reset}
                />
              </Form.Item>
            </Space>

            <div className="agreement small-sign-up-form small-sign-up-form-agreement">
              <div style={{ display: "flex" }}>
                {/* <FormControlLabel
									style={{
										fontSize: "13px",
										marginRight: "0px",
									}}
									control={
										<Checkbox
											// checked={hasAgreed}
											// onChange={(e) => {
											//   SignUpData.hasAgreed = e.target.checked;
											//   setState({ hasAgreed: e.target.checked });
											// }}
											color="primary"
										/>
									}
									// label="I accept the terms and conditions"
									labelPlacement="end"
								/> */}
                <span className="terms-and-conditions">
                  I agree the terms and conditions.
                </span>
              </div>
            </div>
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
          <p className="p">Already Have an Account?&nbsp;</p>
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
