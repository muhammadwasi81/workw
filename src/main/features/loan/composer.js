import React, { useState, useEffect } from "react";
// import "antd/dist/antd.css";
// import './index.css';
import { Button, Form, Input, Select, DatePicker, Avatar } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { getNameForImage, STRINGS } from "../../../utils/base";
import MemberSelect from "../../sharedComponents/AntdCustomSelects/SharedSelects/MemberSelect";
import { addLoan } from "./store/actions";
import { getAllEmployees } from "../../../utils/Shared/store/actions";
import { DEFAULT_GUID } from "../../../utils/constants";
import moment from "moment";
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
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const {
    sharedSlice: { employees },
  } = useSelector((state) => state);
  const { success } = useSelector((state) => state.loanSlice);
  const [loanAmount, setLoanAmount] = useState(0);
  const [loanTenure, setLoanTenure] = useState(0);
  const [deductionPerMonth, setDeductionPerMonth] = useState(0);
  const [firstTimeEmpData, setFirstTimeEmpData] = useState([]);
  const [isFirstTimeDataLoaded, setIsFirstTimeDataLoaded] = useState(false);
  const [employeesData, setEmployeesData] = useState([]);

  const fetchEmployees = (text, pgNo) => {
    dispatch(getAllEmployees({ text, pgNo, pgSize: 20 }));
  };
  // const [account, setAccount] = useState("");

  useEffect(() => {
    fetchEmployees("", 0);
  }, []);

  useEffect(() => {
    if (employees.length > 0 && !isFirstTimeDataLoaded) {
      setIsFirstTimeDataLoaded(true);
      setFirstTimeEmpData(employees);
    }
  }, [employees]);

  // const selectedData = (data, obj) => {
  //   console.log(data);
  //   setEmployeesData(JSON.parse(data).members);
  // };

  const onFinish = (values) => {
    const {
      amount,
      approvers,
      deadline,
      deductionPerMonth,
      description,
      loanPurpose,
      loanTenure,
    } = values;

    const loanObj = {
      id: DEFAULT_GUID,
      amount,
      approverStatus: 1,
      approvers: employeesData.map((item) => ({
        approverId: item.id,
        approverType: 0,
        email: item.email,
      })),
      deadline: moment(deadline._d).format(),
      deductionPerMonth: loanAmount / loanTenure,
      description,
      loanPurpose,
      loanTenure,
    };
    dispatch(addLoan({ loanObj }));
    console.log(success);
    onReset();
  };

  const onReset = () => {
    form.resetFields();
  };

  // const onFill = () => {
  //   form.setFieldsValue({
  //     note: "Hello world!",
  //     gender: "male",
  //   });
  // };

  // const onFinishFailed = (errorInfo: any) => {
  //   console.log("Failed:", errorInfo);
  // };

  return (
    <Form
      form={form}
      name="control-hooks"
      onFinish={onFinish}
      // onFinishFailed={onFinishFailed}
      // formData={formData}
      // onFill={onFill}
      layout="vertical"
    >
      <Form.Item
        name="amount"
        label="Amount"
        onChange={(e) => setLoanAmount(e.target.value)}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input type="number" placeholder="Amount" />
      </Form.Item>
      {/* <Form.Item name="interest rate" label="Interest Rate">
        <div
          style={{
            border: "1px solid #d9d9d9",
            borderRadius: "5px",
            height: "32px",
            width: "100%",
          }}
        ></div>
      </Form.Item> */}
      <Form.Item
        name="loanTenure"
        label="Loan Tenure"
        onChange={(e) => setLoanTenure(e.target.value)}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input type="number" placeholder="Loan Tenure" />
      </Form.Item>
      {/* <Form.Item name="interest" label="Interest">
        <div
          style={{
            border: "1px solid #d9d9d9",
            borderRadius: "5px",
            height: "32px",
            width: "100%",
          }}
        ></div>
      </Form.Item> */}
      <Form.Item
        disabled={true}
        name="deductionPerMonth"
        label="Deduction/Month"
        // value={loanAmount & loanTenure ? loanAmount / loanTenure : 0}
        // value={loanAmount / loanTenure}
      >
        <div
          style={{
            border: "1px solid #d9d9d9",
            borderRadius: "5px",
            height: "32px",
            width: "100%",
          }}
        >
          <Input
            type="number"
            placeholder="Deduction/month"
            value={loanAmount / loanTenure}
          />
        </div>
      </Form.Item>
      <Form.Item
        name="loanPurpose"
        label="Loan Purpose"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select placeholder="Loan Purpose" allowClear>
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
      <Form.Item label="DatePicker" name="deadline">
        <DatePicker />
      </Form.Item>
      <Form.Item label="approvers" name="approvers">
        <MemberSelect
          name="managerId"
          mode="multiple"
          formItem={false}
          isObject={true}
          data={firstTimeEmpData}
          canFetchNow={isFirstTimeDataLoaded}
          fetchData={fetchEmployees}
          placeholder="Select Approvers"
          selectedData={(_, obj) => {
            setEmployeesData([...obj]);
          }}
          optionComponent={(opt) => {
            return (
              <>
                <Avatar src={opt.image} className="!bg-black">
                  {getNameForImage(opt.name)}
                </Avatar>
                {opt.name}
              </>
            );
          }}
        />
      </Form.Item>
      {/* <Form.Item
        name="approvers"
        label="Approvers"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input placeholder="Approvers" />
      </Form.Item> */}
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
            background: "var(--currentThemeColor)",
            border: "none",
            borderRadius: "5px",
            fontSize: "16px",
          }}
          type="primary"
          htmlType="submit"
          loading={success}
        >
          Create
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Composer;
