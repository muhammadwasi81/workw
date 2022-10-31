import React, { useState, useEffect } from "react";
import { getAllEmployees } from "../../../../../../utils/Shared/store/actions";
import MemberSelect from "../../../../../sharedComponents/AntdCustomSelects/SharedSelects/MemberSelect";
import DrangableQuestions from "./DragableItems";
import RadioWithImage from "./QuestionsItems/RadioWithImage";
import TextFields from "./QuestionsItems/TextFields";
import Radio from "./QuestionsItems/Radio";
import moment from "moment";
import {
  createGuid,
  getNameForImage,
  STRINGS,
} from "../../../../../../utils/base";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input, Avatar, Select, Button, Space } from "antd";
// import SingleUpload from "../../../../../sharedComponents/Upload/singleUpload";
import QuestionWithType from "./QuestionWithType";
import { CloseOutlined } from "@ant-design/icons";
import "./createForm.css";
const { TextArea } = Input;
const { Option } = Select;

const Create = (props) => {
  const [form] = Form.useForm();
  const [firstTimeEmpData, setFirstTimeEmpData] = useState([]);
  const [isFirstTimeDataLoaded, setIsFirstTimeDataLoaded] = useState(false);
  // console.log("props in create component", props);
  const { removeQuestion, formData, handleSequenceChange } = props;
  const { createLoader } = useSelector((state) => state.formSlice);

  const {
    sharedSlice: { employees },
  } = useSelector((state) => state);
  const [employeesData, setEmployeesData] = useState([]);
  const dispatch = useDispatch();
  const fetchEmployees = (text, pgNo) => {
    dispatch(getAllEmployees({ text, pgNo, pgSize: 20 }));
  };
  const { user } = useSelector((state) => state.userSlice);
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
    props.subDescriptionSend(values);
  };

  const dataGet = (values) => {
    console.log("data get in create form", values);
    //send data to edit form component
    props.dataSend(values);
  };

  // console.log("props in create form", props);

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <Form.Provider>
        <Form
          name="CreateForm"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
          form={form}
        >
          <div className="c-row bg-clr editForm">
            <div className="f-head-item p_15">
              <Form.Item
                label="Title"
                name="subject"
                rules={[
                  {
                    required: true,
                    message: "Please input your Subject!",
                  },
                ]}
              >
                <TextArea
                  showCount
                  maxLength={20}
                  placeholder="Title"
                  rows={1}
                />
              </Form.Item>
              <Form.Item
                name="description"
                label="Description"
                rules={[
                  {
                    required: true,
                    message: "Please input your Description!",
                  },
                ]}
              >
                <TextArea
                  showCount
                  maxLength={100}
                  placeholder="Description"
                  rows={4}
                />
              </Form.Item>
              <Form.Item
                name="approvers"
                label="Approvers"
                rules={[
                  {
                    required: true,
                    message: "Please Select Approvers",
                  },
                ]}
              >
                <MemberSelect
                  name="Approvers"
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
            </div>
          </div>
          <QuestionWithType dataSend={(values) => dataGet(values)} />
          <DrangableQuestions
            questions={formData.question}
            handleChange={handleSequenceChange}
          >
            {formData &&
              formData.question.map((item, index) => (
                <>
                  {/* {console.log("item radio with image", item)} */}
                  {item.localType === "radio" && (
                    <Radio
                      // handleRadioChange={handleChange}
                      question={item}
                      index={index}
                      removeQuestion={(index) => removeQuestion(index)}
                    />
                  )}
                  {item.localType === "radioWithImage" && (
                    <RadioWithImage
                      // handleChange={handleChange}
                      question={item}
                      index={index}
                      removeQuestion={(index) => removeQuestion(index)}
                    />
                  )}
                  {item.localType === "text" && (
                    <TextFields
                      // handleChange={handleChange}
                      fieldData={item}
                      index={index}
                      type="text"
                      removeQuestion={(index) => removeQuestion(index)}
                    />
                  )}
                  {item.localType === "number" && (
                    <TextFields
                      // handleChange={handleChange}
                      fieldData={item}
                      index={index}
                      type="number"
                      removeQuestion={(index) => removeQuestion(index)}
                    />
                  )}
                </>
              ))}
          </DrangableQuestions>
          <Form.Item className="flex justify-end">
            <Button
              className="btn"
              // type="primary"
              htmlType="submit"
              disabled={createLoader ? true : false}
            >
              Create Form
            </Button>
          </Form.Item>
        </Form>
      </Form.Provider>
    </>
  );
};

export default Create;
