import React, { useEffect, useState } from "react";
import "../styles/setting.css";
import { Input } from "antd";
import {
  FormButton,
  FormButtonContainer,
  FormContainer,
  FormHeader,
  FormInput,
  FormInputContainer,
  FormLabel,
  FormTextArea,
} from "../styles/settingForm";
function ChangePassword() {
  return (
    <FormContainer>
      <FormHeader>Change Password</FormHeader>
      <FormInputContainer>
        <FormInput>
          <FormLabel>Existing Password</FormLabel>
          <Input
            placeholder={"Enter Existing Password"}
            // value={form.name}
            // onChange={handelChangeName}
          />
        </FormInput>
        <FormInput>
          <FormLabel>New Password</FormLabel>
          <Input
            placeholder={"Enter New Password"}
            // value={form.description}
            // onChange={handelChangeDescription}
          />
        </FormInput>
        <FormInput>
          <FormLabel>Confirm Password</FormLabel>
          <Input
            placeholder={"Enter Confirm"}
            // value={form.description}
            // onChange={handelChangeDescription}
          />
        </FormInput>
      </FormInputContainer>
      <FormButtonContainer>
        <FormButton
          type="primary"
          size="medium"
          style={{}}
          className="formBtn"
          // onClick={(e) => {
          //   onSubmit(form);
          //   setClearButton(false);
          // }}
        >
          Save
        </FormButton>
      </FormButtonContainer>
    </FormContainer>
  );
}
export default ChangePassword;
