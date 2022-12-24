import React, { useEffect, useState } from "react";
import { Col, Input, Row, Button } from "antd";

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
import SingleUpload from "../../../sharedComponents/Upload/singleUpload";
import { useDispatch, useSelector } from "react-redux";
import {
  getBasicInfoAction,
  updateProfileAction,
  updateEmployeeEmailAction,
  updateEmployeePhoneAction,
  updateEmployeeStatusAction,
} from "../store/action";
import { STRINGS } from "../../../../utils/base";

function BasicInfo() {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.userSlice);
  const { settings } = useSelector((state) => state.settingSlice);
  const [form, setForm] = useState({});
  console.log(form, "formmm");
  useEffect(() => {
    dispatch(getBasicInfoAction(user.id));
  }, []);

  useEffect(() => {
    setForm(settings);
  }, [settings]);

  const handleImageUpload = (data) => {
    const payload = { id: STRINGS.DEFAULTS.guid, file: data[0].originFileObj };
    dispatch(updateProfileAction(payload));
  };
  const handelChangeEmail = (e) => {
    setForm({ ...form, personalEmail: e.target.value });
    console.log(form, "formmmm");
  };

  const handelUpdateEmail = () => {
    const payload = {
      id: user.id,
      email: form.personalEmail,
    };
    dispatch(updateEmployeeEmailAction(payload));
  };

  const handelChangePhone = (e) => {
    setForm({ ...form, phoneNo: e.target.value });
  };
  const handelUpdatePhone = () => {
    const payload = {
      id: user.id,
      phoneNo: form.phoneNo,
    };
    dispatch(updateEmployeePhoneAction(payload));
  };
  const handelChangeStatus = (e) => {
    setForm({ ...form, about: e.target.value });
  };
  const handelUpdateStatus = () => {
    const payload = {
      id: user.id,
      about: form.about,
    };
    dispatch(updateEmployeeStatusAction(payload));
  };
  if (form.personalEmail === undefined) return <></>;
  if (form.phoneNo === undefined) return <></>;
  if (form.about === undefined) return <></>;

  return (
    <FormContainer>
      {/* <div className="settings-form"> */}
      <FormHeader>Basic Information</FormHeader>

      <Row justify="center">
        <Col lg={6} md={6} xl={6} sm={24} xs={24} offset={2}>
          <SingleUpload
            handleImageUpload={handleImageUpload}
            url={settings.image ? settings.image : ""}
            position="flex-start"
            multiple={false}
          />
        </Col>
        <Col lg={14} md={14} xl={14} sm={24} xs={24} style={{ paddingTop: 27 }}>
          <div className="basic-info">
            <FormInput>
              <FormLabel>Personal Email</FormLabel>
              <Input
                placeholder={"Email"}
                defaultValue={form.personalEmail}
                onChange={handelChangeEmail}
              />
            </FormInput>
            <Button className="ThemeBtn mt-4 ml-3" onClick={handelUpdateEmail}>
              {"Update"}
            </Button>
          </div>
          <div className="basic-info">
            <FormInput>
              <FormLabel>Mobile #</FormLabel>
              <Input
                placeholder={"Mobile #"}
                defaultValue={form.phoneNo}
                onChange={handelChangePhone}
                type={"Number"}
              />
            </FormInput>
            <Button className="ThemeBtn mt-4 ml-3" onClick={handelUpdatePhone}>
              {"Update"}
            </Button>
          </div>
          <div className="basic-info">
            <FormInput>
              <FormLabel>Status</FormLabel>
              <Input
                placeholder={"Status"}
                defaultValue={form.about}
                onChange={handelChangeStatus}
              />
            </FormInput>
            <Button className="ThemeBtn mt-4 ml-3" onClick={handelUpdateStatus}>
              {"Update"}
            </Button>
          </div>
        </Col>
      </Row>

      {/* </div> */}
    </FormContainer>
  );
}
export default BasicInfo;
