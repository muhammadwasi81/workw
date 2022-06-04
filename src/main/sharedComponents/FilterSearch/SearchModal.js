import React from "react";
import { Button, Modal, Form, Input, Select, DatePicker } from "antd";
import "./style.css";
import { DatePickerWithlabel } from "./index.style";

function SearchModal({ isVisible, onClose, onFilter }) {
  const [form] = Form.useForm();
  const handleFinish = (values) => {
    onFilter(values);
  };
  const handleReset = () => {
    onFilter("");
    form.resetFields();
  };

  return (
    <Modal
      title="Filter"
      visible={isVisible}
      wrapClassName={"modalWrapper"}
      onCancel={onClose}
      footer={[
        <Button key="reset" className="resetBtn" onClick={handleReset}>
          Reset
        </Button>,
        <Button className="ThemeBtn" key="filter" onClick={form.submit}>
          Filter
        </Button>,
      ]}
    >
      <Form form={form} onFinish={handleFinish}>
        <Form.Item name="search">
          <Input placeholder="Search" />
        </Form.Item>
        <Form.Item name="dropDownOne">
          <Select>
            <Select.Option key={1} values={1}>
              demo
            </Select.Option>
            <Select.Option key={2} values={2}>
              demo
            </Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="dropDownTwo">
          <Select>
            <Select.Option key={1} values={1}>
              demo
            </Select.Option>
            <Select.Option key={2} values={2}>
              demo
            </Select.Option>
          </Select>
        </Form.Item>
        <DatePickerWithlabel>
          <span>Start Date</span>
          <Form.Item name="startDate" label="To ">
            <DatePicker placeholder="Select Date" />
          </Form.Item>
        </DatePickerWithlabel>
        <DatePickerWithlabel>
          <span>End Date</span>
          <Form.Item name="endDate" label="End">
            <DatePicker placeholder="Select Date" />
          </Form.Item>
        </DatePickerWithlabel>
      </Form>
    </Modal>
  );
}

export default SearchModal;
