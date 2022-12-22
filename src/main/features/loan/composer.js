import React, { useState, useEffect, useContext } from "react";
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
import { LanguageChangeContext } from "../../../utils/localization/localContext/LocalContext";
import { LoanDictionary } from "./localization";
import { handleOpenComposer } from "./store/slice";
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
  const { userLanguage } = useContext(LanguageChangeContext);
  const { loanDictionaryList, Direction } = LoanDictionary[userLanguage];
  const [form] = Form.useForm();
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const {
    sharedSlice: { employees },
  } = useSelector((state) => state);
  const { success, createLoader } = useSelector((state) => state.loanSlice);
  const [loanAmount, setLoanAmount] = useState(0);
  const [loanTenure, setLoanTenure] = useState(0);
  const [deductionPerMonth, setDeductionPerMonth] = useState(0);
  const [firstTimeEmpData, setFirstTimeEmpData] = useState([]);
  const [isFirstTimeDataLoaded, setIsFirstTimeDataLoaded] = useState(false);
  const [employeesData, setEmployeesData] = useState([]);

  const fetchEmployees = (text, pgNo) => {
    dispatch(getAllEmployees({ text, pgNo, pgSize: 20 }));
  };

  useEffect(() => {
    fetchEmployees("", 0);
  }, []);

  useEffect(() => {
    if (employees.length > 0 && !isFirstTimeDataLoaded) {
      setIsFirstTimeDataLoaded(true);
      setFirstTimeEmpData(employees);
    }
  }, [employees]);

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
    dispatch(handleOpenComposer(false))
    console.log(success);
    if (success) {
      onReset();
    }
  };

  const onReset = () => {
    form.resetFields();
  };

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
        label={loanDictionaryList.amount}
        onChange={(e) => setLoanAmount(e.target.value)}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input type="number" placeholder={loanDictionaryList.amount} />
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
        label="Months"
        onChange={(e) => setLoanTenure(e.target.value)}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input type="number" placeholder={loanDictionaryList.months} />
      </Form.Item>
      <Form.Item
        disabled={true}
        name="deductionPerMonth"
        label={loanDictionaryList.deductionPerMonth}
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
            placeholder={loanDictionaryList.deductionPerMonth}
            value={loanAmount / loanTenure}
          />
        </div>
      </Form.Item>
      <Form.Item
        name="loanPurpose"
        label={loanDictionaryList.loanPurpose.LoanPurpose}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select
          placeholder={loanDictionaryList.loanPurpose.LoanPurpose}
          allowClear
        >
          <Option value="vehicle">
            {loanDictionaryList.loanPurpose.vehicle}
          </Option>
          <Option value="personal">
            {" "}
            {loanDictionaryList.loanPurpose.personal}
          </Option>
          <Option value="wedding">
            {" "}
            {loanDictionaryList.loanPurpose.wedding}
          </Option>
          <Option value="medical">
            {" "}
            {loanDictionaryList.loanPurpose.medical}
          </Option>
          <Option value="education">
            {" "}
            {loanDictionaryList.loanPurpose.education}
          </Option>
          <Option value="house"> {loanDictionaryList.loanPurpose.house}</Option>
          <Option value="other"> {loanDictionaryList.loanPurpose.other}</Option>
        </Select>
      </Form.Item>
      <Form.Item label={loanDictionaryList.deadline} name="deadline">
        <DatePicker />
      </Form.Item>
      <Form.Item
        label={loanDictionaryList.approvers}
        name="approvers"
        rules={[
          {
            required: true,
            message: "Approvers Required!!",
          },
        ]}
      >
        <MemberSelect
          name="managerId"
          mode="multiple"
          formItem={false}
          isObject={true}
          data={firstTimeEmpData}
          canFetchNow={isFirstTimeDataLoaded}
          fetchData={fetchEmployees}
          placeholder={loanDictionaryList.selectApprovers}
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
      <Form.Item
        name="description"
        label={loanDictionaryList.description}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <TextArea rows={2} placeholder={loanDictionaryList.description} />
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
          loading={createLoader}
        >
          {loanDictionaryList.create}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Composer;
