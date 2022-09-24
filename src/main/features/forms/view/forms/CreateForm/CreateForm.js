import React, { useState, useEffect } from "react";
import { getAllEmployees } from "../../../../../../utils/Shared/store/actions";
import MemberSelect from "../../../../../sharedComponents/AntdCustomSelects/SharedSelects/MemberSelect";
import moment from "moment";
import {
  createGuid,
  getNameForImage,
  STRINGS,
} from "../../../../../../utils/base";
import { useSelector, useDispatch } from "react-redux";
import { Form, Input, Avatar, Select, Button, Space } from "antd";
// import SingleUpload from "../../../../../sharedComponents/Upload/singleUpload";
import QuestionWithType from "./QuestionWithType";
import { CloseOutlined } from "@ant-design/icons";
const { TextArea } = Input;
const { Option } = Select;

const CreateForm = (props) => {
  const [form] = Form.useForm();
  const [firstTimeEmpData, setFirstTimeEmpData] = useState([]);
  const [isFirstTimeDataLoaded, setIsFirstTimeDataLoaded] = useState(false);
  const [type, setType] = useState([]);
  const [options, setOptions] = useState([]);
  const [question, setQuestion] = useState("");
  const [pollsImage, setPollsImage] = useState([]);
  const [polls, setPolls] = useState([]);

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
    console.log("usersss", user);
    console.log("Success:", values);
    //Type and options to be used in form submission and pushing into question object
    console.log(type);
    console.log(options);
    console.log(question);

    let questions = {
      id: createGuid(),
      form_id: createGuid(),
      question: question,
      answerType: values.answerType,
      isRequired: true,
      image_id: "00000000-0000-0000-0000-000000000000",
      image: "",
      createBy: createGuid(),
      createDate: moment().format("DD/MM/YYYY"),
      answers: options ? [options.value] : [],
    };

    let data = {
      id: createGuid(),
      name: values.subject,
      description: values.description,
      acceptingResponse: true,
      businessLogo:
        "https://Konnect.im/upload/2021/12/440ba960-2b69-43d4-90f2-754824fd8a40.png",
      status: 1,
      approverStatus: 2,
      ref_no: "",
      createBy: user.firstName,
      createDate: moment().format("DD/MM/YYYY"),
      creator: {
        id: user.id,
        name: user.firstName,
        profile_picture: user.image,
        designation: "",
        email: user.email,
        userStatus: 1,
        userStatusDatetime: "",
        type: 1,
        isActive: true,
        isDisable: false,
        business_id: "",
        user_type: 2,
      },
      approvals: values.approvers,
      questions: [questions],
    };
    //Todo:  Send Data into edit section
    props.dataSend(data);
    // subject: values.subject,
    // approvers: values.approvers,
    // questionType: values.answerType,
    // question: question,
    // answers: options ? [options.value] : [],
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  // console.log(props, "in parent component");
  return (
    <>
      <Form.Provider>
        <Form
          name="CreateForm"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          form={form}
        >
          <Form.Item
            name="subject"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input placeholder="Subject" />
          </Form.Item>
          <Form.Item name="description">
            <TextArea placeholder="Description" rows={4} />
          </Form.Item>
          <Form.Item label="Approvers" name="approvers">
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
         
          <QuestionWithType
            // setQuestionType={(value) => setType({ type: value })}
            // optionChange={(value) => setOptions({ value })}
            // typeProp={type}
            // questionChange={(value) => setQuestion(value)}
          //   optionChange={(value)=> }
          />



          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add Question
            </Button>
          </Form.Item>
        </Form>
      </Form.Provider>
   
    </>
  );
};

export default CreateForm;
