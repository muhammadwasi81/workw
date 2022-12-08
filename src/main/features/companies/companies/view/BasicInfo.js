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
  const { companyDictionary } = companyDictionaryList[userLanguage];
  const { companyDetail } = companyDictionary;
  const [profileImage, setProfileImage] = useState(null);

  const handleImageUpload = (data) => {
    setProfileImage(data);
  };

  const onFinish = (values) => {
    console.log(values);
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
      <Divider orientation="left"> {companyDetail.basicinfo}</Divider>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Form.Item
            label={companyDetail.companyName}
            name="name"
            labelPosition="top"
            rules={[
              {
                required: true,
                message: "Please Enter Company Name",
              },
            ]}
          >
            <TextInput placeholder={companyDetail.enterCompanyName} />
          </Form.Item>
          <Form.Item
            className="emailInput"
            label={companyDetail.companyEmail}
            name="companyEmail"
            labelPosition="top"
            rules={[
              {
                required: true,
                message: "Please Enter Company Email",
              },
            ]}
          >
            <TextInput placeholder={companyDetail.companyEmail} />
          </Form.Item>
          <Form.Item
            label={companyDetail.ownerName}
            name="name"
            labelPosition="top"
            rules={[
              {
                required: true,
                message: "Please Enter Owner Name",
              },
            ]}
          >
            <TextInput placeholder={companyDetail.enterownerName} />
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
            label={companyDetail.address}
            name="address"
            labelPosition="top"
            rules={[
              {
                required: true,
                message: "Please Enter Address",
              },
            ]}
          >
            <TextInput placeholder={companyDetail.enterAddress} />
          </Form.Item>
          <Form.Item
            label={companyDetail.phoneNumber}
            name="phoneNumber"
            labelPosition="top"
            rules={[
              {
                required: true,
                message: "Please Enter Phone Number",
              },
            ]}
          >
            <TextInput placeholder={companyDetail.phoneNumber} />
          </Form.Item>
        </Col>
      </Row>
      <Divider orientation="left"> {companyDetail.user}</Divider>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Form.Item
            label={companyDetail.totalEmployees}
            name="totalEmployees"
            labelPosition="top"
            rules={[
              {
                required: true,
                message: "Please Enter Total Employees",
              },
            ]}
          >
            <TextInput placeholder={companyDetail.entertotalEmployees} />
          </Form.Item>
          <Form.Item
            label={companyDetail.totalGroups}
            name="totalGroups"
            labelPosition="top"
            rules={[
              {
                required: true,
                message: "Please Enter Total Groups",
              },
            ]}
          >
            <TextInput placeholder={companyDetail.enterCompnaytotalGroups} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label={companyDetail.totalEmployeesInCall}
            name="callEmployees"
            labelPosition="top"
            rules={[
              {
                required: true,
                message: "Please Enter Total Employees In Call",
              },
            ]}
          >
            <TextInput placeholder={companyDetail.entertotalEmployeesInCall} />
          </Form.Item>
          <Form.Item
            label={companyDetail.totalProjects}
            name="totalProjects"
            labelPosition="top"
            rules={[
              {
                required: true,
                message: "Please Enter Total Projects",
              },
            ]}
          >
            <TextInput placeholder={companyDetail.entertotalProjects} />
          </Form.Item>
        </Col>
      </Row>
      <Divider orientation="left"> {companyDetail.totalMemory}</Divider>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Form.Item
            label={companyDetail.memory}
            name="memory"
            labelPosition="top"
            rules={[
              {
                required: true,
                message: "Please Enter Memory",
              },
            ]}
          >
            <TextInput placeholder={companyDetail.enterNameMemory} />
          </Form.Item>
          <Form.Item
            label={companyDetail.availed}
            name="availed"
            labelPosition="top"
            rules={[
              {
                required: true,
                message: "Please Enter Availed",
              },
            ]}
          >
            <TextInput placeholder={companyDetail.enterAvailedMemory} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label={companyDetail.used}
            name="used"
            labelPosition="top"
            rules={[
              {
                required: true,
                message: "Please Enter Used",
              },
            ]}
          >
            <TextInput placeholder={companyDetail.usedMemory} />
          </Form.Item>
          <Form.Item className="updateBtn">
            <Button
              type="primary"
              size="medium"
              className="ThemeBtn"
              block
              htmlType="submit"
              // loading={loader}
              title={companyDetail.update}
            >
              {" "}
              {companyDetail.update}
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}
export default BaiscInfo;
