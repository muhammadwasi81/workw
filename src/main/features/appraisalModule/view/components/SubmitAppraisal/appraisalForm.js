import React, { useState, useEffect, useContext } from "react";
import "../../style.css";
import { Form, Input, Radio, Select, Avatar, Rate, Tag, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { createGuid, getNameForImage } from "../../../../../../utils/base";
import { getAllEmployees } from "../../../../../../utils/Shared/store/actions";
import MemberSelect from "../../../../../sharedComponents/AntdCustomSelects/SharedSelects/MemberSelect";
import ModalTag from "./modalTag";
import { LanguageChangeContext } from "../../../../../../utils/localization/localContext/LocalContext";
import { appraisalDictionaryList } from "../../../localization/index";

const { Option } = Select;
const { TextArea } = Input;

const AppraisalForm = (props) => {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { appraisalDictionary } = appraisalDictionaryList[userLanguage];
  const [question, setQuestion] = useState([]);
  const {
    appraisals,
    basicSalary,
    previousApraisals,
    warning,
    rewards,
    courses,
    Promotion,
    yes,
    no,
    currentGrade,
    assistantManager,
    developers,
    executive,
    intern,
    manager,
    officer,
    selectApprovers,
    Bonus,
    percentage,
    amount,
    Increment,
    comments,
    approvers,
    selectGrade,
    rate,
  } = appraisalDictionary;
  // console.log(props, "appraisal form");
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [promotion, setPromotion] = useState(2);
  const [bonus, setbonus] = useState(2);
  const [bonusType, setBonusType] = useState(1);
  const [increment, setIncrement] = useState(2);
  const [modalOpen, setModalOpen] = useState(false);
  const [data, setData] = useState("");
  const [incrementType, setIncrementType] = useState(1);
  const [firstTimeEmpData, setFirstTimeEmpData] = useState([]);
  const [isFirstTimeDataLoaded, setIsFirstTimeDataLoaded] = useState(false);

  const {
    sharedSlice: { employees },
  } = useSelector((state) => state);

  const fetchEmployees = (text, pgNo) => {
    dispatch(getAllEmployees({ text, pgNo, pgSize: 20 }));
  };

  const appraisalQuestion = useSelector((state) => state.appraisalSlice);

  useEffect(() => {
    fetchEmployees("", 0);
  }, []);

  useEffect(() => {
    if (employees.length > 0 && !isFirstTimeDataLoaded) {
      setIsFirstTimeDataLoaded(true);
      setFirstTimeEmpData(employees);
    }
  }, [employees]);

  useEffect(() => {
    if (props.submit) {
      console.log("use effect works when true");
      form.submit();
    }
  }, [props.submit]);

  const onFinish = (values) => {
    console.log("Success:", values);
    const payload = {
      values,
      questions: question
    }
    props.dataSend(payload);
    // props.getAppraisalData(payload);
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
  const onChangeIncrement = (e) => {
    console.log(e.target.value, "onchange bonus");
    setIncrement(e.target.value);
  };

  const onChangeIncrementType = (e) => {
    console.log(e.target.value, "onchange type");
    setIncrementType(e.target.value);
  };

  const modalOpenFunc = (type) => {
    setModalOpen(true);
    setData(type);
  };

  const modalCloseFunc = () => {
    setModalOpen(false);
  };

  const onChangeQuestionRating = (e, i, questionId) => {
    //TODO: check if object is present in the array then replace the new one else push the new value
    console.log(questionId, e, i);
    if (!question.length) {
      setQuestion([{ questionId, ratingAssign: e }]);
    } else {
      const newQuestionArr = question.filter(
        (item) => item.questionId !== questionId
      );
      setQuestion([...newQuestionArr, { questionId, ratingAssign: e }]);
    }
  };

  return (
    <>
      <ModalTag
        showModal={modalOpen}
        handleCancel={modalCloseFunc}
        data={data}
      />
      <div className="appraisalFormBody drop-shadow">
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <div className="inputBox flex justify-between items-center">
            <span>{appraisals}</span>
            {/* <span>{basicSalary}: 13000</span> */}
          </div>{" "}
          <div className="inputBox flex justify-evenly mt-2 items-center">
            <Tag
              onClick={() => modalOpenFunc("previousAppraisal")}
              className="statusTag"
              style={{ backgroundColor: "rgb(26 86 105)", cursor: "pointer" }}
            >
              {previousApraisals}
            </Tag>
            <Tag
              onClick={() => modalOpenFunc("warning")}
              className="statusTag"
              style={{ backgroundColor: "rgb(26 86 105)", cursor: "pointer" }}
            >
              {warning}
            </Tag>
            <Tag
              onClick={() => modalOpenFunc("rewards")}
              className="statusTag"
              style={{ backgroundColor: "rgb(26 86 105)", cursor: "pointer" }}
            >
              {rewards}
            </Tag>
            <Tag
              onClick={() => modalOpenFunc("course")}
              className="statusTag"
              style={{ backgroundColor: "rgb(26 86 105)", cursor: "pointer" }}
            >
              {courses}
            </Tag>
          </div>
          <div className="inputBox  mt-2">
            <span>{Promotion}</span>
            <Form.Item
              name="promotion"
              rules={[
                {
                  required: true,
                  message: "Please Select Yes/No",
                },
              ]}
            >
              <Radio.Group
                onChange={onChangePromotion}
                defaultValue={promotion}
              >
                <Radio value={1}>{yes}</Radio>
                <Radio value={2} checked={true}>
                  {no}
                </Radio>
              </Radio.Group>
            </Form.Item>
            {promotion === 1 && (
              <>
                <span>{currentGrade}: No Grade</span>
                <Form.Item
                  name="grade"
                  rules={[
                    {
                      required: true,
                      message: "Please select Grade",
                    },
                  ]}
                >
                  <Select placeholder={selectGrade} size="large">
                    <Option value={1}>{assistantManager}</Option>
                    <Option value={2}>{developers}</Option>
                    <Option value={3}> {executive}</Option>
                    <Option value={4}>{intern}</Option>
                    <Option value={5}>{manager}</Option>
                    <Option value={6}>{officer}</Option>
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
                    placeholder={selectApprovers}
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
              </>
            )}
          </div>
          <div className="inputBox mt-2">
            <span>{Bonus}</span>
            <Form.Item
              name="bonusRadio"
              rules={[
                {
                  required: true,
                  message: "Please Select Yes/No",
                },
              ]}
            >
              <Radio.Group onChange={onChangeBonus} defaultValue={bonus}>
                <Radio value={1}>{yes}</Radio>
                <Radio value={2}>{no}</Radio>
              </Radio.Group>
            </Form.Item>
            {bonus === 1 && (
              <>
                {/* <div className="promotionBox mt-2"> */}
                <Radio.Group onChange={onChangeBonusType} value={bonusType}>
                  <Radio value={1}>{percentage}</Radio>
                  <Radio value={2}>{amount}</Radio>
                </Radio.Group>
                <div className="flex gap-x-3">
                  <Form.Item
                    name={"bonusPercent"}
                    type="number"
                    style={{ width: "50%" }}
                  >
                    <Input
                      prefix={"%"}
                      placeholder={percentage}
                      type="number"
                      max={100}
                      disabled={bonusType === 2 ? true : false}
                      style={{ marginTop: "0.5rem" }}
                    />
                  </Form.Item>
                  <Form.Item
                    name={"bonusAmount"}
                    type="number"
                    style={{ width: "50%" }}
                  >
                    <Input
                      placeholder={amount}
                      type="number"
                      disabled={bonusType === 1 ? true : false}
                      style={{ marginTop: "0.5rem" }}
                    />
                  </Form.Item>
                </div>

                <Form.Item
                  name="bonusApprovers"
                  // label={"Approver"}
                  showSearch={true}
                  rules={[{ required: true }]}
                >
                  <MemberSelect
                    name="bonusApprovers"
                    mode="multiple"
                    formitem={false}
                    placeholder={selectApprovers}
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
                {/* // </div> */}
              </>
            )}
          </div>
          <div className="inputBox mt-2">
            <span>{Increment}</span>
            <Form.Item
              name="incrementRadio"
              rules={[
                {
                  required: true,
                  message: "Please Select Yes/No",
                },
              ]}
            >
              <Radio.Group
                onChange={onChangeIncrement}
                defaultValue={increment}
              >
                <Radio value={1}>{yes}</Radio>
                <Radio value={2}>{no}</Radio>
              </Radio.Group>
            </Form.Item>
            {increment === 1 && (
              <>
                {/* <div className="promotionBox mt-2"> */}
                <Radio.Group
                  onChange={onChangeIncrementType}
                  value={incrementType}
                >
                  <Radio value={1}>{percentage}</Radio>
                  <Radio value={2}>{amount}</Radio>
                </Radio.Group>
                <div className="flex gap-x-3">
                  <Form.Item
                    name="incrementPercent"
                    typetype="number"
                    style={{ width: "50%" }}
                  >
                    <Input
                      prefix={"%"}
                      type="number"
                      placeholder={percentage}
                      disabled={incrementType === 2 ? true : false}
                      style={{ marginTop: "0.5rem" }}
                    />
                  </Form.Item>
                  <Form.Item
                    name="incrementAmount"
                    typetype="number"
                    style={{ width: "50%" }}
                  >
                    <Input
                      placeholder={amount}
                      type="number"
                      disabled={incrementType === 1 ? true : false}
                      style={{ marginTop: "0.5rem" }}
                    />
                  </Form.Item>
                </div>

                <Form.Item
                  name="incrementApprovers"
                  // label={"Approvers"}
                  showSearch={true}
                  rules={[{ required: true }]}
                >
                  <MemberSelect
                    name="incrementApprovers"
                    mode="multiple"
                    formitem={false}
                    placeholder={selectApprovers}
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
                {/* // </div> */}
              </>
            )}
          </div>
          <div className="inputBox mt-2">
            <Form.Item
              name="approvers"
              label={approvers}
              showSearch={true}
              rules={[{ required: true }]}
            >
              <MemberSelect
                name="approvers"
                mode="multiple"
                formitem={false}
                placeholder={selectApprovers}
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
          <div className="inputBox mt-4">
            {appraisalQuestion.appraisals.map((item, i) => {
              return (
                <Form.Item name={`question${i + 1}`}>
                  <div className="flex justify-between items-center">
                    <span>{`Q${i + 1}.  ${item?.name}`}</span>
                    <Rate
                      onChange={(e) => onChangeQuestionRating(e, i, item?.id)}
                    />
                  </div>
                </Form.Item>
              );
            })}
            {/* <Form.Item name="rate" label={rate}>
              <Rate />
            </Form.Item> */}
          </div>
          <div>
            <Form.Item name="comment" label={comments}>
              <TextArea rows={4} />
            </Form.Item>
          </div>
          {/* <Button type="primary" htmlType="submit">
            Submit form
          </Button> */}
        </Form>
      </div>
    </>
  );
};

export default AppraisalForm;
