import React, { useState, useEffect, useContext } from "react";
import "../../style.css";
import {
  Form,
  Input,
  Radio,
  Select,
  Avatar,
  Rate,
  Tag,
  Button,
  Divider,
} from "antd";
import { useSelector, useDispatch } from "react-redux";
import {
  createGuid,
  getNameForImage,
  modifySelectData,
} from "../../../../../../utils/base";
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
  const { grades } = useSelector((state) => state.gradeSlice);
  const { employeeSalary } = useSelector((state) => state.sharedSlice);

  // console.log(employeeSalary, "employeesalary");

  // console.log(grades);

  console.log(appraisalQuestion);

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
    // console.log("Success:", values);
    console.log("onfinish");
    if (employeeSalary?.basicSalary) {
      console.log("if block");
      let salary;
      let bonus;

      if (values.incrementRadio === 1) {
        //1 percent 2 amount
        salary = {
          id: createGuid(),
          userId: props.userId,
          basicSalary:
            incrementType === 2
              ? parseInt(employeeSalary?.basicSalary) +
                parseInt(values.incrementAmount)
              : parseInt(employeeSalary?.basicSalary) +
                (parseInt(employeeSalary?.basicSalary) *
                  parseInt(values.incrementPercent)) /
                  100,
          // basicSalary: values.incrementAmount
          //   ? parseInt(employeeSalary?.basicSalary) +
          //     parseInt(values.incrementAmount)
          //   : parseInt(employeeSalary?.basicSalary) +
          //     parseInt(employeeSalary?.basicSalary) /
          //       parseInt(values.incrementPercent),
          approvers: modifySelectData(values.incrementApprover).map((el) => {
            return {
              approverId: el,
            };
          }),
        };
      }

      if (values.bonusRadio === 1) {
        bonus = {
          id: createGuid(),
          memberId: props.userId,
          type: values.bonusPercent ? 1 : 2,
          value: bonusType === 1 ? values.bonusPercent : "",
          amount: bonusType === 2 ? values.bonusAmount : "",
          approvers: modifySelectData(values.bonusApprovers).map((el) => {
            return {
              approverId: el,
            };
          }),
        };
      }

      const payload = {
        values,
        questions: question,
        bonus: bonus ? bonus : null,
        salary: salary ? salary : null,
      };
      // const newPayload = addAppraisal_dto(payload);

      props.dataSend(payload);
    } else {
      let salary;
      let bonus;
      if (values.bonusRadio === 1) {
        salary = {
          id: createGuid(),
          userId: props.userId,
          basicSalary:
            employeeSalary?.basicSalary + values.incrementAmount &&
            parseInt(values.incrementAmount),
          approvers: modifySelectData(values.incrementApprover).map((el) => {
            return {
              approverId: el,
            };
          }),
        };
      }
      if (values.incrementRadio === 1) {
        bonus = {
          id: createGuid(),
          memberId: props.userId,
          type: 2,
          value: parseInt(values.bonusAmount),
          amount: parseInt(values.bonusAmount),
          // amount: ,
          approvers: modifySelectData(values.bonusApprovers).map(
            (el, index) => {
              return {
                approverId: el,
              };
            }
          ),
        };
      }

      const payload = {
        values,
        questions: question,
        bonus: bonus ? bonus : null,
        salary: salary ? salary : null,
      };

      props.dataSend(payload);
    }

    // props.getAppraisalData(payload);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onChangePromotion = (e) => {
    setPromotion(e.target.value);
  };

  const onChangeBonus = (e) => {
    setbonus(e.target.value);
  };

  const onChangeBonusType = (e) => {
    setBonusType(e.target.value);
  };
  const onChangeIncrement = (e) => {
    setIncrement(e.target.value);
  };

  const onChangeIncrementType = (e) => {
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
          disabled={props.disabled}
        >
          <div className="inputBox-form flex justify-between items-center">
            <span>{appraisals}</span>
            {/* <span>{basicSalary}: 13000</span> */}
          </div>{" "}
          <div className="inputBox-form flex justify-evenly mt-2 items-center">
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
          <div className="inputBox-form  mt-2">
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
                // defaultValue={promotion}
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
                  name="gradeId"
                  rules={[
                    {
                      required: true,
                      message: "Please select Grade",
                    },
                  ]}
                >
                  <Select placeholder={selectGrade} size="large">
                    {grades &&
                      grades.map((it) => {
                        return <Option value={it.id}>{it.name}</Option>;
                      })}
                  </Select>
                </Form.Item>
                {/* <Form.Item
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
                </Form.Item> */}
              </>
            )}
          </div>
          <div className="inputBox-form mt-2">
            <span>{Bonus}</span>
            {/**TODO: conditonal render options if salary is present then both options will be present amount/percentage */}
            <Form.Item
              name="bonusRadio"
              rules={[
                {
                  required: true,
                  message: "Please Select Yes/No",
                },
              ]}
            >
              <Radio.Group onChange={onChangeBonus}>
                <Radio value={1}>{yes}</Radio>
                <Radio value={2}>{no}</Radio>
              </Radio.Group>
            </Form.Item>
            {bonus === 1 && (
              <>
                {!employeeSalary ? (
                  <Form.Item
                    name={"bonusAmount"}
                    type="number"
                    // style={{ width: "50%" }}
                  >
                    <Input
                      placeholder={amount}
                      type="number"
                      style={{ marginTop: "0.5rem" }}
                    />
                  </Form.Item>
                ) : (
                  <>
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
                  </>
                )}

                <Form.Item
                  name="bonusApprovers"
                  label={"Bonus Approver"}
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
          <div className="inputBox-form mt-2">
            <span>{Increment}</span>
            {/**TODO: conditonal render options if salary is present then both options will be present amount/percentage */}
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
                // defaultValue={increment}
              >
                <Radio value={1}>{yes}</Radio>
                <Radio value={2}>{no}</Radio>
              </Radio.Group>
            </Form.Item>
            {increment === 1 && (
              <>
                {!employeeSalary ? (
                  <Form.Item name="incrementAmount" typetype="number">
                    <Input
                      placeholder={amount}
                      type="number"
                      style={{ marginTop: "0.5rem" }}
                    />
                  </Form.Item>
                ) : (
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
                  </>
                )}
                <Form.Item
                  name="incrementApprover"
                  label={"Increment Approver"}
                  showSearch={true}
                  rules={[{ required: true }]}
                >
                  <MemberSelect
                    name="incrementApprover"
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
          <div className="inputBox-form mt-2">
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
          {appraisalQuestion.appraisals.length > 1 && (
            <div className="inputBox-form mt-4">
              {appraisalQuestion.appraisals.map((item, i) => {
                return (
                  <Form.Item name={`question${i + 1}`}>
                    <div className="flex justify-between items-center">
                      <span className="max-w-[23rem]">{`${item?.name}`}</span>
                      <Rate
                        onChange={(e) => onChangeQuestionRating(e, i, item?.id)}
                        disabled={props.disabled}
                      />
                    </div>
                    <Divider />
                  </Form.Item>
                );
              })}
            </div>
          )}
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
