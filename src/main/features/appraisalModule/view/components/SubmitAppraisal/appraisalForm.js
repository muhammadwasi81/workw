import React, { useState, useEffect } from "react";
import "../../style.css";
import { Form, Input, Button, Radio, Select, Avatar, Rate } from "antd";
import { useSelector, useDispatch } from "react-redux";
import StatusTag from "../../../../../sharedComponents/Tag/StatusTag";
import { getNameForImage } from "../../../../../../utils/base";
import { getAllEmployees } from "../../../../../../utils/Shared/store/actions";
import MemberSelect from "../../../../../sharedComponents/AntdCustomSelects/SharedSelects/MemberSelect";

const { Option } = Select;
const { TextArea } = Input;

const AppraisalForm = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [promotion, setPromotion] = useState(2);
  const [bonus, setbonus] = useState(2);
  const [bonusType, setBonusType] = useState(1);
  const [firstTimeEmpData, setFirstTimeEmpData] = useState([]);
  const [isFirstTimeDataLoaded, setIsFirstTimeDataLoaded] = useState(false);

  const {
    sharedSlice: { employees },
  } = useSelector((state) => state);

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
    console.log("Success:", values);
    // props.getAppraisalData(values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onChangePromotion = (e) => {
    console.log(e.target.value, "onchange promotion");
    setPromotion(e.target.value);
  };

  const onChangeBonus = (e) => {
    console.log(e.target.value, "onchange bonus");
    setbonus(e.target.value);
  };

  const onChangeBonusType = (e) => {
    console.log(e.target.value, "onchange type");
    setBonusType(e.target.value);
  };
  return (
    <>
      <div className="appraisalFormBody drop-shadow">
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <div className="inputBox flex justify-between items-center">
            <span>Appraisals</span>
            <span>Basic Salary: 13000</span>
          </div>{" "}
          <div className="inputBox flex justify-evenly mt-2 items-center">
            <StatusTag status={1} />
            <StatusTag status={2} />
            <StatusTag status={3} />
          </div>
          <div className="inputBox flex gap-x-5 items-baseline mt-2">
            <span>Promotion</span>
            <Form.Item name="promotion">
              <Radio.Group onChange={onChangePromotion}>
                <Radio value={1}>Yes</Radio>
                <Radio value={2}>No</Radio>
              </Radio.Group>
            </Form.Item>
          </div>
          {promotion === 1 && (
            <div className="promotionBox mt-2">
              <span>Current Grade: No Grade</span>
              <Form.Item
                name="grade"
                rules={[
                  {
                    required: true,
                    message: "Please select Grade",
                  },
                ]}
              >
                <Select placeholder="Select Grade" size="large">
                  <Option value={1}>Assistant Manager</Option>
                  <Option value={2}>Developers</Option>
                  <Option value={3}>Executive</Option>
                  <Option value={4}>Intern</Option>
                  <Option value={5}>Manager</Option>
                  <Option value={6}>Officer</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="promotionApprovers"
                // label={"Approver"}
                showSearch={true}
                rules={[{ required: true }]}
              >
                <MemberSelect
                  name="promotionApprovers"
                  mode="multiple"
                  formitem={false}
                  placeholder={"Select Approvers"}
                  isObject={true}
                  data={firstTimeEmpData}
                  canFetchNow={isFirstTimeDataLoaded}
                  fetchData={fetchEmployees}
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
            </div>
          )}
          <div className="inputBox flex gap-x-5 items-baseline mt-2">
            <span>Bonus</span>
            <Form.Item name="bonus">
              <Radio.Group onChange={onChangeBonus}>
                <Radio value={1}>Yes</Radio>
                <Radio value={2}>No</Radio>
              </Radio.Group>
            </Form.Item>
          </div>
          {bonus === 1 && (
            <div className="promotionBox mt-2">
              <Radio.Group onChange={onChangeBonusType}>
                <Radio value={1}>Percentage</Radio>
                <Radio value={2}>Amount</Radio>
              </Radio.Group>
              <Form.Item name="bonus" typetype="number">
                <Input
                  prefix={"%"}
                  placeholder="Percentage"
                  disabled={bonusType === 1 ? true : false}
                  className="mt-2"
                />
                <Input
                  placeholder="Amount"
                  disabled={bonusType === 2 ? true : false}
                  className="mt-2"
                />
              </Form.Item>
              <Form.Item
                name="bonusApprovers"
                // label={"Approver"}
                showSearch={true}
                rules={[{ required: true }]}
              >
                <MemberSelect
                  name="approvers"
                  mode="multiple"
                  formitem={false}
                  placeholder={"Select Approvers"}
                  isObject={true}
                  data={firstTimeEmpData}
                  canFetchNow={isFirstTimeDataLoaded}
                  fetchData={fetchEmployees}
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
            </div>
          )}
          <div className="approvalBox mt-2">
            <Form.Item
              name="approvers"
              // label={"Approver"}
              showSearch={true}
              rules={[{ required: true }]}
            >
              <MemberSelect
                name="approvers"
                mode="multiple"
                formitem={false}
                placeholder={"Select Approvers"}
                isObject={true}
                data={firstTimeEmpData}
                canFetchNow={isFirstTimeDataLoaded}
                fetchData={fetchEmployees}
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
          </div>
          <div className="mt-4">
            <Form.Item name="rate" label="Rate">
              <Rate />
            </Form.Item>
          </div>
          <div>
            <Form.Item name="comments" label="Comments">
              <TextArea rows={4} />
            </Form.Item>
          </div>
        </Form>
      </div>
    </>
  );
};

export default AppraisalForm;
