import React, { useEffect, useState } from "react";
import termsAndCondition from "../../../../../content/file/termandcondition.pdf";
import systemLogo from "../../../../../content/systemLogo.png";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Form, Space } from "antd";
import TextInput from "../../../../sharedComponents/Input/TextInput";
import PasswordInput from "../../../../sharedComponents/Input/PasswordInput";
import { SvgSpinner } from "../../../../../utils/base";
import { useSelector, useDispatch } from "react-redux";
import { loginUser, setNewPassword } from "../../store/actions";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import FormFooter from "../signIn/formFooter";
import { getFirebaseToken } from "../../../../../firebase/initFirebase";
import "../styles/style.css"

function PasswordForm() {
  let formData = {};
  const [localState, setlocalState] = useState({
    disableFormSubmit: false,
    dialogMessage: "",
    openView: false,
    path: "",
  });

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const passwordToken = useParams();
	const id = useLocation();
	const stoken = id.search.split("=");

	const { loader } = useSelector((state) => state.authSlice);

	const { token } = useSelector((state) => state.userSlice);

	const [reset, setReset] = useState(false);



  const onSubmit = async (values) => {
	console.log(values, "Form Data")
	let payload = {
		token: stoken[1],
		password: values.password
	}
	dispatch(setNewPassword(payload))

  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  const onChange = (value, name) => {
    formData = { ...formData, [name]: value };
  };
  const closeViewerModal = () => {
    setlocalState({ ...localState, openView: false, path: "" });
  };

  return (
    <React.Fragment>
      <div className="">
        <img src={systemLogo} alt="#" className="mobileLogo" />
      </div>
      <Form onFinish={onSubmit} className="lg-form">
        <div className="welcome-heading">
          <div>Setup Password</div>
        </div>
        <div className="note note-heading">Enter your password to login on Workwise.</div>
        <div className="">
          <Space direction="vertical" size={16} style={{ width: "100%" }}>
            {/* <Form.Item name="email">
              <TextInput
                type="email"
                // onChange={onChange}
                placeholder="Email"
                prefix={UserOutlined}
                size="large"
                reset={reset}
              />
            </Form.Item> */}
            <Form.Item name="password">
              <PasswordInput placeholder="Password" prefix={LockOutlined} size="large" reset={reset} />
            </Form.Item>
          </Space>
        </div>
        {/* <div className="terms-alert">
          By signing in,{" "}
          <span
            style={{ cursor: "pointer" }}
            onClick={() =>
              setlocalState({
                ...localState,
                path: termsAndCondition,
                openView: true,
              })
            }>
            I agree the terms and conditions.
          </span>
        </div> */}
        <div className="btn">
          <button className={`button ${loader ? "disable" : ""}`}>
            Update Password 
            {!loader ? (
              <span className="icon-login">
                <i className="ic-login_icon" />
              </span>
            ) : (
              <SvgSpinner />
            )}
          </button>
        </div>

        {/* <FormFooter></FormFooter> */}

        {/* {localState.openView && (
          <ViewerModal
            path={localState.path}
            closeViewerModal={closeViewerModal}
          />
        )} */}
      </Form>
      {/* <div className="note">{STRINGS.COPY_RIGHTS}</div> */}
    </React.Fragment>
  );
}

export default PasswordForm;
