import { Button, Form, Input, InputNumber, Radio } from "antd";
import React, { useState, useContext, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addBonus } from "../store/actions";
import { bonusDictionaryList } from "../localization/index";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import Avatar from "../../../sharedComponents/Avatar/avatarOLD";
import CustomSelect from "../../../sharedComponents/AntdCustomSelects/SharedSelects/MemberSelect";
import { getAllEmployees } from "../../../../utils/Shared/store/actions";


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
  const [profileImage, setProfileImage] = useState(null);
  const [value, setValue] = useState(1);
  const [privacyId, setPrivacyId] = useState(1);
  const [firstTimeEmpData, setFirstTimeEmpData] = useState([]);
  const [isFirstTimeDataLoaded, setIsFirstTimeDataLoaded] = useState(false);
  const [amountType, setAmountType] = useState(false)

  const employees = useSelector(state => state.sharedSlice.employees);

  const selectedData = (data, obj) => {
    setValue(data);
    handleMember(obj);
  };
  useEffect(() => {
    fetchEmployees("", 0);
  }, []);

  const handleMember = val => {
    setNewState({
      ...newState,
      members: [...val],
    });
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
    if (typeof values.approvers === 'string') {
      approvers.push({
        approverId: values.approvers
      })
    }
    else {
      approvers = values.approvers.map((approver) => {
        return {
          approverId: approver
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

  const handleType = (e) => {
    console.log(e.target.value, "HELLO I AM RADIO")
    let type = e.target.value;
    if (type === 2) {
      setAmountType(true)
    } else {
      setAmountType(false)
    }
    setValue(e);
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
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off">
        <Form.Item name="memberId" label={bonusDictionary.bonusTo} showSearch={true} direction={Direction}>
          <CustomSelect
            style={{ marginBottom: "0px" }}
            data={firstTimeEmpData}
            selectedData={selectedData}
            canFetchNow={isFirstTimeDataLoaded}
            fetchData={fetchEmployees}
            placeholder={"Select Members"}
            isObject={true}
            loadDefaultData={false}
            optionComponent={opt => {
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
                message: "Please Select Member",
              },
            ]}
          />
        </Form.Item>

        <div className="flex justify-between gap-4">
          <div className="w-full">
            <Form.Item label={"Net Salary"} name="netsalary">
              <Input disabled size="large" />
            </Form.Item>
          </div>
          <div className="w-full">
            <Form.Item
              label={"Type"}
              name="type"
              rules={[
                {
                  required: true,
                  message: "Please Select Type",
                },
              ]}>
              <Radio.Group onChange={handleType} value={value}>
                <Radio value={1}>Percent</Radio>
                <Radio value={2}>Amount</Radio>
              </Radio.Group>
            </Form.Item>
          </div>
        </div>
        <div className="flex justify-between gap-4">
          <div className="w-full">
            <Form.Item
              label={"Amount"}
              name="amount"
              rules={[
                {
                  required: true,
                  message: "Please Enter Amount",
                },
              ]}>
              {
                amountType == false ?
                  <InputNumber
                    formatter={(value) => `${value}%`}
                    parser={(value) => value.replace('%', '')}
                    placeholder="0"
                    size="large"
                    style={{ width: "100%" }}
                  />
                  :
                  <Input placeholder="0" size="large" />
              }
            </Form.Item>
          </div>
        </div>
        <Form.Item name="approvers" label={bonusDictionary.approvers} showSearch={true} direction={Direction} rules={[{ required: true }]}>
          <CustomSelect
            style={{ marginBottom: "0px" }}
            data={firstTimeEmpData}
            selectedData={selectedData}
            canFetchNow={isFirstTimeDataLoaded}
            fetchData={fetchEmployees}
            placeholder={"Select Approvers"}
            mode={"multiple"}
            isObject={true}
            loadDefaultData={false}
            optionComponent={opt => {
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
          <Button type="primary" size="large" className="ThemeBtn" block htmlType="submit" title={bonusDictionary.create}>
            {" "}
            {bonusDictionary.create}{" "}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Composer;
