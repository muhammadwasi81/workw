import React, { useEffect, useState } from "react";
import "../styles/setting.css";
import { Button, Input, message } from "antd";
import {
  FormButton,
  FormButtonContainer,
  FormContainer,
  FormHeader,
  FormInput,
  FormInputContainer,
  FormLabel,
} from "../styles/settingForm";
import { updatePasswordAction } from "../store/action";
import { useDispatch, useSelector } from "react-redux";

function ChangePassword() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userSlice);
  const { settings } = useSelector((state) => state.settingSlice);
  const [form, setForm] = useState({});
  const [confrimPass, setConfirmPass] = useState();

  useEffect(() => {
    setForm(settings);
  }, [settings]);
  const handelChangepassword = (e) => {
    setForm({ ...form, oldPassword: e.target.value });
  };
  const handlePassword = () => {
    if (form.newPassword === confrimPass) {
      const payload = {
        user_id: user.id,
        oldPassword: form.oldPassword,
        newPassword: form.newPassword,
      };
      dispatch(updatePasswordAction(payload));
    } else {
      message.error("New Password and Confirm Password should be same!");
    }
  };
  const handelChangeNewPassword = (e) => {
    setForm({ ...form, newPassword: e.target.value });
  };
  const handelChangeConfirmPass = (e) => {
    console.log("onChnggeeee");
    const confirmPass = e.target.value;
    setConfirmPass(confirmPass);
  };
  return (
    <FormContainer>
      <FormHeader>Change Password</FormHeader>
      <FormInputContainer>
        <FormInput>
          <FormLabel>Existing Password</FormLabel>
          <Input
            placeholder={"Enter Existing Password"}
            value={form.oldPassword}
            onChange={handelChangepassword}
            type="password"
          />
        </FormInput>
        <FormInput>
          <FormLabel>New Password</FormLabel>
          <Input
            placeholder={"Enter New Password"}
            value={form.newPassword}
            onChange={handelChangeNewPassword}
            type="password"
          />
        </FormInput>
        <FormInput>
          <FormLabel>Confirm Password</FormLabel>
          <Input
            type="password"
            placeholder={"Enter Confirm"}
            value={confrimPass}
            onChange={handelChangeConfirmPass}
          />
        </FormInput>
      </FormInputContainer>
      <FormButtonContainer>
        <Button className="ThemeBtn mt-4" onClick={handlePassword}>
          Save
        </Button>
      </FormButtonContainer>
    </FormContainer>
  );
}
export default ChangePassword;
