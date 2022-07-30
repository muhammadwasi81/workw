import React from "react";
// import "antd/dist/antd.css";
// import './index.css';
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
        name="amount"
        label="Amount"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input type="number" placeholder="Amount" />
      </Form.Item>
      <Form.Item name="interest rate" label="Interest Rate">
        <div
          style={{
            border: "1px solid #d9d9d9",
            borderRadius: "5px",
            height: "32px",
            width: "100%",
          }}
        ></div>
      </Form.Item>
      <Form.Item
        name="loan tenure"
        label="Loan Tenure"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input type="number" placeholder="Loan Tenure" />
      </Form.Item>
      <Form.Item name="interest" label="Interest">
        <div
          style={{
            border: "1px solid #d9d9d9",
            borderRadius: "5px",
            height: "32px",
            width: "100%",
          }}
        ></div>
      </Form.Item>
      <Form.Item name="deduction/month" label="Deduction/Month">
        <div
          style={{
            border: "1px solid #d9d9d9",
            borderRadius: "5px",
            height: "32px",
            width: "100%",
          }}
        ></div>
      </Form.Item>
      <Form.Item
        name="loan purpose"
        label="Loan Purpose"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select placeholder="Loan Purpose" onChange={onGenderChange} allowClear>
          <Option value="vehicle">Vehicle</Option>
          <Option value="personal">Personal</Option>
          <Option value="wedding">Wedding</Option>
          <Option value="medical">Medical</Option>
          <Option value="education">Education</Option>
          <Option value="house">House</Option>
          <Option value="other">Other</Option>
        </Select>
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
        name="approvers"
        label="Approvers"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input placeholder="Approvers" />
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
        <TextArea rows={2} placeholder="Description" />
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
          Create
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Composer;
