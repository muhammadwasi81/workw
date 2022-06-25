import React, { useState } from "react";
import {
  CheckCircleOutlined,
  WalletOutlined,
  TeamOutlined,
  BankOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import ExpenseType from "../components/ExpenseType";
import {
  Button,
  Form,
  Input,
  Radio,
  DatePicker,
  Checkbox,
  Textarea,
} from "antd";
import SingleUpload from "../../../sharedComponents/Upload/singleUpload";
const { TextArea } = Input;
function CreateExpense() {
  const [isExecutor, setIsExecutor] = useState(false);
  const [type, setType] = useState("General");

  const onFinish = (values) => {
    console.log(values);
  };
  const [form] = Form.useForm();
  return (
    <Form
      form={form}
      name="addExpense"
      onFinish={onFinish}
      autoComplete="off"
      layout="vertical"
      className="addExpense"
    >
      <Form.Item label="Category" name="category" labelPosition="top">
        <ExpenseType />
      </Form.Item>
      <Form.Item label={"Types"} name="type">
        <Radio.Group
          defaultValue={"General"}
          className="radioPrimary"
          onChange={(value) => {
            setType(value.target.value);
          }}
        >
          <Radio.Button value="General">
            <WalletOutlined />
            General
          </Radio.Button>
          <Radio.Button value="Project">
            <PieChartOutlined />
            Project
          </Radio.Button>
          <Radio.Button value="Group">
            <TeamOutlined />
            Group
          </Radio.Button>
          <Radio.Button value="Travel">
            <CheckCircleOutlined />
            Travel
          </Radio.Button>
          <Radio.Button value="Asset">
            <BankOutlined />
            Asset
          </Radio.Button>
        </Radio.Group>
      </Form.Item>
      {type != "General" && (
        <Form.Item label={`${type} List`} name="amount" labelPosition="top">
          <Input placeholder={type} />
        </Form.Item>
      )}
      <Form.Item label="Header" name="header" labelPosition="top">
        <Input placeholder="Write Header Here..." />
      </Form.Item>
      <div className="formItem-w50">
        <Form.Item label="Amount" name="amount" labelPosition="top">
          <Input placeholder="Enter Amount" />
        </Form.Item>
        <Form.Item label="Date" name="date" labelPosition="top">
          <DatePicker placeholder="Pick Current Date" />
        </Form.Item>
        <Form.Item label=" " name="date" labelPosition="top">
          <Checkbox
            onChange={() => {
              setIsExecutor(!isExecutor);
            }}
          >
            Is Reimbursable
          </Checkbox>
        </Form.Item>
      </div>
      <Form.Item label="Approver" name="approver" labelPosition="top">
        <Input placeholder="Select Approver" />
      </Form.Item>
      {!isExecutor && (
        <Form.Item label="Executor" name="executor" labelPosition="top">
          <Input placeholder="Select Executor" />
        </Form.Item>
      )}

      <Form.Item label="Finance" name="finance" labelPosition="top">
        <Input placeholder="Select Finance" />
      </Form.Item>

      <Form.Item label="Description" name="description" labelPosition="top">
        <TextArea
          placeholder="Wirte Description Here..."
          name=""
          id=""
        ></TextArea>
      </Form.Item>
      <Form.Item label="Attachments" name="attachments" labelPosition="top">
        <SingleUpload position={"left"} />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          size="large"
          className="ThemeBtn"
          block
          htmlType="submit"
        >
          Create Expense
        </Button>
      </Form.Item>
    </Form>
  );
}

export default CreateExpense;
