import React, { useState } from "react";
// import "antd/dist/antd.css";
// import './index.css';
import { Button, Form, Input, Select } from "antd";
import SingleUpload from "../../../sharedComponents/Upload/singleUpload";
import styling from "./style.module.css";
import FormItemLabel from "antd/lib/form/FormItemLabel";
import { auto } from "darkreader";

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
  const [search, setSearch] = useState(false);
  const [terminationSearch, setTerminationSearch] = useState(false);

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
        name="reason for resignation"
        label="Reason for resignation"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select
          placeholder="Reason for resignation"
          onChange={onGenderChange}
          allowClear
        >
          <Option value="Insufficient Work-Life Balance">
            Insufficient Work-Life Balance
          </Option>
          <Option value="Time Off, and Flexibility">
            Time Off, and Flexibility
          </Option>
          <Option value="Unrealistic Goals and Performance Objectives">
            Unrealistic Goals and Performance Objectives
          </Option>
          <Option value="Lack of a Clear Path for Career Advancement">
            Lack of a Clear Path for Career Advancement
          </Option>
          <Option value="Feel Unsupported by Manage">
            Feel Unsupported by Manage
          </Option>
          <Option value="Don't Feel Challenged">Don't Feel Challenged</Option>
          <Option value="Relocation">Relocation</Option>
          <Option value="other">Others</Option>
        </Select>
      </Form.Item>
      <Form.Item name="resignation date" label="Resignation Date">
        <Input type="date" />
      </Form.Item>
      <Form.Item
        name="on behalf of colleague"
        label="On Behalf Of Colleague"
        style={{ display: "flex", flexDirection: "row", flexFlow: "nowrap" }}
      >
        <Input
          type="checkbox"
          style={{ width: "auto" }}
          onChange={(e) => {
            if (e.target.checked == true) {
              setSearch(true);
            } else {
              setSearch(false);
            }
          }}
        />
      </Form.Item>

      {search && (
        <Form.Item>
          {" "}
          <Input name="behalf-of-colleague" style={{ width: "100%" }} />{" "}
        </Form.Item>
      )}
      <Form.Item
        name="is termination"
        label="Is Termination ?"
        className={styling.termination_label}
        style={{ display: "flex", flexDirection: "row", flexFlow: "nowrap" }}
      >
        <Input
          type="checkbox"
          style={{ width: "auto" }}
          onChange={(e) => {
            if (e.target.checked == true) {
              setTerminationSearch(true);
            } else {
              setTerminationSearch(false);
            }
          }}
        />
      </Form.Item>
      {terminationSearch && (
        <Form.Item>
          {" "}
          <Input style={{ width: "100%" }} />{" "}
        </Form.Item>
      )}

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
        name="manager"
        label="Manager"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input placeholder="Manager" />
      </Form.Item>

      <Form.Item
        name="hr"
        label="HR"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input placeholder="Select HR" />
      </Form.Item>

      <Form.Item
        name="finance"
        label="Finance"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input placeholder="Select Finance" />
      </Form.Item>

      <Form.Item
        name="it"
        label="IT"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input placeholder="Select IT" />
      </Form.Item>

      <Form.Item
        name="admin"
        label="Admin"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input placeholder="Select Admin" />
      </Form.Item>

      <Form.Item
        name="extra interview"
        label="Extra Interview"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input placeholder="Select Exit" />
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
            background: "#1b5669",
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
