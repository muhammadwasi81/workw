import { Button, DatePicker, Divider, Form, Input, Select, Table } from "antd";
import React, { useEffect, useState } from "react";
import { EditOutlined } from "@ant-design/icons";
import SingleUpload from "../../sharedComponents/Upload/singleUpload";
import { getAllRebateCategoriesService } from "../rebateCategory/services/service";
import moment from "moment/moment";

function RebateEmployee() {
  const [form] = Form.useForm();
  const [rebateEmployee, setRebateEmployee] = useState([]);
  const [rebateCategory, setRebateCategory] = useState([]);
  useEffect(() => {
    getRebateCategory();
  }, []);

  const getRebateCategory = async () => {
    try {
      const { data, responseCode } = await getAllRebateCategoriesService();
      if (responseCode === 1001) setRebateCategory(data);
    } catch (e) {}
  };
  useEffect(() => {
    console.log("rebateEmployee", rebateEmployee);
  }, [rebateEmployee]);

  const handleSubmit = async () => {
    form.submit();
    try {
      const isValidation = await form.validateFields();
      if (isValidation) {
        setRebateEmployee((preValue) => [...preValue, form.getFieldsValue()]);
      }
    } catch (e) {}
  };

  const columns = [
    {
      title: "Amount",
      dataIndex: "amount",
      ellipsis: true,
      key: "amount",
    },
    {
      title: "Category",
      dataIndex: "category",
      ellipsis: true,
      key: "category",
      render: (value, _, index) => {
        return rebateCategory.filter((item) => item.id === value)[index].name;
      },
    },
    {
      title: "Date",
      dataIndex: "date",
      ellipsis: true,
      key: "date",
      render: (value) => {
        return moment(value).format("YYYY/MM/DD");
      },
    },
  ];

  return (
    <div className="employeeForm">
      <Divider orientation="left">Rebate Info</Divider>
      <Form layout={"vertical"} form={form}>
        <Form.Item name="amount" label={"Amount"} rules={[{ required: true }]}>
          <Input placeholder="Amount" type="number" />
        </Form.Item>
        <Form.Item
          name="category"
          label={"Category"}
          rules={[{ required: true }]}
        >
          <Select placeholder="Category" size="large">
            {rebateCategory.map((item) => (
              <Select.Option value={item.id} key={item.id}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="date" label={"Date"} rules={[{ required: true }]}>
          <DatePicker placeholder="Select Date" size="large" />
        </Form.Item>
        <Form.Item area="true" label="Attachments">
          <SingleUpload
            url={""}
            value={""}
            handleImageUpload={() => {}}
            uploadText={"Upload"}
            multiple={false}
            position={"justify-start"}
          />
        </Form.Item>
      </Form>
      <div className="buttons">
        <Button
          className="btn ThemeBtn"
          style={{ marginLeft: "auto" }}
          icon={<EditOutlined />}
          onClick={handleSubmit}
        >
          Add Rebate
        </Button>
      </div>
      {rebateEmployee.length > 0 && (
        <div className="rebateTable" style={{ marginTop: "1rem" }}>
          <Table
            columns={columns}
            dragable={true}
            dataSource={rebateEmployee}
          />
        </div>
      )}
    </div>
  );
}

export default RebateEmployee;
