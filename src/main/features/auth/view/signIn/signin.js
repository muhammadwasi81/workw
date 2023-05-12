import React, { useEffect, useState } from "react";
import termsAndCondition from "../../../../../content/file/termandcondition.pdf";
import systemLogo from "../../../../../content/systemLogo.png";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Form, Space } from "antd";
import TextInput from "../../../../sharedComponents/Input/TextInput";
import PasswordInput from "../../../../sharedComponents/Input/PasswordInput";
import { SvgSpinner } from "../../../../../utils/base";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../../store/actions";
import { useNavigate } from "react-router-dom";
import FormFooter from "./formFooter";
import { getFirebaseToken } from "../../../../../firebase/initFirebase";
import "../styles/style.css";

function SignIn() {
  let formData = {};
  const [localState, setlocalState] = useState({
    disableFormSubmit: false,
    dialogMessage: "",
    openView: false,
    path: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loader } = useSelector((state) => state.authSlice);

  const { token } = useSelector((state) => state.userSlice);

  const [reset, setReset] = useState(false);

  const onSubmit = async (payload) => {
    let permission = await Notification.requestPermission();
    let deviceToken = null;
    if (permission === "granted") {
      console.log("Notification permission granted.");
      let firebaseToken = await getFirebaseToken();
      // set send token api here...
      deviceToken = firebaseToken;
      console.log(firebaseToken, "firebaseToken");
    }
    dispatch(loginUser({ ...payload, deviceToken }));
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
          <div>Welcome</div>
        </div>
        <div className="note note-heading">
          Enter your login credentials to continue.
        </div>
        <div className="">
          <Space direction="vertical" size={16} style={{ width: "100%" }}>
            <Form.Item name="email">
              <TextInput
                type="email"
                // onChange={onChange}
                placeholder="Email"
                prefix={UserOutlined}
                size="large"
                reset={reset}
              />
            </Form.Item>
            <Form.Item name="password">
              <PasswordInput
                placeholder="Password"
                prefix={LockOutlined}
                size="large"
                reset={reset}
              />
            </Form.Item>
          </Space>
        </div>
        <div className="btn">
          <button className={`button ${loader ? "disable" : ""}`}>
            Sign in
            {!loader ? (
              <span className="icon-login">
                <i className="ic-login_icon" />
              </span>
            ) : (
              <SvgSpinner />
            )}
          </button>
        </div>

        <FormFooter></FormFooter>

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

export default SignIn;
