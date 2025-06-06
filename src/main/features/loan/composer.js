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
import { getAllDefaultApprovers } from "../defaultApprovers/service/service";
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
  const [defaultData, setDefaultData] = useState([]);

  console.log(loanTenure, "loanTenureloanTenure");
  const fetchEmployees = (text, pgNo) => {
    dispatch(getAllEmployees({ text, pgNo, pgSize: 20 }));
  };

  useEffect(() => {
    fetchEmployees("", 0);
    const fetchdefaultApprovals = async () => {
      const defaultApprovers = await getAllDefaultApprovers({
        pageNo: 1,
        pageSize: 50,
        sortBy: 1,
        types: [3],
      });
      // return defaultApprovers;
      const newData = defaultApprovers.data.map((it) => it.member);
      setDefaultData(newData);
      console.log("checking");
    };
    fetchdefaultApprovals();

    // console.log(defaultApprovers);
    // console.log(defaultApprovers.data);
    // if (defaultApprovers.data.length) {
    //   console.log(defaultApprovers, "default approvers");
    //   const newData = defaultApprovers.data.map((it) => it.member);
    //   setDefaultData(newData);
    // }
  }, []);

  useEffect(() => {
    if (employees.length > 0 && !isFirstTimeDataLoaded) {
      setIsFirstTimeDataLoaded(true);
      setFirstTimeEmpData(employees);
      console.log(employees, "employees");
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

    // let deadlin = new Date();
    // deadlin.setFullYear(new Date().getFullYear());
    // deadlin.setMonth(loanTenure - 1);
    // deadlin.setMonth(deadlin.getMonth() + loanTenure);

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
    dispatch(handleOpenComposer(false));
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
        <Input
          type="number"
          placeholder={loanDictionaryList.months}
          step={"1"}
          min={1}
        />
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
        <DatePicker
          disabledDate={(current) =>
            current &&
            (current.valueOf() < Date.now() ||
              current.valueOf() <
                moment()
                  .add(loanTenure - 1, "months")
                  .endOf("month")
                  .valueOf())
          }
        />
      </Form.Item>

      <Form.Item label={loanDictionaryList.approvers} name="approvers">
        <MemberSelect
          name="managerId"
          mode="multiple"
          formItem={false}
          isObject={true}
          data={firstTimeEmpData}
          // defaultData={[
          //   {
          //     id: "f5d172dc-f497-467d-94cc-499e77e21939",
          //     businessId: "0ab5f9c0-f948-4c40-8dad-c58ba99fb763",
          //     name: "hs shah",
          //     email: "hs@miletap.com",
          //     image: "",
          //     type: 1,
          //     userTypeId: 3,
          //     designation: "",
          //   },
          // ]}
          defaultData={defaultData}
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
          {loanDictionaryList.createLoan}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Composer;
