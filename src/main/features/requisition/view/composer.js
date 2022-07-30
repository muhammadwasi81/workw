import React from "react";
// import "antd/dist/antd.css";
// import './index.css';
import SingleUpload from "../../../sharedComponents/Upload/singleUpload";
import { Button, Form, Input, Select } from "antd";
const { TextArea } = Input;

const { Option } = Select;
const layout = {
  labelCol: {
    span: 16,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 16,
    span: 16,
  },
};

const Composer = () => {
  const [form] = Form.useForm();

  const onGenderChange = (value) => {
    switch (value) {
      case "male":
        form.setFieldsValue({
          note: "Hi, man!",
        });
        return;

      case "female":
        form.setFieldsValue({
          note: "Hi, lady!",
        });
        return;

      case "other":
        form.setFieldsValue({
          note: "Hi there!",
        });
    }
  };

  const onFinish = (values) => {
    console.log(values);
  };

  const onReset = () => {
    form.resetFields();
  };

  const onFill = () => {
    form.setFieldsValue({
      note: "Hello world!",
      gender: "male",
    });
  };

  return (
    <Form
      form={form}
      name="control-hooks"
      onFinish={onFinish}
      layout="vertical"
    >
      <Form.Item
        name="name"
        label="Name"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input placeholder="Name" />
      </Form.Item>

      <Form.Item
        name="description"
        label="Description"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input placeholder="Description" />
      </Form.Item>

      <Form.Item
        name="budget"
        label="Budget"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input type={"number"} placeholder="Budget" />
      </Form.Item>
      {/* <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) =>
          prevValues.gender !== currentValues.gender
        }
      >
        {({ getFieldValue }) =>
          getFieldValue("gender") === "other" ? (
            <Form.Item
              name="customizeGender"
              label="Customize Gender"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
          ) : null
        }
      </Form.Item> */}
      <Form.Item
        name="end date"
        label="End Date"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input type="date" />
      </Form.Item>
      <Form.Item
        name="reason"
        label="Reason"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input placeholder="Reason" />
      </Form.Item>
      <Form.Item
        name="approvals"
        label="Approvals"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input placeholder="Approvals" />
      </Form.Item>
      <Form.Item
        name="final approvals"
        label="Final Approvals"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input placeholder="Final Approvals" />
      </Form.Item>
      <Form.Item area="true">
        <SingleUpload
          //handleImageUpload={handleImageUpload}
          img="Add Image"
          position="flex-start"
          //uploadText={warningDictionary.upload}
        />
      </Form.Item>
      <Form.Item>
        <Button
          style={{
            width: "100%",
            background: "var(--primary_theme_color_green)",
            border: "none",
            borderRadius: "5px",
            fontSize: "16px",
          }}
          type="primary"
          htmlType="submit"
        >
          Create Requisition
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Composer;
