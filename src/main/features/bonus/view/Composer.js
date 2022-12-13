import { Button, Form, Input, InputNumber, Radio } from "antd";
import React, { useState, useContext, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addBonus } from "../store/actions";
import { bonusDictionaryList } from "../localization/index";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import Avatar from "../../../sharedComponents/Avatar/avatarOLD";
import CustomSelect from "../../../sharedComponents/AntdCustomSelects/SharedSelects/MemberSelect";
import {
  getAllEmployees,
  getEmployeeSalary,
} from "../../../../utils/Shared/store/actions";

const initialState = {
  id: "",
  description: "",
  categoryId: "",
  imageId: "",
  members: [
    {
      memberId: "",
      memberType: 1,
    },
  ],
  approvers: [
    {
      approverId: "",
      approverType: 0,
      isDefault: true,
      status: 1,
      email: "",
    },
  ],
};

const Composer = (props) => {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { Direction, bonusDictionary } = bonusDictionaryList[userLanguage];

  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [value, setValue] = useState();
  const [firstTimeEmpData, setFirstTimeEmpData] = useState([]);
  const [isFirstTimeDataLoaded, setIsFirstTimeDataLoaded] = useState(false);
  const [amountType, setAmountType] = useState(false);
  const employees = useSelector((state) => state.sharedSlice.employees);
  const salary = useSelector((state) => state.sharedSlice.employeeSalary);
  const [prercentage, setPercentage] = useState();
  const [amount, setAmount] = useState();
  const [netSalary, setnetSalary] = useState();
  const [isDisabled, setIsDisabled] = useState(true);

  console.log(props.id, "bonus composer idddd");
  useEffect(() => {
    fetchEmployees("", 0);
    // setNetSalary(salary)
  }, []);

  const selectedData = (data, obj) => {
    setValue(data);
    handleMember(obj);
    dispatch(getEmployeeSalary({ id: "F02C12DA-13D6-4052-ABFF-06D928D6EC41" }));
  };

  const handleMember = (val) => {
    setNewState({
      ...newState,
      members: [...val],
    });
    // setNetSalary(salary)
  };
  const fetchEmployees = (text, pgNo) => {
    dispatch(getAllEmployees({ text, pgNo, pgSize: 20 }));
  };

  const [newState, setNewState] = useState({
    members: [],
    memberType: null,
  });

  useEffect(() => {
    if (employees.length > 0 && !isFirstTimeDataLoaded) {
      setIsFirstTimeDataLoaded(true);
      setFirstTimeEmpData(employees);
    }
  }, [employees]);

  const onFinish = (values) => {
    let approvers = [];
    if (typeof values.approvers === "string") {
      approvers.push({
        approverId: values.approvers,
      });
    } else {
      approvers = values.approvers.map((approver) => {
        return {
          approverId: approver,
        };
      });
    }

    let payload = { ...values, approvers };

    dispatch(addBonus(payload));
    form.resetFields();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    if (value === 1) {
      setAmount("");
      console.log("valueeee", value);
    } else if (value === 2) {
      setPercentage("");
      console.log(value, "valuee2");
    }
  }, [value]);

  const handleType = (e) => {
    let type = e.target.value;
    setValue(type);
    setnetSalary(0);
    if (type === 2) {
      console.log(type, "type");
      setAmountType(true);
      setnetSalary(0);
    } else {
      console.log("percentage clicked");
      console.log(netSalary, "nettttt");
      setAmountType(false);
      setnetSalary(0);
    }
  };

  return (
    <>
      <Form
        form={form}
        name="addBonus"
        labelCol={{
          span: 24,
        }}
        wrapperCol={{
          span: 24,
        }}
        initialValues={{
          remember: true,
          type: 1,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          name="memberId"
          label={bonusDictionary.bonusTo}
          showSearch={true}
          direction={Direction}
        >
          <CustomSelect
            style={{ marginBottom: "0px" }}
            data={firstTimeEmpData}
            selectedData={selectedData}
            canFetchNow={isFirstTimeDataLoaded}
            fetchData={fetchEmployees}
            placeholder={bonusDictionary.selectApprovers}
            isObject={true}
            loadDefaultData={false}
            optionComponent={(opt) => {
              return (
                <>
                  <Avatar
                    name={opt.name}
                    src={opt.image}
                    round={true}
                    width={"30px"}
                    height={"30px"}
                  />
                  {opt.name}
                </>
              );
            }}
            dataVal={value}
            name="memberId"
            showSearch={true}
            direction={Direction}
            rules={[
              {
                required: true,
                message: bonusDictionary.selectMember,
              },
            ]}
          />
        </Form.Item>

        <div className="flex justify-between gap-4">
          <div className="" style={{ width: "100px" }}>
            <Form.Item label={bonusDictionary.netSalary} name="netsalary">
              {<p style={{ marginTop: "5px" }}>{salary}</p>}
            </Form.Item>
          </div>
          <div className="w-full">
            <Form.Item
              label={bonusDictionary.type}
              name="type"
              rules={[
                {
                  required: true,
                  message: "Please Select Type",
                },
              ]}
            >
              <Radio.Group onChange={handleType} value={value}>
                <Radio value={1}>{bonusDictionary.percent}</Radio>

                <Radio value={2}>{bonusDictionary.amount}</Radio>
              </Radio.Group>
            </Form.Item>
          </div>
        </div>
        <div className="flex justify-between gap-4">
          <div className="w-full">
            <Form.Item
              label={bonusDictionary.amount}
              name="percentage"
              rules={[
                {
                  required: true,
                  message: "Please Enter Amount",
                },
              ]}
            >
              {amountType === false ? (
              <Input
                parser={(value) => value.replace("%", "")}
                formatter={(value) => `${value}%`}
                defaultValue="0%"
                // type={"number"}
                placeholder="0%"
                // size="large"
                value={prercentage}
                style={{ width: "100%" }}
                onChange={(e) => setPercentage(e.target.value)}
              />
           
             ) : ( 
            
              <Input
              // parser={(value) => value.replace("0", "")}
               // formatter={(value) => `${value}0`}
              // defaultValue="0"
                type={"number"}
                placeholder="0"
                // size="large"
                value={netSalary}
                style={{ width: "100%" }}
                onChange={(e) => setAmount(e.target.value)}
              />
               )} 
            </Form.Item>
          </div>
        </div>
        <Form.Item
          name="approvers"
          label={bonusDictionary.approvers}
          showSearch={true}
          direction={Direction}
          rules={[{ required: true }]}
        >
          <CustomSelect
            style={{ marginBottom: "0px" }}
            data={firstTimeEmpData}
            selectedData={selectedData}
            canFetchNow={isFirstTimeDataLoaded}
            fetchData={fetchEmployees}
            placeholder={bonusDictionary.selectApprovers}
            mode={"multiple"}
            isObject={true}
            loadDefaultData={false}
            optionComponent={(opt) => {
              return (
                <>
                  <Avatar
                    name={opt.name}
                    src={opt.image}
                    round={true}
                    width={"30px"}
                    height={"30px"}
                  />
                  {opt.name}
                </>
              );
            }}
            dataVal={value}
            name="approvers"
            showSearch={true}
            direction={Direction}
            rules={[
              {
                required: true,
                message: "Please Select Approver",
              },
            ]}
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            size="large"
            className="ThemeBtn"
            block
            htmlType="submit"
            title={bonusDictionary.create}
          >
            {" "}
            {bonusDictionary.create}{" "}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Composer;
