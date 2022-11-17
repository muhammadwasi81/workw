import React, { useContext, useEffect, useState } from "react";
import { Button, Form, Input, Avatar, Divider, Row, Col } from "antd";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";
import { dictionaryList } from "../../../../../utils/localization/languages";
import { companyDictionaryList } from "../localization/index";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import TextInput from "../../../../sharedComponents/Input/TextInput";
import SingleUpload from "../../../../sharedComponents/Upload/singleUpload";

function BaiscInfo() {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { userLanguage } = useContext(LanguageChangeContext);
  const { sharedLabels } = dictionaryList[userLanguage];
  const { companyDictionary } = companyDictionaryList[userLanguage];
  const [profileImage, setProfileImage] = useState(null);

  const handleImageUpload = (data) => {
    setProfileImage(data);
  };

  const onFinish = (values) => {
    console.log(values)
  };
  // useEffect(() => {
  //   if (success) {
  //     form.resetFields();
  //   }
  // }, [success]);

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      form={form}
      name="updateCompany"
      labelCol={{
        span: 24,
      }}
      wrapperCol={{
        span: 24,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      className="BasicInfoForm"
    >
      <Divider orientation="left"> {"Basic Info"}</Divider>
      <Row gutter={[16, 16]}>
        <Col span={12} >
          <Form.Item
            label={"Company Name"}
            name="name"
            labelPosition="top"
            rules={[
              {
                required: true,
                message: "Please Enter Company Name",
              },
            ]}
          >
            <TextInput placeholder={"Enter Name"} />
          </Form.Item>
          <Form.Item
            className="emailInput"
            label={"Company Email"}
            name="companyEmail"
            labelPosition="top"
            rules={[
              {
                required: true,
                message: "Please Enter Company Email",
              },
            ]}
          >
            <TextInput placeholder={"Enter Company Email"} />
          </Form.Item>
          <Form.Item
            label={"Owner Name"}
            name="name"
            labelPosition="top"
            rules={[
              {
                required: true,
                message: "Please Enter Owner Name",
              },
            ]}
          >
            <TextInput placeholder={"Enter Owner Name"} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item area="true" style={{ gridArea: "1/-2 / span 2 / span 1" }}>
            <SingleUpload
              handleImageUpload={handleImageUpload}
              img="Add Image"
              position="flex-start"
              uploadText={"Upload"}
            />
          </Form.Item>
          <Form.Item
            label={"Address"}
            name="address"
            labelPosition="top"
            rules={[
              {
                required: true,
                message: "Please Enter Address",
              },
            ]}
          >
            <TextInput placeholder={"Enter Address"} />
          </Form.Item>
          <Form.Item
            label={"Phone Number"}
            name="phoneNumber"
            labelPosition="top"
            rules={[
              {
                required: true,
                message: "Please Enter Phone Number",
              },
            ]}
          >
            <TextInput placeholder={"Enter Phone Number"} />
          </Form.Item>
        </Col>
      </Row>
      <Divider orientation="left"> {"User"}</Divider>
      <Row gutter={[16, 16]}>
        <Col span={12} >
          <Form.Item
            label={"Total Employees"}
            name="totalEmployees"
            labelPosition="top"
            rules={[
              {
                required: true,
                message: "Please Enter Total Employees",
              },
            ]}
          >
            <TextInput placeholder={"Enter Name Total Employees"} />
          </Form.Item>
          <Form.Item
            label={"Total Groups"}
            name="totalGroups"
            labelPosition="top"
            rules={[
              {
                required: true,
                message: "Please Enter Total Groups",
              },
            ]}
          >
            <TextInput placeholder={"Enter Company Total Groups"} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label={"Total Employees In Call"}
            name="callEmployees"
            labelPosition="top"
            rules={[
              {
                required: true,
                message: "Please Enter Total Employees In Call",
              },
            ]}
          >
            <TextInput placeholder={"Enter Total Employees In Call"} />
          </Form.Item>
          <Form.Item
            label={"Total Projects"}
            name="totalProjects"
            labelPosition="top"
            rules={[
              {
                required: true,
                message: "Please Enter Total Projects",
              },
            ]}
          >
            <TextInput placeholder={"Enter Total Projects"} />
          </Form.Item>
        </Col>
      </Row>
      <Divider orientation="left"> {"Total Memory"}</Divider>
      <Row gutter={[16, 16]}>
        <Col span={12} >
          <Form.Item
            label={"Memory"}
            name="memory"
            labelPosition="top"
            rules={[
              {
                required: true,
                message: "Please Enter Memory",
              },
            ]}
          >
            <TextInput placeholder={"Enter Name Memory (gbs)"} />
          </Form.Item>
          <Form.Item
            label={"Availed"}
            name="availed"
            labelPosition="top"
            rules={[
              {
                required: true,
                message: "Please Enter Availed",
              },
            ]}
          >
            <TextInput placeholder={"Enter Availed Memory (gbs)"} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label={"Used"}
            name="used"
            labelPosition="top"
            rules={[
              {
                required: true,
                message: "Please Enter Used",
              },
            ]}
          >
            <TextInput placeholder={"Used Memory (gbs)"} />
          </Form.Item>
          <Form.Item className="updateBtn">
            <Button
              type="primary"
              size="medium"
              className="ThemeBtn"
              block
              htmlType="submit"
              // loading={loader}
              title={"Update"}
            >
              {" "}
              {"Update"}{" "}
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}
export default BaiscInfo;
