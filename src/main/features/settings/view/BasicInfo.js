import React from "react";
import { Col, Input, Row } from "antd";

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

function BasicInfo() {
  return (
    <FormContainer>
      <FormHeader>Basic Information</FormHeader>
      <FormInputContainer>
        <Row gutter={[16, 16]} style={{ width: "100%" }}>
          <Col lg={10} md={10} xl={10} sm={24} xs={24}>
            <SingleUpload
              // handleImageUpload={handleImageUpload}
              img="Add Image"
              position="flex-start"
              // uploadText={rewardDictionary.upload}
            />
          </Col>
          <Col
            lg={14}
            md={14}
            xl={14}
            sm={24}
            xs={24}
            // style={{ paddingTop: 27 }}
          >
            <FormInput>
              <FormLabel>Personal Email</FormLabel>
              <Input
                placeholder={"Email"}
                // value={form.name}
                // onChange={handelChangeName}
              />
            </FormInput>
            <FormInput>
              <FormLabel>Mobile #</FormLabel>
              <Input
                placeholder={"Mobile #"}
                // value={form.name}
                // onChange={handelChangeName}
              />
            </FormInput>
            <FormInput>
              <FormLabel>Status</FormLabel>
              <Input
                placeholder={"Status"}
                // value={form.name}
                // onChange={handelChangeName}
              />
            </FormInput>
          </Col>
        </Row>
      </FormInputContainer>
    </FormContainer>
  );
}
export default BasicInfo;
